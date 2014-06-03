$(document).ready(function(){
	var overlayWrapClass = "overlay-wrap";

	$("a.overlay").overlay({
        mask: 'darkred',
        effect: 'apple',		
		left:"center",
		top: 50,
		fixed:false,
        onBeforeLoad: function() {
        	var $overlay = this.getOverlay();

            centerElement($overlay);
            loadPageIntoOverlay(this.getTrigger().attr("href"), $overlay);
            
        }
	});

	function centerElement($element){
		$element.css("left", "50%");
		$element.css("margin-left", "-" + ($element.outerWidth() / 2) + "px");		
	}

	function loadPageIntoOverlay(url, $overlay) {
		var $wrap = $overlay.find("."+overlayWrapClass);

		$.get(url, function(html){
			var $parser = $("<div>");
			$parser.html(html);
			$wrap.html($parser.find("#overlay"));
		});
	}
});