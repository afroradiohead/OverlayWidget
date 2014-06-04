$(document).ready(function(){
	var minWidth = $("body").data("overlay-min-width");
	var closeUrl = $("body").data("overlay-close-url");
	var overlayWrapClass = "overlay-wrap";
	var currentUrl = document.URL;
	var $overlayContent = $("#overlay");
	var overlayWidth = 960;
	var popped = ('state' in window.history && window.history.state !== null);
	var initialURL = location.href;
	var autoloadedOverlay = false;

	

	var overlayOptions = {
        mask: 'black',
        effect: 'apple',		
		left:"center",
		top: 50,
		fixed:false,
        onBeforeLoad: function() {
        	var $overlay = this.getOverlay();
        	var url = this.getTrigger().attr("href");

            _centerElement($overlay);
            _loadPageIntoOverlay(url, $overlay);
        }
	}

	function init(){
		if(minWidth == null)
			minWidth = 640;

		if($(window).width() > minWidth){
			initializeOverlayTriggers();

			if($overlayContent.length > 0){
				autoloadedOverlay = true;
				initializeCurrentOverlay();			
			}
		}


	}

	function initializeOverlayTriggers(){
		$("a.overlay").each(function(){
			var overlayApi = $(this).overlay(overlayOptions).data("overlay");

			if(overlayApi != null){
				overlayApi.onBeforeLoad(function(){
					var url = this.getTrigger().attr("href");
					window.history.pushState({overlay:true, url:url}, "", url);
				}).onBeforeClose(_navigateBack);				
			}
		});
	}

	function initializeCurrentOverlay(url){
		var $overlayContainer = $("#overlay-container");
		var overlayApi = $overlayContainer.data("overlay");

		$overlayContainer.attr("href", document.URL);

		if(overlayApi == null){
			$overlayContainer.addClass("autoload");
			overlayApi = $overlayContainer.overlay(overlayOptions).data('overlay');

			if(autoloadedOverlay){
				overlayApi.onBeforeClose(function(){
					if(document.referrer.split('/')[2] == location.host){
						window.history.back();
					}
					else
						window.location.href = closeUrl;
				});
			}else{
				overlayApi.onBeforeClose(_navigateBack);
			}
		}

		overlayApi.load();
	}	

	function _centerElement($element){
		$element.css("left", "50%");
		$element.css("margin-left", "-" + (overlayWidth / 2) + "px");		
	}

	function _loadPageIntoOverlay(url, $overlay) {
		var $wrap = $overlay.find("."+overlayWrapClass);

		$.get(url, function(html){
			var $parser = $("<div>");
			$parser.html(html);
			
			$wrap.html($parser.find("#overlay:first"));

			var title = $parser.find("title:first").text();
		});
	}

	function _navigateBack() {
		if(window.history.state != null)
			window.history.back();		
	}

	$(window).on("popstate",function() {
		if(window.history.state && window.history.state.overlay == true){
			initializeCurrentOverlay(window.history.state.url);
		}else{
			$("a.overlay, #overlay-container").each(function(){
				var overlayApi = $(this).data("overlay");
				if(overlayApi != null)
					overlayApi.close();
			});			
		}

		if(autoloadedOverlay)
			window.location.reload();
	});	

	init();
});



