$("#currentDay").text(moment().format("dddd, MMMM Do")); //display current day in header

var timer = null; // global timer for clock() method

var setColors = { // includes time methods and styling methods
    neededStyles: Array(9),
    textAreas: $("textarea"),

    determineStyles: function(currentTime) { // compare currentTime to times listed on page; determine past, present or future
        var times = [9,10,11,12,13,14,15,16,17];
       
        for (var i = 0; i < times.length; i++) { 
            if (times[i] > currentTime) {
                this.neededStyles[i] = "future";
            } else if (times[i] === currentTime) {
                this.neededStyles[i] = "present";                
            } else {
                this.neededStyles[i] = "past";
            }
        }        
    },

    stylePage: function(styles) {

        $("textarea").removeAttr("class"); // reset all textarea class attributes
        $("textarea").addClass("col-10"); // add back in bootstrap class to all textarea elements

        for (var i= 0; i < styles.length; i++) {
            this.textAreas[i].classList.add(styles[i]); // add class styles based on those determined above
        }
    },

    driver: function() {
        
        this.determineStyles(moment().hour()); // determine the styles needed based on current time
        this.stylePage(this.neededStyles); // feed needed styles into stylePage() method 
        this.clock(); //call function that determines how long to wait until call driver() again
    },

    clock: function() {

        timer = null;
        var minUntilNextSetColor = 60 - moment().minute(); // how many minutes until the next hour starts

        timer = setTimeout(function() {
            setColors.driver(); //do it all over again
        }, minUntilNextSetColor*1000+5000); // adding 5 seconds to timer to be sure determineStyles() runs in the correct hour
        
    }
}

var apptStorage = { // controls how the 'appointments' are stored in localStorage

    saveAppt: function(ID) {
        var text = $("#"+ID).find("textarea").val(); // find child textarea of article with given ID, pull contents of that textarea 

        localStorage.setItem(ID, text); // add key/value pair to local storage
    },

    loadAppts: function() {
    
        for (var i = 0; i < $("article").length ; i++) {

            articleID = $("article")[i].id; //get id of article at [i]

            appointment = localStorage.getItem(articleID); // find value for key 'articleID' in localStorage

            $("#"+articleID).find("textarea").val(appointment); // find child textarea of the article with ID [i]. assign value from local storage to textarea   
        }

    },

    clickHandler: function(event) {
        var selectedElID = $(event.target).parents(".row").attr("id"); // find the parent article of clicked 'button' and get it's id

        apptStorage.saveAppt(selectedElID); // pass article ID to saveAppt method
    }
}

setColors.driver();
apptStorage.loadAppts();

$("article").on("click", "button", apptStorage.clickHandler);
