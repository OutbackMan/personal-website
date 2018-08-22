async function preload_page(website_name, page_name, num_resources_to_load) {
  const RESOURCES_HAVE_LOADED = () => { 
    return window.performance.getEntriesByType("resource").length >= 
	         num_resources_to_load;
  };

  const UPDATE = async (html_dom_elem, css_dom_elem, dom_elem, 
                         anim_frame_img_dom_elem, progress_bar_dom_elem) => {
	if (RESOURCES_HAVE_LOADED()) {
      progress_bar_dom_elem.style.transform = "scaleX(1)";
      progress_bar_dom_elem.innerHTML = "100%";

	  anim_frame_img_dom_elem.style.animationPlayState = "paused";
	  dom_elem.style.opacity = 0;
	  await _sleep(2000); // wait until opacity animation finished
		
	  document.body.removeChild(css_dom_elem);
	  document.body.removeChild(html_dom_elem);
      document.body.style = `
        width: 100%;
	    height: 100%;
	  `;
	  document.querySelector(".Display__").style.transform = "scale(1, 1)";
	} else {
	  const SCALE_AMOUNT = window.performance.getEntriesByType("resource").length /
	                         num_resources_to_load;
      
      progress_bar_dom_elem.style.transform = `scaleX(${SCALE_AMOUNT})`;
      progress_bar_dom_elem.innerHTML = `${parseInt(SCALE_AMOUNT * 100, 10)}%`;

      window.requestAnimationFrame((start_time) => {
	    UPDATE( 
	  	   html_dom_elem, 
	  	   css_dom_elem, 
	  	   dom_elem,
	  	   anim_frame_img_dom_elem, 
	  	   progress_bar_dom_elem
	       );
	  });
	}
  }

  await _sleep(50); // ensure load cached page

  if (window.performance.getEntriesByType("resource").length < num_resources_to_load - 1) {
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
		  position: absolute;
		  left: 0; right: 0; top: 0; bottom: 0;
		  display: flex;
		  flex-flow: column wrap;
		  align-items: center;
		  justify-content: center;
		  opacity: 1;
		  transition: opacity 2s ease-in-out;
		  background-color: {{ site.primary_color }};
	      color: white;		
		  z-index: 10;
		} 

        .Preloader__WebsiteName {
	     margin-bottom: 0.5em;		
		}

		.Preloader__AnimFrame__ {
		  width: 20em;
		  height: 20em;
		}

		.Preloader__AnimFrame__Img {
		  width: 100%;
		  height: 100%;
		  display: block;
	      background-image: url("{{ site.url }}/images/preloader.svg");
		  background-size: 800%;
		  background-position: 800% 0;
		  animation: PreloaderImageAnim 750ms steps(8) infinite;
		}

        @keyframes PreloaderImageAnim {
		  from {
		    background-position-x: 800%;
		  }
		  to {
		    background-position-x: 0;
		  }
		}

		.Preloader__ProgressBar__ {
		  position: relative;
          width: 20em;
		  height: 2em;
		  border: 0.2em solid white;
		}

		.Preloader__ProgressBar__Bar {
		  color: {{ site.primary_color }};
		  font-weight: 550;
		  position: absolute;
          top: 0.2em; left: 0.2em; right: 0.2em; bottom: 0.2em;
		  width: auto;
		  height: auto;
		  transform: scaleX(0.05);
		  transform-origin: left;
		  transition: transform 250ms ease-in-out;
		  background-color: white;
		  display: flex; justify-content: center; align-items: center;
		}
		
		.Preloader__PageName {
	      margin-top: 0.5em;		
		}

      </style>
	`;

    const HTML_DOM_ELEM = _str_to_dom_elem(PRELOADER_HTML);
    const CSS_DOM_ELEM = _str_to_dom_elem(PRELOADER_CSS);

    document.body.appendChild(HTML_DOM_ELEM);
    document.body.appendChild(CSS_DOM_ELEM);

    const ANIM_FRAME_IMG_DOM_ELEM = document.querySelector(".Preloader__AnimFrame__Img");
    const PROGRESS_BAR_DOM_ELEM = document.querySelector(".Preloader__ProgressBar__Bar");
	const DOM_ELEM = document.querySelector(".Preloader__");

    document.body.style = `
      width: 100vw;
	  height: 100vh;
	`;

    window.requestAnimationFrame((start_time) => {
	  UPDATE( 
		 HTML_DOM_ELEM, 
		 CSS_DOM_ELEM, 
		 DOM_ELEM,
		 ANIM_FRAME_IMG_DOM_ELEM, 
		 PROGRESS_BAR_DOM_ELEM
	     );
	});
  } else {
    document.querySelector(".Display__").style = `
	  transform: scale(1, 1);
	  background-color: white; 
	`; // background-color forces repaint;
  }
}
