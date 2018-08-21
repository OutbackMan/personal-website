---
---

async function preload_page(website_name, page_name, num_resources_to_load) {
  const RESOURCES_HAVE_LOADED = () => { 
    return window.performance.getEntriesByType("resource").length >= 
	         num_resources_to_load;
  };

  const UPDATE = async () => {
	if (RESOURCES_HAVE_LOADED()) {
	  anim_frame_img_dom_elem.style.animationPlayState = "paused";
	  dom_elem.style.opacity = 0;
	  await _sleep(500); // wait until opacity animation finished
		
	  document.body.removeChild(PRELOADER_CSS_DOM_ELEM);
	  document.body.removeChild(PRELOADER_HTML_DOM_ELEM);
      document.documentElement.style = `
        width: 100%;
	    height: 100%;
	  `;
	} else {
	  const SCALE_AMOUNT = window.performance.getEntriesByType("resource").length /
	                         num_resources_to_load;
      
      progress_bar_dom_elem.style.transform = `scaleX(${SCALE_AMOUNT})`;
      progress_bar_dom_elem.innerHTML = `${parseInt(SCALE_AMOUNT * 100, 10)}%`;

      setTimeout(UPDATE, 100);		
	}
  }

  if (!RESOURCES_HAVE_LOADED()) {
    const PRELOADER_HTML = `
      <article class="Preloader__">
	    <h1 class="Preloader__WebsiteName"> 
		  ${website_name} 
		</h1>
        <section class="Preloader__AnimFrame__"/>
		  <div class="Preloader__AnimFrame__Img"></div>
		</section>
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
		  width: 100%;
		  height: 100%;
		  display: flex;
		  flex-flow: column wrap;
		  align-items: center;
		  justify-content: center;
		  opacity: 1;
		  transition: opacity 500ms ease-in-out;
		  background-color: {{ site.primary_color }}
	      color: white;		
		} 

		.Preloader__AnimFrame__ {
		  width: 100%;
		  height: auto;
		}

		.Preloader__AnimFrame__Img {
		  width: 100%:
		  height: auto;
	      background: url("{{ site.url }}/images/preloader.svg") 
		                no-repeat 0% 0%;
		  background-size: 100%;
		  animation: PreloaderImageAnim 2s steps(8) infinite;
		}

        @keyframes PreloaderImageAnim {
		  from {
		    background-position: 0% 0%;  
		  }
		  to {
		    background-position: 0% 100%;  
		  }
		}

		.Preloader__ProgressBar__ {
		  position: relative;
          width: 10em;
		  height: 2em;
		  border: 0.5em solid {{ site.primary_color }};
		}

		.Preloader__ProgressBar__Bar {
		  position: absolute;
          top: 0.2em; left: 0.2em; right: 0.2em; bottom: 0.2em;
		  width: 100%;
		  height: 100%;
		  transform: scaleX(0.05);
		  transition: transform 250ms ease-in-out;
		  background-color: {{ site.primary_color }};
		}

      </style>
	`;

    const HTML_DOM_ELEM = _str_to_dom_elem(PRELOADER_HTML);
    const CSS_DOM_ELEM = _str_to_dom_elem(PRELOADER_CSS);

    document.appendChild(HTML_DOM_ELEM);
    document.appendChild(CSS_DOM_ELEM);

    const ANIM_FRAME_IMG_DOM_ELEM = document.querySelector(".Preloader__AnimFrame__Img");
    const PROGRESS_BAR_DOM_ELEM = document.querySelector(".Preloader__ProgressBar__Bar");

    document.documentElement.style = `
      width: 100vw;
	  height: 100vh;
	`;

    setTimeout(UPDATE, 100, PROGRESS_BAR_DOM_ELEM, );
  }
}
