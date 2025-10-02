---
title: "DiffuMatch: Category-Agnostic Spectral Diffusion Priors for Robust Non-rigid Shape Matching"
classes: wide
category: preprint
author_profile: false
usemathjax: true
collection: publications
permalink: /publication/nonrigiddiff
date: 2025-08-01
author:
  - name: Emery Pierson
    site: https://daidedou.github.io/
  - name: Lei Li
    site: https://craigleili.github.io/
  - name: Angela Dai
    site: https://www.3dunderstanding.org/team.html
  - name: Maks Ovsjanikov
    site: http://www.lix.polytechnique.fr/~maks/

teaser: nonrigiddiff/method_2.png
venue: 'International Conference on Computer Vision (ICCV)'
paperurl: https://arxiv.org/pdf/2507.23715
code: https://github.com/daidedou/diffumatch
---
## Emery Pierson, [Lei Li](https://craigleili.github.io/), [Angela Dai](https://www.3dunderstanding.org/team.html), [Maks Ovsjanikov](http://www.lix.polytechnique.fr/~maks/)
{: style="text-align: center;"}

<div class="column has-text-centered">
  <div class="publication-links" style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">

    <!-- Paper Link -->
    <a class="external-link button is-dark is-rounded" href="https://arxiv.org/pdf/2507.23715" target="_blank" style="display: flex; align-items: center; gap: 0em;">
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/PDF_file_icon.svg" alt="HF logo" style="height: 1.5em">
      <span>Paper</span>
    </a>

    <!-- Code Link -->
    <a class="button is-dark is-rounded" href="https://github.com/daidedou/diffumatch" target="_blank" style="display: flex; align-items: center; gap: 0em;">
      <img src="{{ site.url }}{{ site.baseurl }}/images/github-mark-white.svg" alt="Github logo" style="height: 1.5em">
      <span>Code</span>
    </a>
    <!-- HF Demo Link -->
    <a class="button is-warning is-rounded" href="https://huggingface.co/spaces/daidedou/diffumatch" target="_blank" style="display: flex; align-items: center; gap: 0em;">
      <img src="https://huggingface.co/datasets/huggingface/brand-assets/resolve/main/hf-logo.svg" alt="HF logo" style="height: 1.5em">
      <span>Demo</span>
    </a>

  </div>
</div>
{: style="text-align: center;"}

<br />
{: style="text-align: center;"}

![image-center]({{ site.url }}{{ site.baseurl }}/images/nonrigiddiff/method_2.png){: .align-center}

Deep functional maps have recently emerged as a powerful tool for solving non-rigid shape correspondence tasks.  Methods that use this approach combine the power and flexibility of the functional map framework, with data-driven learning for improved accuracy and generality. However, most existing methods in this area restrict the learning aspect only to the feature functions and still rely on axiomatic modeling for formulating the training loss or for functional map regularization inside the networks. This limits both the accuracy and the applicability of the resulting approaches only to scenarios where assumptions of the axiomatic models hold. In this work, we show, for the first time, that both _in-network regularization_ and functional map training can be replaced with data-driven methods. For this, we first train a generative model of functional maps _in the spectral domain_ using score-based generative modeling, built from a large collection of high-quality maps. We then exploit the resulting model to promote the structural properties of ground truth functional maps on new shape collections. Remarkably, we demonstrate that the learned models are category-agnostic, and can fully replace commonly used strategies such as enforcing Laplacian commutativity or orthogonality of functional maps. Our key technical contribution is a novel distillation strategy from diffusion models in the spectral domain. Experiments demonstrate that our learned regularization leads to better results than axiomatic approaches for zero-shot non-rigid shape matching.
{: style="text-align: justify;"}

# Approach
{: style="text-align: center;"}

![image-center]({{ site.url }}{{ site.baseurl }}/images/nonrigiddiff/resume_approach.png){: .align-center}

Given a pair of shapes, and a trained **spectral functional map model**, we train a feature encoder, $$F_i = f_\theta(\mathcal{S}_i)$$. We use the features from the encoder in a Siamese way on the two input shapes. Given tentative features we first estimate the functional map $$C$$ à la deep functional maps way, with the difference that the regularization mask is distilled from the model.  We then evaluate a distillation loss (Eq (13) in the paper) to optimize the parameters of the feature extractor $$f_\theta$$ through back-propagation. Once the optimal parameters are computed, we take the associated functional map C and finally convert it to a point to point map through with the standard approach.

Notably, our pipeline differs from previous deep functional maps approaches in that we _avoid axiomatic priors_, such as Laplacian Commutativity or Orthogonality, both when estimating the mask and applying the training loss. Instead, all of our regularization and objective terms, except for the basic properness term, are derived **solely from available training data**.


#  Results 

![image-center]({{ site.url }}{{ site.baseurl }}/images/nonrigiddiff/transfer.png){: .align-center}


Our method shows the strongest **zero-shot** capabilities amongs learned methods to **new** categories, whether they are descriptor or template based. 


# Acknowledgements

This work was performed using HPC resources from GENCI-IDRIS (Grant 2025-AD010613760R2). Parts of this work were supported by the ERC Consolidator Grant 101087347 (VEGA), as well as gifts from Ansys and Adobe Research, and the ERC Starting Grant SpatialSem (101076253). 

# Citation

If you consider our work useful, please cite:

```BibTeX
@article{pierson2025diffumatch,
  title={DiffuMatch: Category-Agnostic Spectral Diffusion Priors for Robust Non-rigid Shape Matching},
  author={Pierson, Emery and Li, Lei and Dai, Angela and Ovsjanikov, Maks},
  journal={arXiv preprint arXiv:2507.23715},
  year={2025}
}
```



This webpage was inspired by [Nerfies](https://nerfies.github.io/).