---
title: "Projection-based classification of surfaces for 3D human mesh sequence retrieval"
collection: publications
permalink: /publication/projection-based-classification
date: 2021-11-16
author: 
  - name: Emery Pierson
    site: https://daidedou.github.io/
  - name: Juan Carlos Alvarez Paiva
    site: https://scholar.google.com/citations?user=OZJvCd8AAAAJ
  - name: Mohamed Daoudi
    site: https://sites.google.com/view/mohameddaoudi
venue: 'Computer & Graphics, Special Section Shape Modeling International'
teaser: projection_based/teaser.png
video: https://drive.google.com/file/d/1QybWovjEJrqoPWGJIDaISGN7Z7G1xcOu/preview
paperurl: projection_based/paper.pdf
---

We analyze human poses and motion by introducing three sequences of easily calculated surface descriptors that are invariant under reparametrizations and Euclidean transformations. These descriptors are obtained by associating to each finitely-triangulated surface two functions on the unit sphere: for each unit vector u we compute the weighted area of the projection of the surface onto the plane orthogonal to u and the length of its projection onto the line spanned by u. The L2 norms and inner products of the projections of these functions onto the space of spherical harmonics of order k provide us with three sequences of Euclidean and reparametrization invariants of the surface. The use of these invariants reduces the comparison of 3D+time surface representations to the comparison of polygonal curves in Rn. The experimental results on the FAUST and CVSSP3D artificial datasets are promising. Moreover, a slight modification of our method yields good results on the noisy CVSSP3D real dataset.

This paper was first presented orally at the conference Shape Modeling International ([SMI 2021](https://smi2021.github.io/#program)). You can download the paper [here](http://daidedou.github.io/files/projection_based/paper.pdf) a video of the presentation (it was live so the quality may be bad) [here](https://drive.google.com/file/d/1QybWovjEJrqoPWGJIDaISGN7Z7G1xcOu/preview).
