---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
---

{% if site.author.googlescholar %}
  You can also find an up-to-date list of articles on my <a href="{{site.author.googlescholar}}">Google Scholar</a> profile.
{% endif %}


{% include base_path %}

{% for post in site.publications reversed %}
  {% unless post.categories contains "preprint" %}
    {% include archive-single-publi.html %}
  {% endunless %}
{% endfor %}

<h2> Preprints </h2>

{% for post in site.publications reversed %}
  {% if post.categories contains "preprint" %}
    {% include archive-single-publi.html %}
  {% endif %}
{% endfor %}


<h2> Thesis Manuscript </h2>
  You can find and download [here](https://hal.science/tel-04064016) my PhD thesis manuscript, entitled _3D and 4D Human body surface comparison and deformation: From geometric invariants to Riemannian shape analysis_. 
  
