
import { content_view } from "../app-views/content.js";
import { links } from "../app-views/links.js";
import { loadContent } from "../actions/contentLoader.js";
import * as users from "../services/users.js";
import * as facility from "../services/facility.js";
import * as client from "../services/client.js";
import * as cases  from "../services/case.js";
import * as map  from "../actions/map.js";
import * as tabular_stat  from "../actions/tabular_stats.js";
import * as dashboard  from "../actions/dashboard.js";

const mainContent = "mainContent";
const modalContent = "modalContent";

selectContent(localStorage.getItem("state"));

$(document).ready(function () {
    if (sessionStorage.getItem("role") != null) {
        loadLinks(sessionStorage.getItem("role"));
    } else {
        loadLinks("common_citizens");
        localStorage.setItem("state", "map");
        selectContent("map");
    }

    $("#geospatial-map").on("click", function (e) {
        selectContent("map");
    });

    $("#tabular-stats").on("click", function (e) {
        selectContent("tabular_stats");
    });

    $("#dashboard").on("click", function (e) {
        selectContent("dashboard");
    });

    $("#facilities").on("click", function (e) {
        selectContent("facilities");
    });

    $("#users").on("click", function (e) {
        selectContent("users");
    });

    $("#clients").on("click", function (e) {
        selectContent("clients");
    });

    $("#cases").on("click", function (e) {
        selectContent("cases");
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
    console.log(content_view[index].title);
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
                    case "facilities":
                        facility.fetchFacilities();
                        break;
                    case "clients":
                        client.fetchAll({facility_id: 
                            sessionStorage.getItem("facility_id")});
                        break;
                    case "cases":
                        cases.fetchFacilityCases({facility_id: 
                            sessionStorage.getItem("facility_id")});
                        break;
                    case "map":
                        map.loadMap();
                        break;
                    case "dashboard":
                        dashboard.loadDashboardData();
                        break;
                    case "tabular_stats":
                        tabular_stat.loadMasterTable();
                        break;

                }
            }
        );
}