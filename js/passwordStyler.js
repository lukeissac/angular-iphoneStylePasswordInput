(function(){
	'use strict';
	
	angular
    .module('passwordStylerApp')
    .directive('passwordStyler', passwordStyler);
	
	function passwordStyler() {
		var directive = {
			restrict: 'A',
			link: link
		};
	    function link(scope, element, attrs){
	    	var passwordString = "";
	        element.on("keydown", function (event) {  
				var keyPressed = event.key || String.fromCharCode(event.keyCode) || String.fromCharCode(event.which);
				if((!event.ctrlKey) && (keyPressed !== " ") && (keyPressed.length == 1)){
					passwordString += keyPressed;
				}
				if(event.keyCode == 8 || keyPressed == "Backspace" || event.which == 8) {
					passwordString = passwordString.substr(0, passwordString.length-1);
				}	
	        });
	        element.on("keyup", function(event){
				var x = passwordString;			
				var replaceDots = "";
				if(x){
					for(var y=0; y<x.length; y++){
						replaceDots += String.fromCharCode(8226);
					}
					element[0].value = replaceDots;
				}	
				element[0].val = passwordString;
	        });
	        
	        element.on("cut copy paste", function(event){
	        	event.preventDefault();
	        });
	    };
	    return directive;
	}
})();