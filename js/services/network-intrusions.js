import { apiClient } from "./api-client.js";



export function fetchIntrusions(...args) {
    let data = apiClient(
        "/api/v1/intrusions",
        "GET",
        "json",
        false,
        false,
        {}
    )

    if (args[0] === "load-none")
        return data
    else
        populateNetworkIntrusionsTable(data);
}

export function addIntrusion(params) {
    return apiClient(
        "/api/v1/intrusions/new",
        "POST",
        "json",
        false,
        false,
        params
    )
}


function populateNetworkIntrusionsTable(dataSet) {
    $("#intrusionsTable").DataTable({
        destroy: true,
        responsive: true,
        searching: true,
        ordering: true,
        lengthChange: true,
        autoWidth: false,
        info: true,
        data: dataSet,
        columns: [
            { data: "intrusion_id" },
            { data: "device_name" },
            { data: "event_name" },
            { data: "severity" },
            { data: "protocol" },
            { data: "source_ip" },
            { data: "dest_ip" },
            { data: "port" },
            { data: "intrusion_description" },
            { data: "created_at" },
            { data: null },
            { data: null }
        ],
        columnDefs: [

            {
                render: getAddResponsenBtn,
                data: null,
                targets: [10],
            },

            {
                render: getEditIntrusionBtn,
                data: null,
                targets: [11],
            }
        ],
    });
}

function getAddResponsenBtn(data, type, row, metas) {
    let dataFields = `data-response-intrusion-id = "${data.intrusion_id}"
                      data-action-type = "add"`;

    return getButton(dataFields, "response", "success ", "fas fa-plus");
}


function getEditIntrusionBtn(data, type, row, metas) {
    let dataFields = `data-intrusion-id = "${data.intrusion_id}"
                      data-intrusion-description = "${data.intrusion_description}"
                      data-action-type = "edit"`;

    return getButton(dataFields, "intrusion", "warning ", "fas fa-edit");
}

function getButton(dataFields, modal, color, icon) {
    return `<button type='button' class="btn btn-block btn-${color}" data-toggle="modal" 
              data-target="#modal-${modal}" ${dataFields} ><i class="${icon}" aria-hidden="true"></i></button>`;
}
