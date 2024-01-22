
import { content_view } from "../app-views/content.js";
import { links } from "../app-views/links.js";
import { loadContent } from "../actions/contentLoader.js";
import * as booking from "../services/bookings.js";


const mainContent = "mainContent";
const modalContent = "modalContent";

selectContent(localStorage.getItem("state"));

$(document).ready(function () {
    if (sessionStorage.getItem("role") != null) {
        loadLinks(sessionStorage.getItem("role"));
    }

    $("#bookings").on("click", function (e) {
        selectContent("bookings");
    });


});

function loadLinks(user_role) {
    for (let index = 0; index < links.length; index++) {
        if (user_role === links[index].role) {
            $.when(loadContent("sidebarLinks", "", links[index].link)).done(
                function () {
                    //load dashboard stats
                }
            );
        }
    }
}

export function selectContent(state) {
    for (let index = 0; index < content_view.length; index++) {
        if (state === content_view[index].state) {
            loadOtherContent(state, index);
        }
    }
}

function loadOtherContent(state, index) {
    console.log(state)
    $.when(loadContent(mainContent, state, content_view[index].link,
        content_view[index].title)).done(
            function () {
                if (
                    content_view[index].modals != null &&
                    typeof content_view[index].modals != undefined
                ) {

                    $(`#${modalContent}`).html("");

                    $.each(content_view[index].modals, function (key, modal_path) {
                        $.when(loadContent(modalContent, "", modal_path)).done(
                            function () { }
                        );
                    });

                }
                let user_id = sessionStorage.getItem("user_id");

                switch (state) {

                    case "bookings":
                        booking.fetchBookings();
                        break;

                }
            }
        );
}