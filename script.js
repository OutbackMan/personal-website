---
---

function preload_page(num_resources_to_load, on_page_load_functions) {
  let preloader = Object.create(null);
  preloader.dom_elem = document.querySelector(".Preloader__");
  preloader.progress_bar_dom_elem = document.querySelector(".Preloader__ProgressBar");
  preloader.anim_frames_dom_elems = document.querySelectorAll(".Preloader__AnimationFrame__");
  preloader.num_anim_frames = preloader.anim_frames_dom_elems.length;
  preloader.is_active = false;
  preloader.anim_duration = 500;
  preloader.desired_time_per_frame = preloader.anim_duration / preloader.num_anim_frames;
  preloader.prev_anim_frame_end_time = window.performance.now();
  preloader.time_between_anim_frames = 0;
  preloader.visible_frame_num = 0;

  preloader.animate = function(cur_anim_frame_start_time) {
    preloader.time_between_anim_frames = cur_anim_frame_start_time - 
	                                       preloader.prev_anim_frame_end_time;

    if (preloader.time_between_anim_frames > preloader.desired_time_per_frame) {
       preloader.anim_frames_dom_elems[preloader.visible_anim_frame_num].style.display = "none"; 

       const NEXT_VISIBLE_ANIM_FRAME_NUM = (preloader.visible_anim_frame_num + 1) % 
	                                         preloader.num_anim_frames; 

       preloader.anim_frames_dom_elems[NEXT_VISIBLE_ANIM_FRAME_NUM].style.display = "table-cell"; 

       preloader.when_last_anim_update = cur_time;

       preloader.active_frame_num = NEXT_FRAME_INDEX; 
    }

    const NUM_RESOURCES_LOADED = window.performance.getEntriesByType("resource").length;
    const RESOURCES_LOADED_STATUS_STR = `${(NUM_RESOURCES_LOADED / num_resources_to_load) * 100}%`;
    
    preloader_info.dom_elem_progress_bar.width = RESOURCES_LOADED_STATUS_STR;
    preloader_info.dom_elem_progress_bar.dataset.status = RESOURCES_LOADED_STATUS_STR;
    
    }

	if (preloader.num_resources_loaded != preloader.num_resources_to_load) {
      window.requestAnimationFrame(anim_preloader));
	} else {
      preloader_info.is_active = false;
      preloader_info.dom_elem.style["animation-play-state"] = "start"; 
	}
  }

  window.requestAnimationFrame(preloader.animate);
}

function auto_type() {
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
