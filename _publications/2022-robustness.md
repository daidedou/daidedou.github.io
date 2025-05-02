---
title: "Parameterization Robustness of 3D Auto-Encoders"
collection: publications
permalink: /publication/robustness
date: 2022-09-01
author: 
  - name: Thomas Besnier
    site: https://tbesnier.github.io/
  - name: Sylvain Arguillère 
    site: http://math.univ-lyon1.fr/~arguillere/
  - name: Emery Pierson
    site: https://daidedou.github.io/
  - name: Mohamed Daoudi
    site: https://sites.google.com/view/mohameddaoudi
venue: 'Eurographics Workshop on 3D Object Retrieval (3DOR)'
teaser: robustness_ellipses.png
paperurl: https://diglib.eg.org/handle/10.2312/3dor20221180
---

The generation of 3-dimensional geometric objects in the most efficient way is a thriving research topic with, for example, the development of geometric deep learning, extending classical machine learning concepts to non euclidean data such as graphs or meshes. In this short paper, we study the effect of a reparameterization on two popular mesh and point cloud neural networks in an auto-encoder mode: PointNet [QSMG16] and SpiralNet [BBP∗19]. Finally, we tested a modified version of PointNet that takes orientation into account (through coordinates of the normals) as a first step towards the construction of a geometric deep learning model built with a more flexible metric regarding the parameterization. The experimental results on standardized face datasets show that SpiralNet is more robust to the reparametrization than PointNet in this specific context with the proposed reparameterization.

Published as a [short paper](https://diglib.eg.org/handle/10.2312/3dor20221180) at 3DOR 2022.