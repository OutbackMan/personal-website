async function preload_page(website_name, page_name, num_resources_to_load) {
  const RESOURCES_HAVE_LOADED = () => { 
    return window.performance.getEntriesByType("resource").length >= 
	         num_resources_to_load;
  };

  const UPDATE = async () => {
	if (RESOURCES_HAVE_LOADED()) {
	  preloader_image_dom_elem.style.animationPlayState = "paused";
	  preloader_dom_elem.style.opacity = 0;
	  await _sleep(500); // wait until opacity animation finished
		
	  document.body.removeChild(PRELOADER_CSS);
	  document.body.removeChild(PRELOADER_HTML);
      document.documentElement.style = `
        width: 100%;
	    height: 100%;
	  `;
	} else {
      setTimeout(UPDATE, 100);		
	}
  }

  if (!RESOURCES_HAVE_LOADED()) {
    const PRELOADER_HTML = `
      <article class="Preloader__">
	    <h1 class="Preloader__WebsiteName"> 
		  ${website_name} 
		</h1>
        <section class="Preloader__Image" /></section>
		<section class="Preloader__ProgressBar__">
          <div class="Preloader__ProgressBar__Bar"></div>
		</section>
		<h2 class="Preloader__PageName">
		  Loading ${page_name} ...
		</h2>
	  </article>
    `;

    const PRELOADER_CSS = `
      <style>
	    .Preloader__ {
		  opacity: 1;
		  transition: opacity 500ms ease-in-out;
		} 
		.Preloader__Image {
		  width:
		  height: 
	      background-image: url();
		  animation: PreloaderImageAnim 2s steps(8) infinite;
		}

        @keyframes PreloaderImageAnim {
		  0% {
		    transform: translateX(0);	  
		  }
		  100% {
		    transform: translateX(100%);  
		  }
		}
      </style>
	`;


    document.appendChild(_str_to_dom_elem(PRELOADER_HTML));

    document.documentElement.style = `
      width: 100vw;
	  height: 100vh;
	`;

    setTimeout(UPDATE, 100, PROGRESS_BAR_DOM_ELEM, );
  }


	const SCALE_AMOUNT = NUM_RESOURCES_LOADED / num_resources_to_load; 
    const RESOURCES_LOADED_STATUS_STR = `${parseInt(SCALE_AMOUNT * 100, 10)}%`;
    
    preloader.progress_bar_bar_dom_elem.style.transform = `scale(${SCALE_AMOUNT}, 1)`;
    preloader.progress_bar_bar_dom_elem.innerHTML = RESOURCES_LOADED_STATUS_STR;
}

