/**
 * @author conor
 */

var SV = {}

SV.MainInterface = {
	setUp: function() {
		SV.UserInterface.drawInterface();
	}
}

SV.UserInterface = {
		
		drawInterface: function(){
			this.populateMenus();
		},
		
		populateMenus: function(){
			
			//add state names
			for (var i=0; i<StateData.length; i++) {
				$('.usstate').append('<option value=' + i + '>' + StateData[i].name + '</option>');
			}
			
			//add statistic option
			
			var choices = Object.keys(StateData[0]);
			for (var j=0; j<choices.length; j++){
				console.log(j);				
				$('.statistic').append('<option value=' + j + '>' + choices[j] + '</option>');
			}
		}
		

}

$(document).ready(function() {
	SV.MainInterface.setUp();
});

