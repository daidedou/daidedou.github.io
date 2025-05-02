---
title: "DiffuMatch: Category-Agnostic Spectral Diffusion Priors for Robust Non-rigid Shape Matching"
classes: wide
category: preprint
author_profile: false
usemathjax: true
collection: publications
permalink: /publication/nonrigiddiff
category: preprint
date: 2026-01-01
author:
  - name: Emery Pierson
    site: https://daidedou.github.io/
  - name: Lei Li
    site: https://craigleili.github.io/
  - name: Angela Dai
    site: https://www.3dunderstanding.org/team.html
  - name: Maks Ovsjanikov
    site: http://www.lix.polytechnique.fr/~maks/
---
## Emery Pierson, [Lei Li](https://craigleili.github.io/), [Angela Dai](https://www.3dunderstanding.org/team.html), [Maks Ovsjanikov](http://www.lix.polytechnique.fr/~maks/)
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
    </span>
  </div>
</div>
{: style="text-align: center;"}

<br />
{: style="text-align: center;"}

![image-center]({{ site.url }}{{ site.baseurl }}/images/nonrigiddiff/method_2.png){: .align-center}

Deep functional maps have recently emerged as a powerful tool for solving non-rigid shape correspondence tasks.  Methods that use this approach combine the power and flexibility of the functional map framework, with data-driven learning for improved accuracy and generality. However, most existing methods in this area restrict the learning aspect only to the feature functions and still rely on axiomatic modeling for formulating the training loss or for functional map regularization inside the networks. This limits both the accuracy and the applicability of the resulting approaches only to scenarios where assumptions of the axiomatic models hold. In this work, we show, for the first time, that both \emph{in-network regularization} and functional map training can be replaced with data-driven methods. For this, we first train a generative model of functional maps \emph{in the spectral domain} using score-based generative modeling, built from a large collection of high-quality maps. We then exploit the resulting model to promote the structural properties of ground truth functional maps on new shape collections. Remarkably, we demonstrate that the learned models are category-agnostic, and can fully replace commonly used strategies such as enforcing Laplacian commutativity or orthogonality of functional maps. Our key technical contribution is a novel distillation strategy from diffusion models in the spectral domain. Experiments demonstrate that our learned regularization leads to better results than axiomatic approaches for zero-shot non-rigid shape matching.
{: style="text-align: justify;"}

# Approach
{: style="text-align: center;"}

![image-center]({{ site.url }}{{ site.baseurl }}/images/nonrigiddiff/resume_approach.png){: .align-center}

Given a pair of shapes, and a trained **spectral functional map model**, we train a feature encoder, $$F_i = f_\theta(\mathcal{S}_i)$$. We use the features from the encoder in a Siamese way on the two input shapes. Given tentative features we first estimate the functional map $C$ à la deep functional maps way, with an input mask is distilled from the model.  We then evaluate a distillation loss (Eq (13) in the paper) to optimize the parameters of the feature extractor $$f_\theta$$ through back-propagation. Once the optimal parameters are computed, we take the associated functional map C and finally convert it to a point to point map through with the standard approach.


#  Results 

![image-center]({{ site.url }}{{ site.baseurl }}/images/nonrigiddiff/transfer.png){: .align-center}


Our method shows the strongest **zero-shot** capabilities amongs learned methods to **new** categories, whether they are descriptor or template based. 


# Acknowledgements

**TODO**

# Citation

If you consider our work useful, please cite:

```BibTeX
**TODO**
```



This webpage was inspired by [Nerfies](https://nerfies.github.io/).