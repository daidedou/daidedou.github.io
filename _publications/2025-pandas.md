---
title: " PaNDaS: Learnable Deformation Modeling with Localized Control"
collection: publications
venue: 'IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)'
classes: wide
author_profile: false
usemathjax: true
collection: publications
permalink: /publication/pandas
date: 2026-01-01
teaser: pandas/new_teaser.png
author:
  - name: Thomas Besnier
    site: https://tbesnier.github.io/
  - name: Emery Pierson
    site: https://daidedou.github.io/
  - name: Sylvain Arguillère 
    site: http://math.univ-lyon1.fr/~arguillere/
  - name: Maks Ovsjanikov
    site: https://www.lix.polytechnique.fr/~maks/
  - name: Mohamed Daoudi
    site: https://sites.google.com/view/mohameddaoudi
paperurl: https://arxiv.org/pdf/2412.02306
---

## [Thomas Besnier](https://tbesnier.github.io/), Emery Pierson, [Sylvain Arguillère](http://math.univ-lyon1.fr/~arguillere/), [Maks Ovsjanikov](https://www.lix.polytechnique.fr/~maks/), [Mohamed Daoudi](https://sites.google.com/view/mohameddaoudi)
{: style="text-align: center;"}

<div class="column has-text-centered">
  <div class="publication-links">
    <!-- PDF Link. -->
    <span class="link-block">
      <a class="external-link button is-normal is-rounded is-dark" href="https://arxiv.org/pdf/2412.02306">
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

![image-center]({{ site.url }}{{ site.baseurl }}/images/pandas/new_teaser.png){: .align-center}

Non-rigid shape deformations pose significant challenges, and most existing methods struggle to handle partial deformations effectively. We propose to learn deformations at the point level, which allows for localized control of 3D surface meshes, enabling Partial Non-rigid Deformations and interpolations of Surfaces (PaNDaS). Unlike previous approaches, our method can restrict the deformations to specific parts of the shape in a versatile way. Moreover, one can mix and combine various poses from the database, all while not requiring any optimization at inference time. We demonstrate state-of-the-art accuracy and greater locality for shape reconstruction and interpolation compared to approaches relying on global shape representation across various types of human surface data. We also demonstrate several localized shape manipulation tasks and show that our method can generate new shapes by combining different input deformations. Code and data will be made available after the reviewing process.
{: style="text-align: justify;"}

# Model
{: style="text-align: center;"}

![image-center]({{ site.url }}{{ site.baseurl }}/images/pandas/model_overview.png){: .align-center}

**Overview of the proposed architecture**. A pair of meshes is given as input: a source pose $$\mathcal{X}$$ and a target pose $$\mathcal{Y}$$. Per-triangle features $$(f_t)_t$$ are learned on the source mesh and are enriched with a global encoding z of the target mesh to obtain a feature field $$(f_t)_t$$ over the source mesh. Finally, the deformation generator learns a Jacobian field from the feature field over the neutral mesh to predict a first-order, per-triangle displacement field $$(v_i)_{1 \leq i\leq n_{\mathcal{X}}}$$.
# Results 
{: style="text-align: center;"}

![image-center]({{ site.url }}{{ site.baseurl }}/images/pandas/comparison_partial_interp.png){: .align-center}

Pandas is able to outperform classical methods for partial shape interpolation like ARAP.


# Applications: Partial shape variability
{: style="text-align: center;"}

![image-center]({{ site.url }}{{ site.baseurl }}/images/pandas/applications.png){: .align-center}

Pandas can be used to mix different pose and create new ones. Moreover, using PCA on the local features, one can analyze the **local** shape variability.

# Acknowledgements

**TODO**

# Citation

If you consider our work useful, please cite:

```BibTeX
@misc{besnier2025pandaslearnabledeformationmodeling,
      title={PaNDaS: Learnable Deformation Modeling with Localized Control}, 
      author={Thomas Besnier and Emery Pierson and Sylvain Arguillere and Maks Ovsjanikov and Mohamed Daoudi},
      year={2025},
      eprint={2412.02306},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2412.02306}, 
}
```

This webpage was inspired by [Nerfies](https://nerfies.github.io/).
