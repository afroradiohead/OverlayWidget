$(document).ready(function(){
	$("a.overlay").overlay({
        mask: 'darkred',
        effect: 'apple',		
		left:"center",
		top: 50,
		fixed:false,
        onBeforeLoad: function() {
        	var $overlay = this.getOverlay();
            var wrap = $overlay.find(".contentWrap");

            centerElement($overlay);
            wrap.load(this.getTrigger().attr("href"));
        }
	});


	function centerElement($element){
		$element.css("left", "50%");
		$element.css("margin-left", "-" + ($element.outerWidth() / 2) + "px");		
	}
});