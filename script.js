---
---

/*
 *function computation(n) {
	let start = Date.now();
  let duration = Math.random() * 300 + 100;
  while(Date.now() - start < duration);
  return n * n;
}
let inputs = Array.from({length: 50}, (_, x) => x);
let index = 0;
let progress = document.querySelector('progress');
let results = [];
function next() {
	let n = inputs[index++];
  results.push(computation(n));
  progress.value = index / inputs.length;
  if (index < inputs.length) {
  	setTimeout(next, 0);
  } else {
  	document.querySelector('div').innerHTML = results.join(', ');
  }
}
setTimeout(next, 0); 
 */


function wait_till_resources_loaded() {
  const NUM_RESOURCES_TO_LOAD = 5;
}

function {{ site.abbrev }}(e) {
  console.log("DOM Content Loaded");
} 

document.addEventListener("DOMContentLoaded", {{ site.abbrev }});
