---
---

function preload_page(num_resources_to_load) {
  let preloader = Object.create(null);
  preloader.dom_elem = document.querySelector(".Preloader__");
  preloader.progress_bar_dom_elem = document.querySelector(".Preloader__ProgressBar");
  preloader.progress_bar_bar_dom_elem = document.querySelector(".Preloader__ProgressBar__Bar");
  preloader.anim_frames_dom_elems = document.querySelectorAll(".Preloader__AnimationFrame__");
  preloader.num_anim_frames = preloader.anim_frames_dom_elems.length;
  preloader.anim_duration = 500;
  preloader.desired_time_per_anim_frame = preloader.anim_duration / preloader.num_anim_frames;
  preloader.prev_anim_frame_end_time = window.performance.now();
  preloader.time_between_anim_frames = 0;
  preloader.visible_anim_frame_num = 0;

  preloader.animate = function(cur_anim_frame_start_time) {
    preloader.time_between_anim_frames = cur_anim_frame_start_time - 
	                                       preloader.prev_anim_frame_end_time;

    if (preloader.time_between_anim_frames > preloader.desired_time_per_anim_frame) {
       preloader.anim_frames_dom_elems[preloader.visible_anim_frame_num].style.display = "none"; 

       const NEXT_VISIBLE_ANIM_FRAME_NUM = (preloader.visible_anim_frame_num + 1) % 
	                                         preloader.num_anim_frames; 

       preloader.anim_frames_dom_elems[NEXT_VISIBLE_ANIM_FRAME_NUM].style.display = "table-cell"; 

       preloader.prev_anim_frame_end_time = cur_anim_frame_start_time;

       preloader.visible_anim_frame_num = NEXT_VISIBLE_ANIM_FRAME_NUM; 
    }

    const NUM_RESOURCES_LOADED = window.performance.getEntriesByType("resource").length;
	const SCALE_AMOUNT = NUM_RESOURCES_LOADED / num_resources_to_load; 
    const RESOURCES_LOADED_STATUS_STR = `${parseInt(SCALE_AMOUNT * 100, 10)}%`;
    
	// check against previous value to avoid re-inserting
    preloader.progress_bar_bar_dom_elem.style.transform = `scale(${SCALE_AMOUNT}, 1)`;
    preloader.progress_bar_bar_dom_elem.innerHTML = RESOURCES_LOADED_STATUS_STR;
    
	if (NUM_RESOURCES_LOADED != num_resources_to_load) {
      window.requestAnimationFrame(preloader.animate);
	} else {
      preloader.dom_elem.style.opacity = 0;
	}
  }

  if (window.performance.getEntriesByType("resource").length !== num_resources_to_load) {
    window.requestAnimationFrame(preloader.animate);
  } else {
    preloader.dom_elem.style.opacity = 0;
  }
}

function auto_type() {}

/*
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
}*/
