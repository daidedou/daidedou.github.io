---
title: "VariGrad: A Novel Feature Vector Architecture for Geometric Deep Learning on Unregistered Data"
collection: publications
permalink: /publication/varigrad
date: 2023-09-01
author:
  - name: Emmanuel Hartmann
    site: https://emmanuel-hartman.github.io/
  - name: Emery Pierson
    site: https://daidedou.github.io/
venue: 'Eurographics Workshop on 3D Object Retrieval (3DOR)'
teaser: varigrad_teaser.png
paperurl: https://arxiv.org/pdf/2307.03553
code: https://github.com/emmanuel-hartman/Pytorch_VariGrad
---

We present a novel geometric deep learning layer that leverages the varifold gradient (VariGrad) to compute feature vector representations of 3D geometric data. These feature vectors can be used in a variety of downstream learning tasks such as classification, registration, and shape reconstruction. Our model's use of parameterization independent varifold representations of geometric data allows our model to be both trained and tested on data independent of the given sampling or parameterization. We demonstrate the efficiency, generalizability, and robustness to resampling demonstrated by the proposed VariGrad layer.

Published as a [short paper](https://arxiv.org/pdf/2307.03553) at [3DOR 2023](https://sites.google.com/view/3dor2023).