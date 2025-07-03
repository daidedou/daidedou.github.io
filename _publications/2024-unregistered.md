---
title: "Basis restricted elastic shape analysis on the space of unregistered surfaces"
classes: wide
author_profile: false
usemathjax: true
collection: publications
permalink: /publication/unregistered_pami
date: 2025-01-01
author:
  - name: Emmanuel Hartmann
    site: https://emmanuel-hartman.github.io/
  - name: Emery Pierson
    site: https://daidedou.github.io/
  - name: Martin Bauer
    site: https://www.math.fsu.edu/~bauer/
  - name: Nicolas Charon
    site: https://www.math.uh.edu/~ncharon/index.html
  - name: Mohamed Daoudi
    site: https://sites.google.com/view/mohameddaoudi
venue: 'International Journal of Computer Vision'
paperurl: https://arxiv.org/abs/2311.04382
teaser: figure_shape_space.png
code: https://github.com/emmanuel-hartman/BaRe-ESA
---
## [Emmanuel Hartman](https://github.com/emmanuel-hartman/), Emery Pierson, [Martin Bauer](https://www.math.fsu.edu/~bauer/), [Nicolas Charon](https://www.math.uh.edu/~ncharon/index.html), [Mohamed Daoudi](https://sites.google.com/view/mohameddaoudi)
{: style="text-align: center;"}

<div class="column has-text-centered">
  <div class="publication-links">
    <!-- PDF Link. -->
    <span class="link-block">
      <a class="external-link button is-normal is-rounded is-dark" href="https://arxiv.org/abs/2311.04382">
        <span class="icon">
            <i class="fas fa-file-pdf"></i>
        </span>
        <span>Paper</span>
      </a>
    </span>
    <!-- Code Link. -->
    <span class="link-block">
      <a class="button" href="https://github.com/emmanuel-hartman/H2_SurfaceMatch">
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

This paper introduces a new mathematical and numerical framework for surface analysis derived from the general setting of elastic Riemannian metrics on shape spaces. Traditionally, those metrics are defined over the infinite dimensional manifold of immersed surfaces and satisfy specific invariance properties enabling the comparison of surfaces modulo shape preserving transformations such as reparametrizations. The specificity of the approach we develop is to restrict the space of allowable transformations to predefined finite dimensional bases of deformation fields. These are estimated in a data-driven way so as to emulate specific types of surface transformations observed in a training set. The use of such bases allows to simplify the representation of the corresponding shape space to a finite dimensional latent space. However, in sharp contrast with methods involving e.g. mesh autoencoders, the latent space is here equipped with a non-Euclidean Riemannian metric precisely inherited from the family of aforementioned elastic metrics. We demonstrate how this basis restricted model can be then effectively implemented to perform a variety of tasks on surface meshes which, importantly, does not assume these to be pre-registered (i.e. with given point correspondences) or to even have a consistent mesh structure. We specifically validate our approach on human body shape and pose data as well as human face scans, and show how it generally outperforms state-of-the-art methods on problems such as shape registration, interpolation, motion transfer or random pose generation. 
{: style="text-align: justify;"}


TLDR: This paper is an extension of our previous <a href="https://daidedou.github.io/publication/unregistered">ICCV paper</a>. We demonstrate that the previous approach can be adapted to hands and faces with little modification, and similar performances against state-of-the-art methods.

# Model
{: style="text-align: center;"}

Our **restricted shape space** is defined as : 

$$\operatorname{Imm}=\left\{ q\in C^{\infty}(\mathcal{T},\mathbb R^3): Tq \text{ is inj.}\right\}$$

We define a linear **Latent space**, define as $${\mathcal L}\subset \mathbb R^{n+m}$$, with latent vectors $$\alpha$$ of human shapes:

$$F(\alpha^j)=\bar q+\sum_{i=1}^m \alpha^j_i h_i+\sum_{i=m+1}^{m+n} \alpha^j_i k_{i-m},$$

where $$\{h_i\}_{i=1}^{m}$$ and $$\{k_i\}_{i=1}^n$$ are shape and motion basis. 

We equipe our latent space with a **Riemannian metric**:

$$\overline{G}_{\alpha}(\beta,\eta):= G_{F(\alpha)}(F(\beta )-\overline{q},F(\eta )-\overline{q}).,$$

where $$G$$ is a weighted Sobolev metric on $$\operatorname{Imm}$$ [*Hartman et al. 2022*].
<br/>
It has 6 terms, defined as follow:

![image-center]({{ site.url }}{{ site.baseurl }}/images/unregistered/equation_draw.png){: .align-center}

Where $$a_0, a_1, b_1, c_1, d_1, a_2$$ are the metric parameters, set to $$1, 1000, 100, 1, 1, 1$$ in this work (penalizing non isometric deformations).

Using this framework, we define **interpolation** between two shapes $$q_0$$ and $$q_1$$ as the path $$\alpha(t)$$,  minimizer of the following energy:

$$ \tilde E(\alpha)= \int_0^1 \overline{G}_{\alpha}(\partial_t\alpha,\partial_t\alpha) dt +\lambda \Gamma(F(\alpha)(0),q_0)+\lambda \Gamma(F(\alpha)(1),q_1), $$

where $$\Gamma$$ is the varifold [*Charon et al. 2013*] discrepancy metric, and is equal to 0 when both $$\alpha(i)$$ and $q_i$ are reparameterization of each other. This allows to work with **unparameterized** shapes.

We can also define **extrapolation** of the motion of $$q_0$$ with inital velocity $$h = q_1 - q_0$$ as the solution of the equation:

$$ \begin{cases}
   q(0)&=q_0\\
   \partial_t q(0)&=h
   \end{cases},$$

We solve this equation using a Gauss-Newton scheme (details in the paper).


# Video

<iframe src="https://www.youtube.com/embed/5bLGru_OOJQ?rel=0&amp;showinfo=0"
                  frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


<br/>
<br/>

#  Results (registration)
{: style="text-align: center;"}


![image-center]({{ site.url }}{{ site.baseurl }}/images/unregistered_pami/COMA_results_reg.png){: .align-center}
![image-center]({{ site.url }}{{ site.baseurl }}/images/unregistered_pami/reg_cropped_mano.png){: .align-center}


# Results (interpolation)
{: style="text-align: center;"}

![image-center]({{ site.url }}{{ site.baseurl }}/images/unregistered_pami/COMA_results_interp.png){: .align-center}
![image-center]({{ site.url }}{{ site.baseurl }}/images/unregistered_pami/interp_cropped_mano.png){: .align-center}

# New applications
{: style="text-align: center;"}

<figure class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/images/unregistered_pami/expression_transfer2.png" alt="">
  <figcaption>We can extend our framework to other applications as motion transfer in the original paper. Expression transfer is done easily via shape code swapping.</figcaption>
</figure>

# Acknowledgements

This work was supported by ANR projects 16-IDEX-0004 (ULNE) and by ANR-19-CE23-0020 (Human4D); by NSF grants DMS-1912037, DMS-1953244, DMS-1945224 and DMS-1953267, and by FWF grant FWF-P 35813-N. The training of all methods for the experiments presented in this paper were carried out using the Grid’5000 testbed, supported by a scientific interest group hosted by Inria and including CNRS, RENATER and several Universities as well as other organizations (see https://www.grid5000.fr).

# Citation

If you consider our work useful, please cite:

```BibTeX
@article{hartman2025basis,
  title={Basis restricted elastic shape analysis on the space of unregistered surfaces},
  author={Hartman, Emmanuel and Pierson, Emery and Bauer, Martin and Daoudi, Mohamed and Charon, Nicolas},
  journal={International Journal of Computer Vision},
  volume={133},
  number={4},
  pages={1999--2024},
  year={2025},
  publisher={Springer}
}
```



This webpage was inspired by [Nerfies](https://nerfies.github.io/).