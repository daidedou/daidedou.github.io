---
title: "Beyond Prompts: Unconditional 3D Inversion for Out-of-Distribution Shapes"
collection: publications
classes: wide
author_profile: false
usemathjax: true
collection: publications
permalink: /publication/beyondprompts
date: 2026-04-01
teaser: images/beyond_prompts/rabbit_teaser.png
author:
  - name: Victoria Yue Chen
    site: 
  - name: Emery Pierson
    site: https://daidedou.github.io/
  - name: Léopold Maillard
    site: https://www.lix.polytechnique.fr/~maillard/
  - name: Maks Ovsjanikov
    site: https://www.lix.polytechnique.fr/~maks/
category: preprint
paperurl: https://daidedou.github.io
---

## Victoria Yue Chen, Emery Pierson, [Léopold Maillard](https://www.lix.polytechnique.fr/~maillard/), [Maks Ovsjanikov](https://www.lix.polytechnique.fr/~maks/)
{: style="text-align: center;"}

<div class="column has-text-centered">
  <div class="publication-links">
    <!-- PDF Link. -->
    <span class="link-block">
      <a class="external-link button is-normal is-rounded is-dark" href="https://daidedou.github.io">
        <span class="icon">
            <i class="fas fa-file-pdf"></i>
        </span>
        <span>Paper</span>
      </a>
    </span>
    <!-- Code Link. -->
    <span class="link-block">
      <a class="button" href="https://daidedou.github.io">
        <span class="icon">
            <i class="fab fa-github"></i>
        </span>
        <span>Code</span>
        </a>
        (coming soon)
    </span>
  </div>
</div>
{: style="text-align: center;"}

<br />
{: style="text-align: center;"}

![image-center]({{ site.url }}{{ site.baseurl }}/images/beyond_prompts/rabbit_teaser.png){: .align-center}

<p style="font-size:1.2em;"><strong>TL;DR</strong></p>

We study text-driven inversion of 3D generative models.  
We found the existence of *sink traps*: the model can become insensitive to prompts during generation (generating only one shape).  
Despite this propertly, the models retain strong geometric expressiveness in the unconditional distribution. 
We demonstrate the utility of this finding in a pose retargeting applications on various out-of-distribution shapes.

{: style="text-align: justify;"}

# Expressivity of Language and Geometry
{: style="text-align: center;"}

![image-center]({{ site.url }}{{ site.baseurl }}/images/beyond_prompts/diversity_4_1_1_.png){: .align-center}

{: style="text-align: justify;"}
**Sink trap examples**. Sink trap examples. Given various description of a character (dancing girl, surgeon, labrador, astronaut, scary wolf) in different poses, we generate multiple assets using TRELLIS. However, we observe a mode collapse where there is high similarity between the results, despite different prompt describing different actions.

![image-center]({{ site.url }}{{ site.baseurl }}/images/beyond_prompts/flux_vs_trellis_v4.png){: .align-center}

{: style="text-align: justify;"}
**Geometric expressivity**. The velocity norm of Flux remains stable across different prompt types, whereas TRELLIS exhibits large variations when inputted various language prompt. This property is not true when dealing with unconditional prompts.



# Application: inversion based character retargeting 
{: style="text-align: center;"}

<style>
  .bp-application-grid {
    margin: 2rem 0;
  }

  .bp-application-grid,
  .bp-application-stack {
    display: grid;
    gap: 1.5rem;
  }

  .bp-application-stack {
    margin: 2rem 0;
  }

  .bp-viewer-row {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .bp-header-row {
    margin-bottom: 0.65rem;
  }

  .bp-header-cell {
    text-align: center;
    font-size: 1.18rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    color: #1e293b;
  }

  .bp-viewer-card {
    padding: 0;
  }

  .bp-vtk-viewer {
    position: relative;
    width: 100%;
    height: 340px;
    overflow: hidden;
    background: #ffffff;
  }

  .bp-vtk-status {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(241, 245, 249, 0.96));
    color: #475569;
    font-size: 0.92rem;
    font-weight: 600;
    letter-spacing: 0.01em;
  }

  .bp-viewer-caption {
    margin-top: 0.6rem;
    text-align: center;
    font-size: 0.92rem;
    color: #334155;
    font-weight: 600;
  }

  @media (max-width: 780px) {
    .bp-viewer-row {
      grid-template-columns: 1fr;
    }
  }
</style>

<div class="bp-application-grid">
  <div class="bp-application-stack">
    <div>
      <div class="bp-viewer-row bp-header-row">
        <div class="bp-header-cell">Character + prompt</div>
        <div class="bp-header-cell">Edit 1</div>
        <div class="bp-header-cell">Edit 2</div>
      </div>

      <div class="bp-viewer-row">
        <div class="bp-viewer-card">
          <div
            class="bp-vtk-viewer bp-vtk-plain-obj-viewer"
            data-camera-view="front"
            data-obj-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_maria/frame_000.obj"
            data-shading="normal"
            data-compute-normals="true">
            <div class="bp-vtk-status">Loading mesh...</div>
          </div>
          <div class="bp-viewer-caption">frame_000.obj normal shading</div>
        </div>

        <div class="bp-viewer-card">
          <div
            class="bp-vtk-viewer bp-vtk-textured-obj-viewer"
            data-camera-view="front"
            data-obj-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_maria/prompt_43_test/prompt_43_test.obj"
            data-mtl-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_maria/prompt_43_test/prompt_43_test.mtl"
            data-texture-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_maria/prompt_43_test/Material_0_basecolor.png"
            data-material-name="Material_0"
            data-shading="phong">
            <div class="bp-vtk-status">Loading textured OBJ...</div>
          </div>
          <div class="bp-viewer-caption">prompt_43_test VTK texture</div>
        </div>

        <div class="bp-viewer-card">
          <div
            class="bp-vtk-viewer bp-vtk-textured-obj-viewer"
            data-camera-view="front"
            data-obj-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_maria/prompt_47_test/prompt_47_test.obj"
            data-mtl-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_maria/prompt_47_test/prompt_47_test.mtl"
            data-texture-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_maria/prompt_47_test/Material_0_basecolor.png"
            data-material-name="Material_0"
            data-shading="phong">
            <div class="bp-vtk-status">Loading textured OBJ...</div>
          </div>
          <div class="bp-viewer-caption">prompt_47_test VTK texture</div>
        </div>
      </div>
    </div>

    <div>

      <div class="bp-viewer-row">
        <div class="bp-viewer-card">
          <div
            class="bp-vtk-viewer bp-vtk-plain-obj-viewer"
            data-camera-view="front"
            data-obj-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_chicken/frame_007.obj"
            data-shading="normal"
            data-compute-normals="true">
            <div class="bp-vtk-status">Loading mesh...</div>
          </div>
          <div class="bp-viewer-caption">frame_007.obj normal shading</div>
        </div>

        <div class="bp-viewer-card">
          <div
            class="bp-vtk-viewer bp-vtk-textured-obj-viewer"
            data-camera-view="front"
            data-obj-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_chicken/prompt_84/prompt_84.obj"
            data-mtl-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_chicken/prompt_84/prompt_84.mtl"
            data-texture-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_chicken/prompt_84/Material_0_basecolor.png"
            data-material-name="Material_0"
            data-shading="phong">
            <div class="bp-vtk-status">Loading textured OBJ...</div>
          </div>
          <div class="bp-viewer-caption">prompt_84 VTK texture</div>
        </div>

        <div class="bp-viewer-card">
          <div
            class="bp-vtk-viewer bp-vtk-textured-obj-viewer"
            data-camera-view="front"
            data-obj-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_chicken/prompt_86_test/prompt_86_test.obj"
            data-mtl-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_chicken/prompt_86_test/prompt_86_test.mtl"
            data-texture-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_chicken/prompt_86_test/Material_0_basecolor.png"
            data-material-name="Material_0"
            data-shading="phong">
            <div class="bp-vtk-status">Loading textured OBJ...</div>
          </div>
          <div class="bp-viewer-caption">prompt_86_test VTK texture</div>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="https://unpkg.com/vtk.js@35.5.2/vtk.js"></script>
<script src="{{ site.url }}{{ site.baseurl }}/assets/js/beyond-prompts-viewers.js"></script>
<script>
  window.initBeyondPromptsViewers({
    rerenderDurationMs: 2500,
    vtkLighting: {
      ambient: [0.6, 0.6, 0.6],
      useLightFollowCamera: true,
      sceneLights: [
        {
          position: [1.5, 1.2, 3.6],
          focalPoint: [0, 0, 0],
          intensity: 0.75,
          coneAngle: 80,
          color: [1, 1, 1]
        },
        {
          position: [0, 3.2, 1.8],
          focalPoint: [0, 0, 0],
          intensity: 0.95,
          coneAngle: 90,
          color: [1, 1, 1]
        },
        {
          position: [0, -3.2, 1.0],
          focalPoint: [0, 0, 0],
          intensity: 0.7,
          coneAngle: 95,
          color: [1, 1, 1]
        },
        {
          position: [-5.2, 1.0, 0],
          focalPoint: [0, 0, 0],
          intensity: 1.1,
          coneAngle: 80,
          color: [1, 1, 1]
        },
        {
          position: [5.2, 1.0, 0],
          focalPoint: [0, 0, 0],
          intensity: 1.1,
          coneAngle: 80,
          color: [1, 1, 1]
        },
        {
          position: [0, 1.2, -5.5],
          focalPoint: [0, 0, 0],
          intensity: 2.1,
          coneAngle: 70,
          color: [1, 1, 1]
        }
      ]
    }
  });
</script>

This application block shows two VTK.js comparison rows, one for `prompt_maria` and one for `prompt_chicken`, combining normal-shaded source meshes with textured VTK edit views.


# Acknowledgements

**TODO**

# Citation

If you consider our work useful, please cite:

```BibTeX
@misc{incoming}
```

This webpage was inspired by [Nerfies](https://nerfies.github.io/).
