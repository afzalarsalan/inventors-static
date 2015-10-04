// Variable to hold request
var request;

$(document).ready(function() {

    if (window.screen.width >= 800) {
        $('#carousel-container').css("display","initial");
        var images = document.getElementsByClassName('desktop-image');
        for (var i = 0; i < images.length; i++) {
            images[i].setAttribute('src', images[i].getAttribute('src2'));
        }
        //initialize swiper when document ready  
        var mySwiper = new Swiper('.swiper-container', {
            // Optional parameters
            loop: true,
            autoplay: 4000
        });
    }

    document.getElementById("grade-level").addEventListener("change", gradeChange);
    document.getElementById("slider-grade-value").value = 10;
    $(".learning-button").each(function() {
        this.addEventListener('click', function() {
            console.log('It works');
            $("#overview").toggleClass('is-active');
            $("#overview-tab").toggleClass('is-active');
            $("#about-tab").toggleClass('is-active');
            $('#about').toggleClass('is-active');
        });
    });
    // Bind to the submit event of our form
    $("#signup-form").submit(function(event) {

        // Abort any pending request
        if (request) {
            request.abort();
        }
        // setup some local variables
        var $form = $(this);

        // Let's select and cache all the fields
        var $inputs = $form.find("input, select, button, textarea");

        // Serialize the data in the form
        var serializedData = $form.serialize();

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        $inputs.prop("disabled", true);

        // Fire off the request to /form.php
        request = $.ajax({
            url: "https://script.google.com/macros/s/AKfycbzLfudozQlhKiIfrllVIh_5l4QGhtexGMJWFnF50FZmhpWo1EQ/exec",
            type: "post",
            data: serializedData
        });

        // Callback handler that will be called on success
        request.done(function(response, textStatus, jqXHR) {
            // Log a message to the console
            console.log("Hooray, it worked!");
        });

        // Callback handler that will be called on failure
        request.fail(function(jqXHR, textStatus, errorThrown) {
            // Log the error to the console
            console.error(
                "The following error occurred: " +
                textStatus, errorThrown
            );
        });

        // Callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function() {
            // Reenable the inputs
            $inputs.prop("disabled", false);
        });

        // Prevent default posting of form
        event.preventDefault();
    });
});

function gradeChange() {
    var slider = document.getElementById("grade-level");
    var output = document.getElementById("slider-grade-value");
    output.value = slider.value;
}
