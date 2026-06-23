# Example Viewer Snippet

```html
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
  </div>

  <div class="bp-viewer-card">
    <div
      class="bp-vtk-viewer bp-vtk-textured-obj-viewer"
      data-camera-view="three-quarter"
      data-obj-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_maria/prompt_43_test/prompt_43_test.obj"
      data-mtl-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_maria/prompt_43_test/prompt_43_test.mtl"
      data-texture-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_maria/prompt_43_test/Material_0_basecolor.png"
      data-material-name="Material_0"
      data-shading="phong">
      <div class="bp-vtk-status">Loading textured OBJ...</div>
    </div>
  </div>

  <div class="bp-viewer-card">
    <div
      class="bp-vtk-viewer bp-vtk-textured-obj-viewer"
      data-camera-view="back"
      data-obj-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_maria/prompt_47_test/prompt_47_test.obj"
      data-mtl-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_maria/prompt_47_test/prompt_47_test.mtl"
      data-texture-url="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/prompt_maria/prompt_47_test/Material_0_basecolor.png"
      data-material-name="Material_0"
      data-shading="phong">
      <div class="bp-vtk-status">Loading textured OBJ...</div>
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
      useLightFollowCamera: true
    }
  });
</script>
```
