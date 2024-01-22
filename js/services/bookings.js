import { apiClient } from "./api-client.js";

export function fetchBookings(...args) {
    let data = apiClient(
        "booking",
        "GET",
        "json",
        false,
        false,
        {}
    )

    if (args[0] === "load-none")
        return data
    else
        populateBookingsTable(data.body);
}


function populateBookingsTable(dataSet) {
    $("#bookingsTable").DataTable({
        destroy: true,
        responsive: true,
        searching: true,
        ordering: true,
        lengthChange: true,
        autoWidth: false,
        info: true,
        data: dataSet,
        columns: [
            { data: "bookingid" },
            { data: null },
            { data: null }
        ],
        columnDefs: [
    
            {
                render: getEditBookingBtn,
                data: null,
                targets: [1],
            },
            {
                render: getDelBookingBtn,
                data: null,
                targets: [2],
            },
        ],
    });
}


function getEditBookingBtn(data, type, row, metas) {
    let dataFields = `data-booking-id="${data.id}"
                      data-action-type="edit"`;

    return getButton(dataFields, "booking", "primary", "fas fa-edit");
}


function getDelBookingBtn(data, type, row, metas) {
    let dataFields = `data-bookingid = "${data.id}"
                      data-action-type = "edit"`;

    return getButton(dataFields, "", "danger delete-booking", "fas fa-trash");
}


function getButton(dataFields, modal, color, icon) {
    return `<button type='button' class="btn btn-lg btn-${color}" data-toggle="modal" 
              data-target="#modal-${modal}" ${dataFields} ><i class="${icon}" aria-hidden="true"></i></button>`;
}