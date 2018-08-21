---
---

function _sleep(time_ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, time_ms));	
}

function _str_to_dom_elem(str) {
  let template_dom_elem = document.createElement("template"); 	
  template_dom_elem.innerHTML = str.trim();
  return template_dom_elem.content.firstChild;
}

{% include js/preload-page.js %}
