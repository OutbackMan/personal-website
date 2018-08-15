---
---

function preload_page(num_resources_to_load, on_page_load_functions) {
  let preloader = Object.create(null);
  preloader.dom_elem = document.querySelector(".Preloader__");
  preloader.progress_bar_dom_elem = document.querySelector(".Preloader__ProgressBar");
  preloader.progress_bar_class_str = ".Preloader__ProgressBar::after";
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
    const RESOURCES_LOADED_STATUS_STR = `${(NUM_RESOURCES_LOADED / num_resources_to_load) * 100}%`;
    
	// check against previous value to avoid re-inserting
    document.querySelector("style").sheet.insertRule(`${preloader.progress_bar_class_str} {width: ${RESOURCES_LOADED_STATUS_STR};}`)
    preloader.progress_bar_dom_elem.dataset.status = RESOURCES_LOADED_STATUS_STR;
    
	if (NUM_RESOURCES_LOADED != num_resources_to_load) {
      window.requestAnimationFrame(preloader.animate);
	} else {
      // preloader.dom_elem.style.animationPlayState = "running"; some reason not working
      preloader.dom_elem.style.display = "none";
	  on_page_load_functions.forEach((page_function) => {
	    page_function();  
	  });
	}
  }

  if (window.performance.getEntriesByType("resource").length !== num_resources_to_load) {
    window.requestAnimationFrame(preloader.animate);
  } else {
    preloader.dom_elem.style.display = "none";
	on_page_load_functions.forEach((page_function) => {
      page_function();  
	});
  }
}

function handle_menu() {
  let want_to_show_menu = false;	
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
