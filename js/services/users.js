import * as validator from "./validator.js";
import { apiClient } from "./api-client.js";

let token = sessionStorage.getItem("token");

export function login(params) {
  $.when(
    apiClient("/auth", "POST", "json", false, false, params)
  ).done(function (data) {
    if (data != null) {
      token = data.token;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("username", data.username);
      
      localStorage.setItem("state", "dashboard");
      window.location = "home.html";
    } else {
      //Display an error here
    }
  });
}
