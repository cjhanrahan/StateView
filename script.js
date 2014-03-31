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
		originalHeight: -1,
		originalWidth: -1,
		
		getValue1: function() {
			return USStateData[this.StateIndex1][this.StatisticName1];
		},
		
		getValue2: function() {
			return USStateData[this.StateIndex2][this.StatisticName2];
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
			this.initializeOriginalSizes();
		},
		
		initializeOriginalSizes: function() {
			SV.Logic.originalHeight = $('.square').eq(0).height();
			SV.Logic.originalWidth = $('.square').eq(0).width();
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
			var l = SV.Logic;
			l.updateIndices();
			$('#data').text(l.getValue1() + ' ' + l.getValue2());
			this.adjustBoxes();
		},
		
		adjustBoxes: function() {
			
			var l = SV.Logic,
				ratio = l.getValue1() / l.getValue2();
			var scalingFunc;
			
			//first box represents biggest number
			if (ratio > 1) {
				scalingFunc = $('.square').eq(1).buildScalingFunc(1 / ratio);
			}
			//first box represents smaller number
			else {
				scalingFunc = $('.square').eq(0).buildScalingFunc(ratio);
			}

			//			this.resetSize(scalingFunc)
			scalingFunc();
		},		

		resetSize: function(callback) {
			var parentsHeight = $('.square').parent().height(),
				parentsWidth = $('.square').parent().width(),
				verticalMargin = (parentsHeight - $('.square').height()) / 2,
				horizontalMargin = (parentsWidth - $('.square').width()) / 2; 
			
					
			$('.square').each(function(ind, el){$(el).animate({
				height: SV.Logic.originalHeight,
				width: SV.Logic.originalWidth,
				marginTop: verticalMargin,
				marginBottom: verticalMargin,
				marginLeft: horizontalMargin,
				marginRight: horizontalMargin
			}, 200, callback);})
	}	
}

$.fn.buildScalingFunc = function(scale) {
	var element = this,
		sideScale = Math.sqrt(scale),
		newHeight = SV.Logic.originalHeight * sideScale,
		newWidth = SV.Logic.originalWidth * sideScale,
		newVerticalMargin = (element.parent().height() - newHeight) / 2,
		newHorizontalMargin = (element.parent().width() - newWidth) / 2;

	var newCSS = {
			height: newHeight,
			width: newWidth,
			marginTop: newVerticalMargin,
			marginBottom: newVerticalMargin,
			marginLeft: newHorizontalMargin,
			marginRight: newHorizontalMargin
	};	
	
	return function() {
		console.log(newCSS);
		element.animate(newCSS);
	};
};	



$(document).ready(function() {
	SV.MainInterface.setUp();
});

