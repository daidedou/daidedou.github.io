---
title: "Beyond Prompts: Unconditional 3D Inversion for Out-of-Distribution Shapes"
collection: publications
classes: wide
author_profile: false
usemathjax: true
collection: publications
permalink: /publication/beyondprompts
date: 2026-04-01
teaser: beyond_prompts/rabbit_teaser.png
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

<link rel="stylesheet" href="{{ site.url }}{{ site.baseurl }}/assets/css/beyond-prompts.css">

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

<div class="bp-video-embed">
  <iframe 
    src="https://drive.google.com/file/d/1w5WQpPGpmt4_jOnn6VLnm5A8p7Dw7NAo/preview"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen>
  </iframe>
</div>


# Expressivity of Language and Geometry
{: style="text-align: center;"}

![image-center]({{ site.url }}{{ site.baseurl }}/images/beyond_prompts/diversity_4_1_1_.png){: .align-center}

{: style="text-align: justify;"}
**Sink trap examples**. Sink trap examples. Given various description of a character (dancing girl, surgeon, labrador, astronaut, scary wolf) in different poses, we generate multiple assets using TRELLIS. However, we observe a mode collapse where there is high similarity between the results, despite different prompt describing different actions.

<div class="bp-geometry-row">
  <div class="bp-geometry-main">
    <img src="{{ site.url }}{{ site.baseurl }}/images/beyond_prompts/flux_vs_trellis_v4.png" alt="Flux versus Trellis comparison">
  </div>

  <div class="bp-geometry-triptych">
    <div class="bp-geometry-card">
      <img src="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/accuracy.svg" alt="Target result">
      <div class="bp-geometry-caption">Target</div>
    </div>
    <div class="bp-geometry-card">
      <img src="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/accuracy1.svg" alt="Inversion result">
      <div class="bp-geometry-caption">Inversion with condition</div>
    </div>
    <div class="bp-geometry-card">
      <img src="{{ site.url }}{{ site.baseurl }}/files/beyond_prompts/accuracy3.svg" alt="Inversion with empty prompt result">
      <div class="bp-geometry-caption">Inversion with empty prompt</div>
    </div>
  </div>
</div>

{: style="text-align: justify;"}
**Geometric expressivity**. The velocity norm of Flux remains stable across different prompt types (left), whereas TRELLIS exhibits large variations when inputted various language prompt. This property is not true when dealing with empty prompts (unconditional distribution). We can invert perfectly with the unconditional distribution, whereas it fails using the conditional distribution.



# Application: inversion based character retargeting 
{: style="text-align: center;"}

We demonstrate the efficiency of the unconditional inversion with a practical application: inversion based character retargeting. Given an out of distribution shape with a certain pose, we retarget the specific pose to a new character, showing superior performances against baselines ([Interactive examples]({{ site.url }}{{ site.baseurl }}/files/beyondprompts_viewer.html)).

![image-center]({{ site.url }}{{ site.baseurl }}/images/beyond_prompts/big_compare.svg){: .align-center}




# Acknowledgements

**TODO**

# Citation

If you consider our work useful, please cite:

```BibTeX
@misc{incoming}
```

This webpage was inspired by [Nerfies](https://nerfies.github.io/).
