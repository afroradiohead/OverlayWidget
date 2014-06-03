$(document).ready(function(){
	var minimumOverlayWidth = $("body").data("min-overlay-width");
	var overlayWrapClass = "overlay-wrap";
	var currentUrl = document.URL;

	function init(){
		if(minimumOverlayWidth == null)
			minimumOverlayWidth = 640;

		if($(window).width() > minimumOverlayWidth)
			initializeOverlay();
	}

	function initializeOverlay(){
		$("a.overlay").overlay({
	        mask: 'darkred',
	        effect: 'apple',		
			left:"center",
			top: 50,
			fixed:false,
	        onBeforeLoad: function() {
	        	var $overlay = this.getOverlay();
	        	var url = this.getTrigger().attr("href");

	            centerElement($overlay);
	            loadPageIntoOverlay(url, $overlay);
	        },
	        onBeforeClose: function(){
	        	window.location.href = currentUrl;
	        }
		});		
	}

	function centerElement($element){
		$element.css("left", "50%");
		$element.css("margin-left", "-" + ($element.outerWidth() / 2) + "px");		
	}

	function loadPageIntoOverlay(url, $overlay) {
		var $wrap = $overlay.find("."+overlayWrapClass);

		$.get(url, function(html){
			var $parser = $("<div>");
			$parser.html(html);
			
			$wrap.html($parser.find("#overlay:first"));

			var title = $parser.find("title:first").text();
			window.history.pushState({"html":html,"pageTitle":title},"", url);
		});
	}



	init();
});