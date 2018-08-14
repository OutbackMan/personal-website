---
---

let preloader_info = Object.create(null);
preloader_info["dom_elem"] = document.querySelector(".Preloader__");
preloader_info["dom_elem_progress_bar"] = document.querySelector(".Preloader__ProgressBar");
preloader_info["dom_elem_anim_frames"] = document.querySelectorAll(".Preloader__AnimationFrame__");
preloader_info["num_anim_frames"] = preloader_info.dom_elem_anim_frames.length;
preloader_info["is_active"] = false;
preloader_info["anim_duration"] = 500;
preloader_info["time_per_frame"] = preloader_info.anim_duration / preloader_info.num_anim_frames;
preloader_info["when_last_anim_update"] = 0;
preloader_info["since_last_anim_update"] = 0;
preloader_info["active_frame_num"] = 0;

function anim_preloader(cur_time) {
  if (preloader_info.is_active) {
    if (preloader_info.when_last_anim_update === 0) {
      preloader_info.when_last_anim_update = cur_time; 
    }
    
    preloader_info.since_last_anim_update = cur_time - preloader_info.when_last_anim_update;

    if (preloader_info.since_last_anim_update > preloader_info.time_per_frame) {
       preloader_info.dom_elem_anim_frames[preloader_info.active_frame_num].style.display = "none"; 

       const NEXT_FRAME_INDEX = (preloader_info.active_frame_num + 1) % preloader_info.num_anim_frames; 
       preloader_info.dom_elem_anim_frames[NEXT_FRAME_INDEX].style.display = "table-cell"; 

       preloader_info.when_last_anim_update = cur_time;

       preloader_info.active_frame_num = NEXT_FRAME_INDEX; 
    }

    window.requestAnimationFrame(anim_preloader));

  } else {
    return; 
  }
}

function preload_page(num_resources_to_load) {
  if (!preloader_info.is_active) {
    window.requestAnimationFrame(anim_preloader);
    preloader_info.is_active = true;
  }

  const NUM_RESOURCES_LOADED = window.performance.getEntriesByType("resource").length;
  const RESOURCES_LOADED_STATUS_STR = `${(NUM_RESOURCES_LOADED / num_resources_to_load) * 100}%`;
  
  preloader_info.dom_elem_progress_bar.width = RESOURCES_LOADED_STATUS_STR;
  preloader_info.dom_elem_progress_bar.dataset.status = RESOURCES_LOADED_STATUS_STR;
  
  if (NUM_RESOURCES_LOADED != num_resources_to_load) {
    setTimeout(preload_page, 0, num_resources_to_load);
  } else {
    preloader_info.is_active = false;
    preloader_info.dom_elem.style["animation-play-state"] = "start"; 
  }
}


// use border-right for cursor
function auto_type(auto_type_dom_elem) {
  const PHRASES_TO_TYPE = JSON.parse(auto_type_dom_elem.dataset.phrases);

  
  let displayed_phrase = "";
  let counter = 0;
  PHRASES_TO_TYPE.forEach((phrase) => {
    let want_to_delete_displayed_phrase = false;
    while (!want_to_delete_displayed_phrase && displayed_phrase.length !== 0) {
      if (want_to_delete_displayed_phrase) {
        displayed_phrase.substring(0, displayed_phrase.length - 1);
      } else {
        displayed_phrase += phrase[counter++];
        AUTO_TYPING_ELEM.innerHTML = displayed_phrase;
      }
      
      if (!want_to_delete_displayed_phrase && displayed_phrase.length === phrase.length) {
        want_to_delete_displayed_phrase = true;
      }
    }
    counter = 0;
  });
  window.requestAnimationFrame((start_time) => {
	  
  });
}

function auto_type_ch() {
  window.requestAnimationFrame((start_time) => {
	  
  });
}
