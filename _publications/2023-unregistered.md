---
title: "BaRe-ESA: A Riemannian Framework for Unregistered Human Body Shapes"
classes: wide
author_profile: false
usemathjax: true
collection: publications
permalink: /publication/unregistered
date: 2023-04-05
author:
  - name: Emmanuel Hartmann
    site: https://github.com/emmanuel-hartman/
  - name: Emery Pierson
    site: https://daidedou.github.io/
  - name: Martin Bauer
    site: https://www.math.fsu.edu/~bauer/
  - name: Nicolas Charon
    site: https://www.math.uh.edu/~ncharon/index.html
  - name: Mohamed Daoudi
    site: https://sites.google.com/view/mohameddaoudi
venue: 'ICCV 2023, Paris'
paperurl: https://openaccess.thecvf.com/content/ICCV2023/html/Hartman_BaRe-ESA_A_Riemannian_Framework_for_Unregistered_Human_Body_Shapes_ICCV_2023_paper.html
---
## [Emmanuel Hartman](https://github.com/emmanuel-hartman/), Emery Pierson, [Martin Bauer](https://www.math.fsu.edu/~bauer/), [Nicolas Charon](https://www.math.uh.edu/~ncharon/index.html), [Mohamed Daoudi](https://sites.google.com/view/mohameddaoudi)
{: style="text-align: center;"}

<div class="column has-text-centered">
  <div class="publication-links">
    <!-- PDF Link. -->
    <span class="link-block">
      <a class="external-link button is-normal is-rounded is-dark" href="https://openaccess.thecvf.com/content/ICCV2023/html/Hartman_BaRe-ESA_A_Riemannian_Framework_for_Unregistered_Human_Body_Shapes_ICCV_2023_paper.html">
        <span class="icon">
            <i class="fas fa-file-pdf"></i>
        </span>
        <span>Paper</span>
      </a>
    </span>
    <!-- Video Link. -->
    <span class="link-block">
      <a class="external-link button is-normal is-rounded is-dark" href="https://www.youtube.com/watch?v=5bLGru_OOJQ">
        <span class="icon">
            <i class="fab fa-youtube"></i>
        </span>
        <span>Video</span>
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
        (experiments coming soon!)
    </span>
  </div>
</div>
{: style="text-align: center;"}

<br />
{: style="text-align: center;"}

We present Basis Restricted Elastic Shape Analysis (BaRe-ESA), a novel Riemannian framework for human body scan representation, interpolation and extrapolation. BaRe-ESA operates directly on unregistered meshes, i.e., without the need to establish prior point to point correspondences or to assume a consistent mesh structure. Our method relies on a latent space representation, which is equipped with a Riemannian (non-Euclidean) metric associated to an invariant higher-order metric on the space of surfaces. Experimental results on the FAUST and DFAUST datasets show that BaRe-ESA brings significant improvements with respect to previous solutions in terms of shape registration, interpolation and extrapolation. The efficiency and strength of our model is further demonstrated in applications such as motion transfer and random generation of body shape and pose. 
{: style="text-align: justify;"}


# Model
{: style="text-align: center;"}

<figure class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/images/unregistered/overview.png" alt="">
  <figcaption>Overwiew of our method. We seek to represent unparameterized human bodies, with different mesh connectivity, and possible noise or topological changes in a disentangled latent space. We define our latent space as the sum of pose and shape spaces. The paths in the latent space are not linear but curved, corresponding to geodesics in the paramaterized human body space. After retrieving the latent codes of the human bodies, we can use the space along with its Riemmanian metric to solve several problems in human body deformation: inter-extrapolation, motion transfer, shape generation.</figcaption>
</figure> 

Our **human shape space** is defined as : 

$$\operatorname{Imm}=\left\{ q\in C^{\infty}(\mathcal{T},\mathbb R^3): Tq \text{ is inj.}\right\}$$

We define a linear **Latent space**, define as $${\mathcal L}\subset \mathbb R^{n+m}$$, with latent vectors $$\alpha$$ of human shapes:

$$F(\alpha^j)=\bar q+\sum_{i=1}^m \alpha^j_i h_i+\sum_{i=m+1}^{m+n} \alpha^j_i k_{i-m},$$

where $$\{h_i\}_{i=1}^{m}$$ and $$\{k_i\}_{i=1}^n$$ are shape and motion basis. 

We equipe our latent space with a **Riemannian metric**:

$$\overline{G}_{\alpha}(\beta,\eta):= G_{F(\alpha)}(F(\beta )-\overline{q},F(\eta )-\overline{q}).,$$

where $$G$$ is a weighted Sobolev metric on $$\operatorname{Imm}$$ [*Hartman et al. 2022*].
\par 
It has 6 terms, defined as follow:

![image-center]({{ site.url }}{{ site.baseurl }}/images/unregistered/equation_draw.png){: .align-center}

Where $$a_0, a_1, b_1, c_1, d_1, a_2$$ are the metric parameters, set to $$1, 1000, 100, 1, 1, 1$$ in this work (penalizing non isometric deformations).

Using this framework, we define **interpolation** between two shapes $$q_0$$ and $$q_1$$ as the path $$\alpha(t)$$,  minimizer of the following energy:

$$ \tilde E(\alpha)= \int_0^1 \overline{G}_{\alpha}(\partial_t\alpha,\partial_t\alpha) dt +\lambda \Gamma(F(\alpha)(0),q_0)+\lambda \Gamma(F(\alpha)(1),q_1), $$

where $$\Gamma$$ is the varifold [*Charon et al. 2013*] discrepancy metric, and is equal to 0 when both $$\alpha(i)$$ and $q_i$ are reparameterization of each other. This allows to work with **unparameterized** human shapes.

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

![image-center]({{ site.url }}{{ site.baseurl }}/images/unregistered/registration.png){: .align-center}

# Results (interpolation)
{: style="text-align: center;"}

![image-center]({{ site.url }}{{ site.baseurl }}/images/unregistered/overlay.gif){: .align-center}
![image-center]({{ site.url }}{{ site.baseurl }}/images/unregistered/compare.gif){: .align-center}

# Applications
{: style="text-align: center;"}

![image-center]({{ site.url }}{{ site.baseurl }}/images/unregistered/motion_transfer.png){: .align-center}
<figure class="align-center">
  <img src="{{ site.url }}{{ site.baseurl }}/images/unregistered/RandomShapes.png" alt="">
  <figcaption>We can extend our framework to other applications. Motion transfer is done easily via shape code swapping. We can also generate random shapes, by training a generative model on initial velocities from the template shape tangent space (details in the paper).</figcaption>
</figure> 

# Citation

<section class="section" id="BibTeX">
  <div class="container is-max-desktop content">
    <h2 class="title">BibTeX</h2>
    <pre><code>@article{hartman2022bareesa,
  author    = {Hartman Emmanuel and Pierson Emery and Bauer Martin and Charon Nicolas and Daoudi Mohamed},
  title     = {BaRe-ESA: A Riemannian Framework for Unregistered Human Body Shapes},
  journal   = {ICCV},
  year      = {2023},
}</code></pre>
  </div>
</section>

