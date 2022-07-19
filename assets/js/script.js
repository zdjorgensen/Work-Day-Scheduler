// Updates the current day at the top
currentDay = moment();
$("#currentDay").text(currentDay.format("[Today is] dddd, MMMM Do"));

$(document).ready(function () {
    // When the save button is clicked it saves the hour and textarea to local storage
    $('.saveBtn').on('click', function () {
        var description = $(this).siblings('.description').val();
        var hour = $(this).parent().attr('id');
       localStorage.setItem(hour, description);

        // Adds the class show to notification to display the class notification
        $('.notification').addClass('show');

        // Removes the show class after 3 seconds
        setTimeout(function () {
            $('.notification').removeClass('show');
        }, 3000);
    });

    // Keeps track of what time it is using military time (0-23) and
    // is used to update the past, present, or future time-block
    function checkTime() {
        var currentHour = moment().format('k');

        $('.time-block').each(function () {
            var hour= parseInt($(this).attr('id').split('-')[1]);

            if(hour < currentHour) {
                $(this).addClass('past');
            } else if (hour > currentHour) {
                    $(this).addClass('future');
            } else {
                $(this).addClass('present');
            }
        });
    }
    checkTime();

    // Loops through local storage and puts the value into the correct time-block description
    function getStorage() {
        for(var i = 0; i<localStorage.length; i++) {
            var storedKey = localStorage.key(i);
            var storedValue = localStorage.getItem(storedKey);
            $('.time-block').each(function () {
                var time = $(this).attr('id');
                if(time == storedKey){
                    $(this).find(".description").val(storedValue);
                    return false;
                } else {
                    return;
                }
            }
        )};
    }
    getStorage();
});
