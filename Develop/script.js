
$(function () {
  // Function to apply the past, present, or future class to each time block
  function updateHourClasses() {
    var currentHour = dayjs().format("H");
    $(".time-block").each(function () {
      var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);
      if (timeBlockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (timeBlockHour == currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  // Display the current date in the header
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // Load saved user input from local storage and set textarea values
  $(".time-block").each(function () {
    var key = $(this).attr("id");
    var savedInput = localStorage.getItem(key);
    if (savedInput) {
      $(this).find("textarea").val(savedInput);
    }
  });

  // Add click event listener to the save button
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    var userInput = $(this).siblings("textarea").val();
    localStorage.setItem(timeBlockId, userInput);
  });

  // Initial call to updateHourClasses to apply classes on page load
  updateHourClasses();

  // Periodically update the hour classes every minute
  setInterval(updateHourClasses, 60000);
});

