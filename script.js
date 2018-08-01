---
---
function anim_preloader(start_time, preloader, preloader_anim_frames) {
  preloader_anim_frames[anim_preloader.cur_frame].style.display = "table-cell"; 
}

function preload_page(num_resources_to_load) {
  window.requestAnimationFrame((start_time) => {
    anim_preloader(start_time, preloader, preloader_anim_frames);
  });

  const NUM_RESOURCES_LOADED = window.performance.getEntriesByType("resource").length;
  const RESOURCES_LOADED_STATUS_STR = `${(NUM_RESOURCES_LOADED / num_resources_to_load) * 100}%`;
  
  preloader.width = RESOURCES_LOADED_STATUS_STR;
  preloader.dataset.status = RESOURCES_LOADED_STATUS_STR;
  
  if (NUM_RESOURCES_LOADED != num_resources_to_load) {
  	setTimeout(preload_page, 0, num_resources_to_load);
  } else {
        preloader.style["animation-play-state"] = "start"; 
        page.style["animation-play-state"] = "start"; 
  	return;
  }
}

function {{ site.abbrev }}(e) {
  const ELEMS = Object.freeze({
    "PRELOADER": document.querySelector(".Preloader__"),
    "PRELOADER_ANIM_FRAMES": document.querySelectorAll("[class*=Preloader__AnimationFrame]"),
    "PAGE": document.querySelector(".Page__")
  });

  preload_page({{ page.num_resources | plus: 4 }}, ELEMS.PRELOADER, ELEMS.PRELOADER_ANIM_FRAMES, ELEMS.PAGE);

} 

document.addEventListener("DOMContentLoaded", {{ site.abbrev }});
