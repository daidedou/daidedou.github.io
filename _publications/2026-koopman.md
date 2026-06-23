---
title: " Unfolding Generative Flows with Koopman Operators: Fast and Interpretable Sampling "
collection: publications
permalink: /publication/koopmanflows
date: 2026-01-17
author:
  - name: Erkan Turan
    site: https://ehturan.github.io/
  - name: Aristotelis Siozopoulos
  - name: Louis Martinez
    site: https://scholar.google.com/citations?user=UwfztWsAAAAJ
  - name: Julien Gaubil
    site: https://jgaubil.com/
  - name: Emery Pierson
    site: https://daidedou.github.io/
  - name: Maks Ovsjanikov
    site: https://www.lix.polytechnique.fr/~maks/
category: preprint
teaser: koopman_flow.png
paperurl: https://arxiv.org/abs/2506.22304
---

Continuous Normalizing Flows (CNFs) enable elegant generative modeling but remain bottlenecked by their iterative nature requiring costly sampling and lacking interpretability of the intermediate states. Recent approaches accelerate sampling by straightening trajectories or distilling endpoints, yet they treat the original generative process as a black box, discarding the teacher’s intermediate dynamics. We propose a fundamentally different perspective: globally linearizing flow dynamics via Koopman theory to achieve trajectory-preserving linearization. By lifting Conditional Flow Matching (CFM) into a higher-dimensional Koopman space, we represent its evolution with a single linear operator. Crucially, unlike boundary-only distillation, our method enforces infinitesimal consistency with the teacher's vector field along *the full generative path*. We derive a practical, simulation-free training objective that ensures this global alignment and yields two key benefits. First, sampling becomes one-step and parallelizable. Second, because the linearization is faithful to the dynamics, the Koopman operator provides unique insights on the generation. We demonstrate that this structure enables novel applications unavailable in prior approaches, including discovery of semantically coherent editing directions, inversion with a teacher-aligned linear operator and class-conditional spectral signatures. Empirically, our approach achieves competitive sample quality, while enabling spectral analysis and control of the *entire trajectories* of generative flows.


[Download paper here](https://arxiv.org/pdf/2506.22304)