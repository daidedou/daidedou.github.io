---
title: "Toward Mesh-Invariant 3D Generative Deep Learning with Geometric Measures"
collection: publications
permalink: /publication/geom-autoenc
date: 2023-09-01
author: 
  - name: Thomas Besnier
    site: https://tbesnier.github.io/
  - name: Sylvain Arguillère 
    site: http://math.univ-lyon1.fr/~arguillere/
  - name: Emery Pierson
    site: https://daidedou.github.io/
  - name: Mohamed Daoudi
    site: https://sites.google.com/view/mohameddaoudi
venue: 'Computer & Graphics, Special Section 3D Object Retrieval (3DOR)'
teaser: GM_loss.png
paperurl: https://arxiv.org/pdf/2306.15762
---

3D generative modeling is accelerating as the technology allowing the capture of geometric data is developing. However, the acquired data is often inconsistent, resulting in unregistered meshes or point clouds. Many generative learning algorithms require correspondence between each point when comparing the predicted shape and the target shape. We propose an architecture able to cope with different parameterizations, even during the training phase. In particular, our loss function is built upon a kernel-based metric over a representation of meshes using geometric measures such as currents and varifolds. The latter allows to implement an efficient dissimilarity measure with many desirable properties such as robustness to resampling of the mesh or point cloud. We demonstrate the efficiency and resilience of our model with a generative learning task of human faces.

This paper was first presented orally at the 2023 3D Object Retrieval Workshop  ([3DOR 2023](https://sites.google.com/view/3dor2023/program/3dor-program)).