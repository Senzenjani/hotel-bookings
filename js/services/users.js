import * as validator from "./validator.js";
import { apiClient } from "./api-client.js";

let token = sessionStorage.getItem("token");

export function login(params) {

  $.when(
    apiClient("auth", "POST", "json", false, false, params)
  ).done(function (data) {
    if (data != null) {
     
      token = data.body.token;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("username", params.username);
      
      localStorage.setItem("state", "bookings");
      window.location = "home.html";
    } else {
      //Display an error here
    }
  });
}
