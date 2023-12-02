
import * as user from "../services/users.js";

$(document).ready(function () {

    $('#loginForm').on('submit', function(e){

        e.preventDefault();

        let username = $('username').val();
        let password = $('password').val();
        var formData = $(this).serialize();
        
        user.login(formData );
    });

    $("#monit-home").on("click", function (e) {
        $.when(sessionStorage.clear(), localStorage.clear()).done(function () {
          window.location.href = "index.html";
        });
    });

    

});
