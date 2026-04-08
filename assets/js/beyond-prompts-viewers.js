(function () {
  const GL_REPEAT = 10497;
  const GL_CLAMP_TO_EDGE = 33071;

  function setInitialCamera(renderer, viewName) {
    const camera = renderer.getActiveCamera();

    if (viewName === 'back') {
      camera.azimuth(180);
    } else if (viewName === 'three-quarter') {
      camera.azimuth(35);
      camera.elevation(18);
    }

    renderer.resetCameraClippingRange();
  }

  function applyLighting(renderer, lightingConfig) {
    const ambient = lightingConfig && lightingConfig.ambient;

    if (ambient && renderer.setAmbient) {
      renderer.setAmbient(ambient[0], ambient[1], ambient[2]);
    }

    if (
      lightingConfig &&
      typeof lightingConfig.useLightFollowCamera === 'boolean' &&
      renderer.setLightFollowCamera
    ) {
      renderer.setLightFollowCamera(lightingConfig.useLightFollowCamera);
    }
  }

  function getViewerLightingConfig(config, container, fallbackOverrides) {
    const mode = container.dataset.lightingMode || 'default';
    const ambientBoost = Number(container.dataset.ambientBrightness || '');

    if (mode === 'ambient-only') {
      const ambient =
        config.ambientOnlyLighting && config.ambientOnlyLighting.ambient
          ? config.ambientOnlyLighting.ambient.slice()
          : [0.45, 0.45, 0.45];

      if (!Number.isNaN(ambientBoost) && ambientBoost > 0) {
        ambient[0] = ambientBoost;
        ambient[1] = ambientBoost;
        ambient[2] = ambientBoost;
      }

      return createMergedLightingConfig(config.vtkLighting, {
        ambient,
        useLightFollowCamera:
          config.ambientOnlyLighting &&
          typeof config.ambientOnlyLighting.useLightFollowCamera === 'boolean'
            ? config.ambientOnlyLighting.useLightFollowCamera
            : false,
        sceneLights: [],
      });
    }

    if (mode === 'reduced') {
      const ambient =
        config.reducedLighting && config.reducedLighting.ambient
          ? config.reducedLighting.ambient.slice()
          : [0.7, 0.7, 0.7];

      if (!Number.isNaN(ambientBoost) && ambientBoost > 0) {
        ambient[0] = ambientBoost;
        ambient[1] = ambientBoost;
        ambient[2] = ambientBoost;
      }

      return createMergedLightingConfig(config.vtkLighting, {
        ambient,
        useLightFollowCamera:
          config.reducedLighting &&
          typeof config.reducedLighting.useLightFollowCamera === 'boolean'
            ? config.reducedLighting.useLightFollowCamera
            : false,
        sceneLights: [],
      });
    }

    if (fallbackOverrides) {
      return createMergedLightingConfig(config.vtkLighting, fallbackOverrides);
    }

    return config.vtkLighting;
  }

  function createMergedLightingConfig(baseLighting, overrides) {
    const merged = Object.assign({}, baseLighting || {}, overrides || {});
    if (overrides && Object.prototype.hasOwnProperty.call(overrides, 'sceneLights')) {
      merged.sceneLights = overrides.sceneLights;
    }
    return merged;
  }

  function addSceneLights(renderer, vtkLight, lightingConfig) {
    const sceneLights = lightingConfig && lightingConfig.sceneLights;

    if (!sceneLights || !sceneLights.length) {
      return;
    }

    sceneLights.forEach((lightConfig) => {
      const light = vtkLight.newInstance();
      light.setLightTypeToSceneLight();
      light.setPositional(
        lightConfig.positional !== undefined ? lightConfig.positional : true
      );
      light.setPosition(...(lightConfig.position || [0, 0, 1]));
      light.setFocalPoint(...(lightConfig.focalPoint || [0, 0, 0]));
      if (lightConfig.intensity !== undefined) {
        light.setIntensity(lightConfig.intensity);
      }
      if (lightConfig.coneAngle !== undefined) {
        light.setConeAngle(lightConfig.coneAngle);
      }
      if (lightConfig.color) {
        light.setColor(...lightConfig.color);
      }
      renderer.addLight(light);
    });
  }

  function rerenderForMaterials(renderWindow, durationMs) {
    const start = performance.now();

    function tick(now) {
      renderWindow.render();
      if (now - start < durationMs) {
        window.requestAnimationFrame(tick);
      }
    }

    window.requestAnimationFrame(tick);
  }

  function loadHtmlImage(src) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = src;
    });
  }

  async function loadFirstWorkingImage(urls) {
    let lastError = null;

    for (const url of urls) {
      try {
        return await loadHtmlImage(resolveAssetUrl(url));
      } catch (error) {
        lastError = error;
      }
    }

    throw lastError || new Error('No texture URL could be loaded');
  }

  function resolveRelativeUrl(baseUrl, relativePath) {
    return new URL(relativePath, resolveAssetUrl(baseUrl)).toString();
  }

  function resolveAssetUrl(url) {
    return new URL(url, window.location.href).toString();
  }

  function parseMtlText(mtlText) {
    const result = {
      materialName: '',
      textureFile: '',
    };

    mtlText.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) {
        return;
      }

      if (!result.materialName && trimmed.startsWith('newmtl ')) {
        result.materialName = trimmed.slice(7).trim();
      }

      if (!result.textureFile && trimmed.startsWith('map_Kd ')) {
        result.textureFile = trimmed.slice(7).trim();
      }
    });

    return result;
  }

  function createDiffuseTexture(vtkTexture, image, samplerDef) {
    const texture = vtkTexture.newInstance();
    texture.setImage(image);
    texture.setInterpolate(true);
    texture.setRepeat(
      samplerDef.wrapS === GL_REPEAT || samplerDef.wrapT === GL_REPEAT
    );
    texture.setEdgeClamp(
      samplerDef.wrapS === GL_CLAMP_TO_EDGE ||
        samplerDef.wrapT === GL_CLAMP_TO_EDGE
    );
    return texture;
  }

  function setActiveTextureCoords(pointData) {
    if (!pointData) {
      return;
    }

    if (pointData.getTCoords && pointData.getTCoords()) {
      pointData.setActiveTCoords(pointData.getTCoords().getName());
      return;
    }

    if (pointData.hasArray && pointData.hasArray('Texture Coordinates')) {
      pointData.setActiveTCoords('Texture Coordinates');
      return;
    }

    if (pointData.hasArray && pointData.hasArray('TCoords')) {
      pointData.setActiveTCoords('TCoords');
      return;
    }

    if (pointData.hasArray && pointData.hasArray('TEXCOORD_0')) {
      pointData.setActiveTCoords('TEXCOORD_0');
    }
  }

  function configureProperty(property, shading, materialMode) {
    if (!property) {
      return;
    }

    property.setDiffuseColor(1, 1, 1);
    if (materialMode === 'ambient-only') {
      if (property.setLighting) {
        property.setLighting(false);
      }
      property.setDiffuse(1.0);
      property.setAmbient(1.0);
    } else {
      if (property.setLighting) {
        property.setLighting(true);
      }
      property.setDiffuse(1.0);
      property.setAmbient(0.05);
    }
    property.setSpecular(0.0);
    property.setOpacity(1.0);

    if (shading === 'flat' && property.setInterpolationToFlat) {
      property.setInterpolationToFlat();
    } else if (shading === 'gouraud' && property.setInterpolationToGouraud) {
      property.setInterpolationToGouraud();
    } else if (shading === 'phong' && property.setInterpolationToPhong) {
      property.setInterpolationToPhong();
    }

    if (property.setBackfaceCulling) {
      property.setBackfaceCulling(false);
    }
    if (property.setFrontfaceCulling) {
      property.setFrontfaceCulling(false);
    }
  }

  function applyBackfaceProperty(actor, vtkProperty, shading, materialMode) {
    if (!actor || !actor.setBackfaceProperty) {
      return;
    }

    const backfaceProperty = vtkProperty.newInstance();
    configureProperty(backfaceProperty, shading, materialMode);
    actor.setBackfaceProperty(backfaceProperty);
  }

  function resetViewerContainer(container, loadingText) {
    container.innerHTML = '';
    const status = document.createElement('div');
    status.className = 'bp-vtk-status';
    status.textContent = loadingText;
    container.appendChild(status);
  }

  window.initBeyondPromptsViewers = function initBeyondPromptsViewers(config) {
    const vtkFullScreenRenderWindow = vtk.Rendering.Misc.vtkFullScreenRenderWindow;
    const vtkDataArray = vtk.Common.Core.vtkDataArray;
    const vtkHDRReader = vtk.IO.Image && vtk.IO.Image.vtkHDRReader;
    const vtkOBJReader = vtk.IO.Misc.vtkOBJReader;
    const vtkMTLReader = vtk.IO.Misc.vtkMTLReader;
    const vtkMapper = vtk.Rendering.Core.vtkMapper;
    const vtkActor = vtk.Rendering.Core.vtkActor;
    const vtkLight = vtk.Rendering.Core.vtkLight;
    const vtkProperty = vtk.Rendering.Core.vtkProperty;
    const vtkTexture = vtk.Rendering.Core.vtkTexture;
    const vtkPolyDataNormals = vtk.Filters.Core.vtkPolyDataNormals;

    const textureCache = new Map();
    const mtlCache = new Map();
    let environmentTexturePromise = null;

    function getTextureImage(url) {
      if (!textureCache.has(url)) {
        textureCache.set(url, loadHtmlImage(url));
      }

      return textureCache.get(url);
    }

    function getTextureCandidates(textureUrl, mtlUrl, textureFile) {
      const candidates = [];

      if (textureUrl) {
        candidates.push(textureUrl);
      }

      if (mtlUrl && textureFile) {
        candidates.push(resolveRelativeUrl(mtlUrl, textureFile));
      }

      if (mtlUrl) {
        candidates.push(resolveRelativeUrl(mtlUrl, 'Material_0_basecolor.png'));
        candidates.push(resolveRelativeUrl(mtlUrl, 'material_0_basecolor.png'));
      }

      return [...new Set(candidates.filter(Boolean))];
    }

    function getMtlMetadata(url) {
      if (!url) {
        return Promise.resolve({
          materialName: '',
          textureFile: '',
        });
      }

      if (!mtlCache.has(url)) {
        mtlCache.set(
          url,
          fetch(resolveAssetUrl(url))
            .then((response) => response.text())
            .then((text) => parseMtlText(text))
        );
      }

      return mtlCache.get(url);
    }

    function getEnvironmentTexture() {
      if (!config.environmentLighting || !config.environmentLighting.url || !vtkHDRReader) {
        return Promise.resolve(null);
      }

      if (!environmentTexturePromise) {
        environmentTexturePromise = (async () => {
          const hdrReader = vtkHDRReader.newInstance();
          await hdrReader.setUrl(config.environmentLighting.url);
          await hdrReader.loadData();

          const texture = vtkTexture.newInstance();
          if (texture.setInputData) {
            texture.setInputData(hdrReader.getOutputData());
          }
          texture.setInterpolate(true);
          texture.setRepeat(true);
          return texture;
        })().catch((error) => {
          console.error('Unable to load VTK environment texture', error);
          return null;
        });
      }

      return environmentTexturePromise;
    }

    function applyNormalColors(polyData, mapper) {
      if (!polyData || !mapper) {
        return;
      }

      const pointData = polyData.getPointData ? polyData.getPointData() : null;
      const normalsArray = pointData && pointData.getNormals ? pointData.getNormals() : null;
      const normals = normalsArray && normalsArray.getData ? normalsArray.getData() : null;

      if (!pointData || !normals) {
        return;
      }

      const colors = new Uint8Array(normals.length);
      for (let i = 0; i < normals.length; i += 3) {
        colors[i] = Math.round((normals[i] * 0.5 + 0.5) * 255);
        colors[i + 1] = Math.round((normals[i + 1] * 0.5 + 0.5) * 255);
        colors[i + 2] = Math.round((normals[i + 2] * 0.5 + 0.5) * 255);
      }

          const colorArray = vtkDataArray.newInstance({
        name: 'NormalColors',
        numberOfComponents: 3,
        values: colors,
      });

      pointData.setScalars(colorArray);
      mapper.setColorModeToDirectScalars();
      mapper.setScalarModeToUsePointData();
      mapper.setScalarVisibility(true);
    }

    function createViewerShell(container) {
      const status = container.querySelector('.bp-vtk-status');
      const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
        rootContainer: container,
        containerStyle: {
          position: 'absolute',
          inset: '0',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          background: '#ffffff',
        },
        background: [1, 1, 1],
      });

      const renderer = fullScreenRenderer.getRenderer();
      const renderWindow = fullScreenRenderer.getRenderWindow();
      const mapper = vtkMapper.newInstance();
      const actor = vtkActor.newInstance();

      actor.setMapper(mapper);
      renderer.addActor(actor);

      return {
        actor,
        mapper,
        renderWindow,
        renderer,
        status,
      };
    }

    function finalizeViewer(shell, container) {
      shell.renderer.resetCamera();
      setInitialCamera(shell.renderer, container.dataset.cameraView);
      shell.renderWindow.render();
      rerenderForMaterials(shell.renderWindow, config.rerenderDurationMs || 2500);

      if (shell.status) {
        shell.status.remove();
      }
    }

    async function applyEnvironmentLighting(renderer) {
      const environmentTexture = await getEnvironmentTexture();
      if (!environmentTexture) {
        return;
      }

      if (renderer.setEnvironmentTexture) {
        renderer.setEnvironmentTexture(environmentTexture);
      }
      if (
        config.environmentLighting &&
        typeof config.environmentLighting.diffuseStrength === 'number' &&
        renderer.setEnvironmentTextureDiffuseStrength
      ) {
        renderer.setEnvironmentTextureDiffuseStrength(
          config.environmentLighting.diffuseStrength
        );
      }
      if (
        config.environmentLighting &&
        typeof config.environmentLighting.specularStrength === 'number' &&
        renderer.setEnvironmentTextureSpecularStrength
      ) {
        renderer.setEnvironmentTextureSpecularStrength(
          config.environmentLighting.specularStrength
        );
      }
    }

    function createPlainObjViewer(container) {
      const objUrl = container.dataset.objUrl;
      const shading = container.dataset.shading || 'gouraud';
      const computeNormals = container.dataset.computeNormals === 'true';
      const materialMode = container.dataset.lightingMode || 'default';
      const solidColor = (container.dataset.solidColor || '')
        .split(',')
        .map((value) => Number(value.trim()))
        .filter((value) => !Number.isNaN(value));
      const shell = createViewerShell(container);
      const plainLighting = getViewerLightingConfig(config, container, {
        ambient: [0.35, 0.35, 0.35],
        sceneLights: [],
      });
      const objReader = vtkOBJReader.newInstance();

      applyLighting(shell.renderer, plainLighting);

      objReader
        .setUrl(objUrl)
        .then(() => objReader.loadData())
        .then(async () => {
          await applyEnvironmentLighting(shell.renderer);
          const polyData = objReader.getOutputData();

          if (computeNormals && vtkPolyDataNormals) {
            const normalsFilter = vtkPolyDataNormals.newInstance({
              splitting: false,
              featureAngle: 180,
            });
            normalsFilter.setInputData(polyData);
            normalsFilter.update();
            const output = normalsFilter.getOutputData();
            shell.mapper.setInputData(output);
            if (shading === 'normal') {
              applyNormalColors(output, shell.mapper);
            }
          } else {
            shell.mapper.setInputData(polyData);
          }

          configureProperty(shell.actor.getProperty(), shading, materialMode);
          if (solidColor.length === 3) {
            shell.mapper.setScalarVisibility(false);
            shell.actor
              .getProperty()
              .setDiffuseColor(solidColor[0] / 255, solidColor[1] / 255, solidColor[2] / 255);
          }
          applyBackfaceProperty(shell.actor, vtkProperty, shading, materialMode);
          finalizeViewer(shell, container);
        })
        .catch((error) => {
          if (shell.status) {
            shell.status.textContent = 'Unable to load the OBJ scene.';
          }
          console.error('VTK plain OBJ viewer failed to load', error);
        });
    }

    function createTexturedObjViewer(container) {
      const objUrl = container.dataset.objUrl;
      const mtlUrl = container.dataset.mtlUrl || '';
      const textureUrl = container.dataset.textureUrl || '';
      const shading = container.dataset.shading || 'phong';
      const computeNormals = container.dataset.computeNormals !== 'false';
      const materialMode = container.dataset.lightingMode || 'default';
      const shell = createViewerShell(container);
      const viewerLighting = getViewerLightingConfig(config, container);
      applyLighting(shell.renderer, viewerLighting);
      addSceneLights(shell.renderer, vtkLight, viewerLighting);

      const objReader = vtkOBJReader.newInstance();
      const loadPromises = [objReader.setUrl(objUrl).then(() => objReader.loadData())];
      if (mtlUrl) {
        loadPromises.push(getMtlMetadata(mtlUrl));
      }

      Promise.all(loadPromises)
        .then(async () => {
          await applyEnvironmentLighting(shell.renderer);
          const mtlMetadata = await getMtlMetadata(mtlUrl);
          const polyData = objReader.getOutputData();
          let renderData = polyData;
          let pointData =
            polyData && polyData.getPointData ? polyData.getPointData() : null;
          const hasNormals =
            pointData && pointData.getNormals && pointData.getNormals();

          setActiveTextureCoords(pointData);

          if (computeNormals && vtkPolyDataNormals && !hasNormals) {
            const normalsFilter = vtkPolyDataNormals.newInstance({
              splitting: false,
              featureAngle: 180,
            });
            normalsFilter.setInputData(polyData);
            normalsFilter.update();
            renderData = normalsFilter.getOutputData();
            pointData =
              renderData && renderData.getPointData ? renderData.getPointData() : null;
            setActiveTextureCoords(pointData);
          }

          shell.mapper.setInputData(renderData);

          let diffuseTexture = null;
          const textureCandidates = getTextureCandidates(
            textureUrl,
            mtlUrl,
            mtlMetadata.textureFile
          );

          if (textureCandidates.length) {
            const textureImage = await loadFirstWorkingImage(textureCandidates);
            diffuseTexture = createDiffuseTexture(vtkTexture, textureImage, {
              wrapS: GL_REPEAT,
              wrapT: GL_REPEAT,
            });
          }

          shell.mapper.setScalarVisibility(false);
          if (shell.actor.removeAllTextures) {
            shell.actor.removeAllTextures();
          }
          if (diffuseTexture && shell.actor.addTexture) {
            shell.actor.addTexture(diffuseTexture);
          }
          if (diffuseTexture && shell.actor.getProperty().setDiffuseTexture) {
            shell.actor.getProperty().setDiffuseTexture(diffuseTexture);
          }
          configureProperty(shell.actor.getProperty(), shading, materialMode);
          applyBackfaceProperty(shell.actor, vtkProperty, shading, materialMode);
          finalizeViewer(shell, container);
        })
        .catch((error) => {
          if (shell.status) {
            shell.status.textContent = 'Unable to load the textured OBJ scene.';
          }
          console.error('VTK textured OBJ viewer failed to load', error);
        });
    }

    function renderViewer(container) {
      if (container.classList.contains('bp-vtk-plain-obj-viewer')) {
        resetViewerContainer(container, 'Loading mesh...');
        createPlainObjViewer(container);
      } else if (container.classList.contains('bp-vtk-textured-obj-viewer')) {
        resetViewerContainer(container, 'Loading textured OBJ...');
        createTexturedObjViewer(container);
      }
    }

    function initVariantSelectors() {
      document.querySelectorAll('.bp-variant-select').forEach((select) => {
        if (select.dataset.bpBound === 'true') {
          return;
        }

        const applySelection = () => {
          const targetId = select.dataset.targetId;
          const target = targetId ? document.getElementById(targetId) : null;
          const option = select.options[select.selectedIndex];

          if (!target || !option) {
            return;
          }

          if (option.dataset.objUrl) {
            target.dataset.objUrl = option.dataset.objUrl;
          }
          if (option.dataset.mtlUrl) {
            target.dataset.mtlUrl = option.dataset.mtlUrl;
          }
          if (option.dataset.textureUrl) {
            target.dataset.textureUrl = option.dataset.textureUrl;
          }
          if (option.dataset.materialName) {
            target.dataset.materialName = option.dataset.materialName;
          }
          if (option.dataset.lightingMode) {
            target.dataset.lightingMode = option.dataset.lightingMode;
          }
          if (option.dataset.ambientBrightness) {
            target.dataset.ambientBrightness = option.dataset.ambientBrightness;
          }

          renderViewer(target);
        };

        select.addEventListener('change', applySelection);
        select.dataset.bpBound = 'true';
      });
    }

    document.querySelectorAll('.bp-vtk-plain-obj-viewer').forEach((container) => {
      createPlainObjViewer(container);
    });

    document.querySelectorAll('.bp-vtk-textured-obj-viewer').forEach((container) => {
      createTexturedObjViewer(container);
    });

    initVariantSelectors();
  };
})();
