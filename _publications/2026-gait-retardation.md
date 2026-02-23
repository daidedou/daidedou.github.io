---
title: "A Non-Invasive 3D Gait Analysis Framework for Quantifying Psychomotor Retardation in Major Depressive Disorder"
collection: publications
permalink: /publication/gaitanalysis
date: 2026-02-17
author:
  - name: Fouad Boutaleb
  - name: Emery Pierson
    site: https://daidedou.github.io/
  - name: Mohamed Daoudi
    site: https://sites.google.com/view/mohameddaoudi
  - name: Clémence Nineuil
    site: https://pro.univ-lille.fr/clemence-nineuil
  - name: Ali Amad
    site: https://www.aliamad.com/
  - name: Fabien D'Hondt
    site: https://pro.univ-lille.fr/fabien-dhondt
category: preprint
teaser: gait_analysis_teaser.png
paperurl: https://arxiv.org/abs/2602.15634
---

Predicting the status of Major Depressive Disorder (MDD) from objective, non-invasive methods is an active research field. Yet, extracting automatically objective, interpretable features for a detailed analysis of the patient state remains largely unexplored.
Among MDD's symptoms, Psychomotor retardation (PMR) is a core item, yet its clinical assessment remains largely subjective. While 3D motion capture offers an objective alternative, its reliance on specialized hardware often precludes routine clinical use. In this paper, we propose a non-invasive computational framework that transforms monocular RGB video into clinically relevant 3D gait kinematics. Our pipeline uses Gravity-View Coordinates along with a novel trajectory-correction algorithm that leverages the closed-loop topology of our adapted Timed Up and Go (TUG) protocol to mitigate monocular depth errors. This novel pipeline enables the extraction of 297 explicit gait biomechanical biomarkers from a single camera capture.
To address the challenges of small clinical datasets, we introduce a stability-based machine learning framework that identifies robust motor signatures while preventing overfitting. Validated on the CALYPSO dataset, our method achieves an 83.3% accuracy in detecting PMR and explains 64% of the variance in overall depression severity (R^2=0.64). Notably, our study reveals a strong link between reduced ankle propulsion and restricted pelvic mobility to the depressive motor phenotype. These results demonstrate that physical movement serves as a robust proxy for the cognitive state, offering a transparent and scalable tool for the objective monitoring of depression in standard clinical environments. 

[Download paper here](https://arxiv.org/pdf/2602.15634)