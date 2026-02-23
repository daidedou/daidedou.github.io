---
title: "Beyond ReLU: Bifurcation, Oversmoothing, and Topological Priors"
collection: publications
permalink: /publication/beyondrelu
date: 2026-02-17
author:
  - name: Erkan Turan
    site: https://ehturan.github.io/
  - name: Gaspard Abel
    site: https://www.gas-abel.fr/
  - name: Maysam Behmanesh
    site: https://maysambehmanesh.github.io/
  - name: Emery Pierson
    site: https://daidedou.github.io/
  - name: Maks Ovsjanikov
    site: https://www.lix.polytechnique.fr/~maks/
category: preprint
teaser: beyondrelu-teaser.png
paperurl: https://arxiv.org/abs/2602.15634
---

Graph Neural Networks (GNNs) learn node representations through iterative network-based message-passing. While powerful, deep GNNs suffer from oversmoothing, where node features converge to a homogeneous, non-informative state. We re-frame this problem of representational collapse from a *bifurcation theory* perspective, characterizing oversmoothing as convergence to a stable ``homogeneous fixed point.'' Our central contribution is the theoretical discovery that this undesired stability can be broken by replacing standard monotone activations (e.g., ReLU) with a class of functions. Using Lyapunov-Schmidt reduction, we analytically prove that this substitution induces a bifurcation that destabilizes the homogeneous state and creates a new pair of stable, non-homogeneous *patterns* that provably resist oversmoothing. Our theory predicts a precise, nontrivial scaling law for the amplitude of these emergent patterns, which we quantitatively validate in experiments. Finally, we demonstrate the practical utility of our theory by deriving a closed-form, bifurcation-aware initialization and showing its utility in real benchmark experiments. 


[Download paper here](https://arxiv.org/pdf/2602.15634)