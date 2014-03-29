/**
 * @author conor
 */

var SV = {}

SV.MainInterface = {
		
	setUp: function() {
		SV.UserInterface.drawInterface();
	},


}


SV.Logic = {
		
		StateIndex1: -1,
		StatisticName1: -1,
		StateIndex2: -1,
		StatisticName2: -1,
		
		extractValue: function(which) {
			switch(which) {
			case 1:
				return USStateData[this.StateIndex1][this.StatisticName1];
				break;
			case 2:
				return USStateData[this.StateIndex2][this.StatisticName2];
			}
			
		},

		updateIndices: function() {
			this.StateIndex1 = $('select.usstate').eq(0).val();
			this.StatisticName1 = $('select.statistic').eq(0).val();
			this.StateIndex2 = $('select.usstate').eq(1).val();
			this.StatisticName2 = $('select.statistic').eq(1).val();
			
		}
}

SV.UserInterface = {
		
		drawInterface: function(){
			this.populateMenus();
			this.addClick();
		},
		
		
		populateMenus: function(){		
			//add state names
			for (var i=0; i<USStateData.length; i++) {
				$('.usstate').append('<option value=' + i + '>' + USStateData[i].name + '</option>');
			}
			
			//add statistic option
			
			var choices = Object.keys(USStateData[0]);
			for (var j=1; j< choices.length - 1; j++){
				$('.statistic').append('<option value=' + choices[j] + '>' + choices[j] + '</option>');
			}
		},
		
		addClick: function() {
			var that = this;
			$('#updateButton').click(function() {
				that.drawNumbers();
			})
		},
		
		drawNumbers: function(){
			SV.Logic.updateIndices();
			$('#data').text(SV.Logic.extractValue(1) + 
					' ' + SV.Logic.extractValue(2));
		}
}

$(document).ready(function() {
	SV.MainInterface.setUp();
});

