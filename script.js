---
---

function {{ site.abbrev }}(e) {
  console.log("DOM Content Loaded");
} 

document.addEventListener("DOMContentLoaded", {{ site.abbrev }});
