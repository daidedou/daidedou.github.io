---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% if author.googlescholar %}
  You can also find my articles on <u><a href="{{author.googlescholar}}">my Google Scholar profile</a>.</u>
{% endif %}

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single-publi.html %}
{% endfor %}

<h2> Thesis Manuscript <h2/>
  You can find and download [here](https://hal.science/tel-04064016) my PhD thesis manuscript, entitled _3D and 4D Human body surface comparison and deformation: From geometric invariants to Riemannian shape analysis_. 
  
