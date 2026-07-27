---
title: "Category agnostic priors for non-rigid shape matching"
collection: talks
type: "Seminar"
venue: "Université de Lille"
event: " Geometric Deep Learning and Generative Models for 3D Human (GeoGen3DHuman)"
date: 2025-11-09
location: "Online"
usemathjax: true
---

Deep functional maps have recently emerged as a powerful tool for solving non-rigid shape correspondence tasks. Methods that use this approach combine the power and flexibility of the functional map framework, with data-driven learning for improved accuracy and generality. However, most existing methods in this area restrict the learning aspect only to the feature functions and still rely on axiomatic modeling for formulating the training loss or for functional map regularization inside the networks. This limits both the accuracy and the applicability of the resulting approaches only to scenarios where assumptions of the axiomatic models hold. In this work, we show, for the first time, that both in-network regularization and functional map training can be replaced with data-driven methods. For this, we first train a generative model of functional maps in the spectral domain using score-based generative modeling, built from a large collection of high-quality maps. We then exploit the resulting model to promote the structural properties of ground truth functional maps on new shape collections. Remarkably, we demonstrate that the learned models are category-agnostic, and can fully replace commonly used strategies such as enforcing Laplacian commutativity or orthogonality of functional maps. Our key technical contribution is a novel distillation strategy from diffusion models in the spectral domain. Experiments demonstrate that our learned regularization leads to better results than axiomatic approaches for zero-shot non-rigid shape matching.