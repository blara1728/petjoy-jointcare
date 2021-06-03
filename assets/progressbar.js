function randomIntFromInterval(min, max) {
		//return Math.floor(Math.random() * (max - min + 1) + min);
		return Math.floor((max - min + 0) + min);
}

// Timer Setup
	var nsec = '28';
	var nmin = '20';
	var nhrs = '1';
	var ndat = '0';

// Settings are here
var total_items = 50;
var d = new Date();
var min_items_left = 2;
var max_items_left = 2;
var remaining_items = randomIntFromInterval(min_items_left, max_items_left);
var min_of_remaining_items = 1;
var decrease_after = 5.00; // 1.00 = every 1 Minute || 5.00 = every 5 Minute
var decrease_after_first_item = 5.00;  // 1.17 || 1.00 = every 1 Minute || 5.00 = every 5 Minute
var aclaimed = 97;
var claimed_decrease = 8.00;  //  2.00 = every 2 Minute || 8.00 = every 8 Minute



// 300000 ms to 300sec // 5 Minute  1000 * 60 * 5.00  // Ervery 5 Minute
 
 
(function($) {
    $.fn.progressbar = function() {
        var a = "<div class='progressbar'><div style='width:100%'></div></div>";     
        this.addClass('items-count');
        this.html(a + this.html());         
        updateMeter(this);
        var b = this;		
        setInterval(function() {
            remaining_items--;
            if (remaining_items < min_of_remaining_items) {
                remaining_items = randomIntFromInterval(min_items_left, max_items_left)
            }
            $('.count').css('background-color', '#CE0201');
            $('.count').css('color', '#fff');
            setTimeout(function() {
                $('.count').css('background-color', '#fff');
                $('.count').css('color', '#CE0201')
            }, 1000 * 60 * 0.03);
            b.find(".count").text(remaining_items);
            updateMeter(b)
        }, 1000 * 60 * decrease_after);

		//Update Claimed 
		 var checkaclaimed = $('#aclaimed').text();
		 
		setInterval(function() {
			   if(aclaimed<99){
					aclaimed++;
				}	
            $('#aclaimed').html(aclaimed); 
        }, 1000 * 60 * claimed_decrease)	

		
    };
    function updateMeter(a) {
        var b = 100 * remaining_items / total_items;	 
        if (remaining_items < 10) {
            a.find('.progressbar div:first').addClass('less-than-ten')
        }
        a.find('.progressbar').addClass('active progress-striped');
        setTimeout(function() {
            myanimate(a.find('.progressbar div:first'), b);
            a.find('.progressbar').removeClass('active progress-striped')
        }, 1000)
    }	
}(jQuery));

function myanimate(a, b) {
    var c = 0;
    var d = parseInt(a.closest('.progressbar').css('width'));
    var e = Math.floor(100 * parseInt(a.css('width')) / d);
    if (e > b) {
        c = e
    }
    function frame() {
        if (e > b) {
            c--
        } else {
            c++
        }
        a.css('width', c + '%');
        if (c == b || c <= 0 || c >= 100) clearInterval(f)
    }
    var f = setInterval(frame, 40)
}
$(document).ready(function() {
    $("#progress_bar").progressbar();
    var tag = "ctdn-12-12".match(/\d+/g);
    var hour = 14;
    var theDaysBox = $("#numdays");
    var theHoursBox = $("#numhours");
    var theMinsBox = $("#nummins");
    var theSecsBox = $("#numsecs");
    var d = new Date();
    var n = d.getDay();	
	var date = 1;
   
	theSecsBox.html(nsec);
    theMinsBox.html(nmin);
    theHoursBox.html(nhrs);
    theDaysBox.html(ndat);
	
    var refreshId = setInterval(function() {
        var e = theSecsBox.text();
        var a = theMinsBox.text();
        var c = theHoursBox.text();
        var b = theDaysBox.text();
        if (e == 0 && a == 0 && c == 0 && b == 0) {} else {
            if (e == 0 && a == 0 && c == 0) {
                theDaysBox.html(b - 1);
                theHoursBox.html("23");
                theMinsBox.html("59");
                theSecsBox.html("59")
            } else {
                if (e == 0 && a == 0) {
                    theHoursBox.html(c - 1);
                    theMinsBox.html("59");
                    theSecsBox.html("59")
                } else {
                    if (e == 0) {
                        theMinsBox.html(a - 1);
                        theSecsBox.html("59")
                    } else {
                        theSecsBox.html(e - 1)
                    }
                }
            }
        }
    }, 1000);
});