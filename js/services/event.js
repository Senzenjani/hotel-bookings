import { apiClient } from "./api-client.js";

export function fetchEvents(...args) {
    let data = apiClient(
        "/api/v1/events",
        "GET",
        "json",
        false,
        false,
        {}
    )

    if (args[0] === "load-none")
        return data
    else
        populateEventsTable(data);
}

export function addEvent(params) {
    return apiClient(
        "/api/v1/events/new",
        "POST",
        "json",
        false,
        false,
        params
    )
}

export function editEvent(params) {
    return apiClient(
        "/api/v1/event/edit",
        "POST",
        "json",
        false,
        false,
        params
    )
}

export function deleteEvent(params) {
    return apiClient(
        "/api/v1/event/delete",
        "POST",
        "json",
        false,
        false,
        params
    )
}

function populateEventsTable(dataSet) {
    $("#eventsTable").DataTable({
        destroy: true,
        responsive: true,
        searching: true,
        ordering: true,
        lengthChange: true,
        autoWidth: false,
        info: true,
        data: dataSet,
        columns: [
            { data: "id" },
            { data: "name" },
            { data: "description" },
            { data: "severity" }
        ]
    });
}


