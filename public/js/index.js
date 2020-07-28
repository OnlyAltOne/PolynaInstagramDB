$(document).ready(function () {
    $("#login_form_ajax").on("submit", function(event){
        event.preventDefault()
        var $form = $(this)
        var url_request = $form.attr('action')

        var posting = $.post(url_request, {
            email: $('#email').val(),
            password: $('#password').val(),
        })

        posting.done(function(data){
            window.location.replace("/database");
        })
        posting.fail(function(data){
            $("#information_under_login_form").text("Invalid login or password")
            $('#password').val("")
        })

    })

    $.ajax({
        url: "/users/status",
        type: "get",
        success: function(){
            $("#test_id").css("display", "none")
            $('.label_guest_mode').css("display", "none")
            $(".guest_mode_text").text("To database")
            $(".guest_mode").css("text-align", "center")
        }
    })
    
    /*   var oldWidth = window.innerWidth;
    var left_side = $("#left_side")
    console.log(left_side.style)
    
    var onResizeFunction = function () {
        var newWidth = window.innerWidth
        console.log(left_side.style.width);
        if (Math.abs(newWidth - oldWidth) >= 50) {
        anime({
            target: left_side,
            delay: 1000,
            begin: function () {
            left_side.style.width = left_side.width + newWidth - oldWidth;
            },
        });
        oldWidth = newWidth;

    }
  };
  $(window).on("load resize", onResizeFunction); */


    /** 
   * Animation of welcome_msg and form(appears from left)
  */
    var textWrapper = document.querySelector(".title");
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    anime({
        targets: ".right_side",
        translateX: [
            0, 100
        ],
        opacity: [
            0, 1
        ],
        direction: "normal",
        easing: "linear",
        duration: 750
    });

    anime({
        targets: ".wrapper",
        translateX: [
            -500, 0
        ],
        opacity: [
            0, 1
        ],
        direction: "normal",
        easing: "linear",
        duration: 750
    });
    anime({
        targets: ".title .letter",
        scale: [
            6, 1
        ],
        opacity: [
            0, 1
        ],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 750,
        delay: (el, i) => 70 * i
    });
});
