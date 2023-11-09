
import { loadContent } from "../contentHub/contentLoader.js";
import { content_view } from "../contentHub/content.js";
import { links } from "../contentHub/links.js";

let user_role = sessionStorage.getItem("role");

const mainContent = "mainContent";
const modalContent = "modalContent";

selectContent(localStorage.getItem("state"));

$(document).ready(function () {

    //Loads links according to the
    if (sessionStorage.getItem("role") != null) {
        loadLinks(user_role);
    }

    //The folloing are cases links
    $("#someView").on("click", function (e) {
        selectContent("stateToLoad");
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
            loadOtherContent(state, index)
            break;
        }
    }
}


function loadOtherContent(state, index) {

    $.when(loadContent(mainContent, state, content_view[index].link)).done(
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


        }
    );
}

