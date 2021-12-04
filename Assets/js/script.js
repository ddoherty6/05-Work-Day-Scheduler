$("#currentDay").text(moment().format("dddd, MMMM Do")); //display current day in header

    
var style = {
    stylePage: function(currentTime) {
        var descriptionEls = $("textarea");

        for (var i = 0; i < descriptionEls.length; i++) {
            if (currentTime < ) {

            } else if (currentTime === ) {

            } else if (currentTime > ) {

            }
            
        };

        
    },

    clock: function() {
        this.stylePage(moment.hour()); // style the page 
        this.nexTime();
    },

    nexTime: function() {

        var minUntilNextTime = 60 - moment.minute(); // how many minutes until the next hour starts

        setTimeout(function() {
            this.clock(); //do it all over again
        }, minUntilNextTime*1000+5000); // adding 5 seconds to timer to be sure stylePage() runs in the correct hour
    }
}

var storeAppt = {

    appointments: Array(9),
    apptStorage: window.localStorage(),

    saveAppt: function() {

    },

    loadAppts: function() {

        for (var i = 0; i < this.apptStorage.length; i++) {
            
        }

    }




}
