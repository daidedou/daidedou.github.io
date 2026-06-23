---
title: "PatchAlign3D: Local Feature Alignment for Dense 3D Shape Understanding"
collection: publications
permalink: /publication/patchalign3d
date: 2026-02-01
author:
  - name: Souhail Hadgi
    site: https://souhail-hadgi.github.io/
  - name: Bingchen Gong
    site: https://s2.hk/
  - name: Ramana Sundararaman
    site: https://sentient07.github.io/
  - name: Emery Pierson
    site: https://daidedou.github.io/
  - name: Lei Li
    site: https://craigleili.github.io/
  - name: Peter Wonka
    site: https://peterwonka.net/
  - name: Maks Ovsjanikov
    site: https://www.lix.polytechnique.fr/~maks/
venue: 'IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)'
teaser: patch_teaser.png
website: https://souhail-hadgi.github.io/patchalign3dsite/
paperurl: https://arxiv.org/abs/2601.02457
code: https://github.com/souhail-hadgi/PatchAlign3D
---


**Q: What is the missing piece in current 3D foundation models?**

*While they excel at global tasks like classification, they often fail at dense, local part-level reasoning.*

<br>

**Q: How does PatchAlign3D solve this?**

*We introduce a two-stage training process that distills 2D visual features into 3D patches and aligns them with text, creating the first language-aligned local 3D encoder.*

<br>

**Q: Does it work on any object category?**

*Yes. It is fully zero-shot and open-vocabulary. You can segment parts of any object simply by typing a text query (e.g., "handle", "landing gear"), even if the model has never seen that category before.*

<br>

**Q: Is it efficient at test time?**

*Yes. PatchAlign3D is a single feed-forward encoder that requires no multi-view rendering at inference, enabling fast zero-shot part segmentation.*


[Download paper here](https://arxiv.org/pdf/2601.02457)