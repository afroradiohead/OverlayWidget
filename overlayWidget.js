$(document).ready(function(){
	var minimumOverlayWidth = $("body").data("min-overlay-width");
	var overlayWrapClass = "overlay-wrap";
	var currentUrl = document.URL;
	var $overlayContent = $("#overlay");
	var overlayWidth = 960;
	var popped = ('state' in window.history && window.history.state !== null);
	var initialURL = location.href;

	var overlayOptions = {
        mask: 'black',
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
        	
        }
	}

	function init(){
		if(minimumOverlayWidth == null)
			minimumOverlayWidth = 640;

		if($(window).width() > minimumOverlayWidth){
			initializeOverlayTriggers();

			if($overlayContent.length > 0)
				autoloadCurrentOverlay();			
		}


	}

	function initializeOverlayTriggers(){
		$("a.overlay").overlay(overlayOptions);

		
	}

	function centerElement($element){
		$element.css("left", "50%");
		$element.css("margin-left", "-" + (overlayWidth / 2) + "px");		
	}

	function loadPageIntoOverlay(url, $overlay) {
		var $wrap = $overlay.find("."+overlayWrapClass);

		$.get(url, function(html){
			var $parser = $("<div>");
			$parser.html(html);
			
			$wrap.html($parser.find("#overlay:first"));

			var title = $parser.find("title:first").text();
		});
	}

	function autoloadCurrentOverlay(url){
		var $overlayContainer = $("#overlay-container");
		$overlayContainer.attr("href", document.URL);
		$overlayContainer.addClass("autoload");


		$overlayContainer.overlay(overlayOptions).data('overlay').load();
	}

	$(window).on("popstate",function(response){
	  if(window.history.state && window.history.state.overlay == true)

	  autoloadCurrentOverlay();
	});


	init();
});