---
layout: archive
title: "Curriculum Vitae"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

I am a computer science researcher working at the intersection of geometry,
machine learning, and 3D vision. My work focuses on geometric deep learning,
non-rigid shape analysis, and generative models for complex 3D data.

## Latest degree

**PhD in Computer Science and Applied Mathematics — University of Lille, 2023**

My doctoral research focused on the comparison, retrieval, deformation, and
representation of 3D and 4D human-body surfaces.

## Latest professional experience

**Postdoctoral Researcher — LIX, École Polytechnique · Jan 2024–Dec 2026**

I develop generative models for non-rigid 3D shapes from raw scans with little
or no preprocessing, with an emphasis on robust geometric representations and
data-driven shape analysis.

## Full curriculum vitae

The complete CV, including publications, teaching, academic service, invited
talks, and technical skills, is available below.

<a href="{{ '/files/cv.pdf' | relative_url }}" class="btn btn--primary">
  Download the CV as PDF
</a>

<!-- <object
  data="{{ '/files/cv.pdf' | relative_url }}#page=1&view=FitH"
  type="application/pdf"
  width="100%"
  height="800"
  style="height: min(80vh, 800px); margin-top: 1.5rem; border: 1px solid #e5e7eb;"
  aria-label="Emery Pierson curriculum vitae">
  <p>
    This browser cannot display the embedded PDF.
    <a href="{{ '/files/cv.pdf' | relative_url }}">Open the CV in a new tab.</a>
  </p>
</object> -->

<div class="cv-pdf">
  <iframe
    src="{{ '/files/cv.pdf' | relative_url }}#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
    title="Curriculum Vitae d’Emery Pierson"
    loading="lazy">
  </iframe>
</div>

<style>
  .cv-pdf {
    width: 100%;
    height: min(80vh, 800px);
    margin-top: 1.5rem;
    overflow: hidden;
    border: 1px solid #e5e7eb;
  }

  .cv-pdf iframe {
    display: block;
    width: 100%;
    height: 100%;
    border: 0;
  }
</style>
