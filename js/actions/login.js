
import * as user from "../services/users.js";

$(document).ready(function () {

    $('#loginForm').on('submit', function(e){

        e.preventDefault();

        let username = $('username').val();
        let password = $('password').val();
        
        user.login({username: username, password: password});
    });

    $("#monit-home").on("click", function (e) {
        $.when(sessionStorage.clear(), localStorage.clear()).done(function () {
          window.location.href = "index.html";
        });
    });

    

});
