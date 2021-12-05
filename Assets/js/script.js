$("#currentDay").text(moment().format("dddd, MMMM Do")); //display current day in header

var timer = null;

var setColors = { // includes time methods and styling methods
    neededStyles: Array(9),
    textAreas: $("textarea"),

    determineStyles: function(currentTime) {
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
        $("textarea").addClass("col-10"); // add back in bootstrap class

        for (var i= 0; i < styles.length; i++) {
            this.textAreas[i].classList.add(styles[i]); // add class styles based on those determined
        }
    },

    driver: function() {
        
        this.determineStyles(moment().hour()); // determine the styles needed
        this.stylePage(this.neededStyles); // feed needed styles into styler func 
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

var apptStorage = { // controls how the 'appointments' are store in localStorage

    saveAppt: function(ID) {
        var text = $("#"+ID).find("textarea").val(); // find child textarea of article with give ID, pull contents of that textarea 
        console.dir(text);

        localStorage.setItem(ID, text);
    },

    loadAppts: function() {
    
        for (var i = 0; i < $("article").length ; i++) {

            articleID = $("article")[i].id; //get id of article at i

            appointment = localStorage.getItem(articleID); // find value for key 'articleID' in localStorage

            $("#"+articleID).find("textarea").val(appointment); // find child textarea of the article with ID [i]. assign value from local storage to textarea   
        }

    },

    clickHandler: function(event) {
        var selectedElID = $(event.target).parents(".row").attr("id"); // find the parent article of button and get it's id

        apptStorage.saveAppt(selectedElID); // pass article ID to saveAppt method
    }
}

setColors.driver();
apptStorage.loadAppts();

$("article").on("click", "button", apptStorage.clickHandler);
