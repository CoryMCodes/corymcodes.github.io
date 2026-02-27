---
layout: default
title: Home
---

## Posts

{% for post in site.posts %}
### [{{ post.title }}]({{ post.url }})
<p class="post-meta">{{ post.date | date: "%B %d, %Y" }}</p>
<p>{{ post.summary }}</p>
{% endfor %}
