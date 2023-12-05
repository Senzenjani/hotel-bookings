
import { content_view } from "../app-views/content.js";
import { links } from "../app-views/links.js";
import { loadContent } from "../actions/contentLoader.js";
import * as users from "../services/users.js";
import * as custodian from "../services/custodian.js";
import * as device from "../services/devices.js";
import * as event from "../services/event.js";
import * as network_event from "../services/network-events.js";
import * as intrusion from "../services/network-intrusions.js";

const mainContent = "mainContent";
const modalContent = "modalContent";

selectContent(localStorage.getItem("state"));

$(document).ready(function () {
    if (sessionStorage.getItem("role") != null) {
        loadLinks(sessionStorage.getItem("role"));
    }

    $("#dashboard").on("click", function (e) {
        selectContent("dashboard");
    });

    $("#response-actions").on("click", function (e) {
        selectContent("response_actions");
    });

    $("#intrusions").on("click", function (e) {
        selectContent("intrusions");
    });

    $("#network-events").on("click", function (e) {
        selectContent("network_events");
    });

    $("#events").on("click", function (e) {
        selectContent("events");
    });

    $("#devices").on("click", function (e) {
        selectContent("devices");
    });

    $("#custodians").on("click", function (e) {
        selectContent("custodians");
    });

    $("#users").on("click", function (e) {
        selectContent("users");
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
                    case "users":
                        users.loadUsersTable(users.fetchUsers());
                        break;
                    case "dashboard":
                        //dashboard.loadDashboardData();
                        break;
                    case "custodians":
                        custodian.fetchCustodians();
                        break;
                    case "devices":
                        device.fetchDevices();
                        break;
                    case "events":
                        event.fetchEvents();
                        break;
                    case "network_events":
                        network_event.fetchNetworkEvents();
                        break;
                    case "intrusions":
                        intrusion.fetchIntrusions();
                        break
                }
            }
        );
}