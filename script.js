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
		
		StateName1: -1,
		StatisticName1: -1,
		StateName2: -1,
		StatisticName2: -1,
		originalHeight: -1,
		originalWidth: -1,
		
		getValue1: function() {
			return USStateData[this.StateName1][this.StatisticName1];
		},
		
		getValue2: function() {
			return USStateData[this.StateName2][this.StatisticName2];
		},

		getState1: function() {
		 
		},
		
		updateSelectedOptions: function() {
			this.StateName1 = $('.usstate').eq(0).val();
			this.StatisticName1 = $('.statistic').eq(0).val();
			this.StateName2 = $('.usstate').eq(1).val();
			this.StatisticName2 = $('.statistic').eq(1).val();
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
			//add US state names to option menu 1
			for (var i=0; i<USStateData.length; i++) {
				$('.usstate').append('<option value=' + i + '>' + USStateData[i].name + '</option>');
			}
			
			// show the statistics available for each US state
			var choices = ['population', 'square-miles'];
			for (var j=0; j< choices.length; j++){
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
			l.updateSelectedOptions();
			$('#data').text(l.getValue1() + ' ' + l.getValue2());
			this.adjustBoxes();
		},
		
		adjustBoxes: function() {
			
			var l = SV.Logic,
				ratio = l.getValue1() / l.getValue2();
			var scalingFunc;
			
			//first box represents biggest number
			if (ratio > 1) {
				scalingFunc1 = $('.square').eq(0).buildScalingFunc(1);
				scalingFunc2 = $('.square').eq(1).buildScalingFunc(1 / ratio);
			}
			//first box represents smaller number
			else {
				scalingFunc1 = $('.square').eq(0).buildScalingFunc(ratio);
				scalingFunc2 = $('.square').eq(1).buildScalingFunc(1);
			}

			//			this.resetSize(scalingFunc)
			scalingFunc1();
			scalingFunc2();
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
		element.animate(newCSS);
	};
};	



$(document).ready(function() {
	SV.MainInterface.setUp();
});

