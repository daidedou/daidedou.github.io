---
title: "Classification of human body surfaces using geometrical invariants"
collection: talks
type: "Seminar talk"
venue: "ETH Zurich"
event: "Young data scientists seminar"
date: 2022-01-20
location: "Zurich, Switzerland"
usemathjax: true
---

We analyze human poses and motion by introducing three sequences of easily calculated surface descriptors that are invariant under reparametrizations and Euclidean transformations. The key idea behind these descriptors is our convexity hypothesis: we suggest that most human poses are (almost) uniquely defined by their convex hull. We formulate the descriptors by associating to each finitely-triangulated surface two functions on the unit sphere: for each unit vector \\( \vec{u} \\) we compute the weighted area of the projection of the surface onto the plane orthogonal to \\( \vec{u} \\) and the length of its projection onto the line spanned by u. The \\( L_2 \\) norms and inner products of the projections of these functions onto the space of spherical harmonics of order \\( k \\) provide us with three sequences of Euclidean and reparametrization invariants of the surface. The use of these invariants reduces the comparison of 3D+time surface representations to the comparison of polygonal curves in \\( \mathbb{R}^n \\). The experimental results on artificial datasets are promising. Moreover, a slight modification of our method yields good results on noisy, real applications.