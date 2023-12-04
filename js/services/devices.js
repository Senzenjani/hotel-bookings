import { apiClient } from "./api-client.js";

export function fetchDevices(...args) {
    let data = apiClient(
        "/api/v1/devices",
        "GET",
        "json",
        false,
        false,
        {}
    )

    if (args[0] === "load-none")
        return data
    else
        populateDevicesTable(data);
}

export function addDevice(params) {
    return apiClient(
        "/api/v1/device/new",
        "POST",
        "json",
        false,
        false,
        params
    )
}

export function editDevice(params) {
    return apiClient(
        "/api/v1/device/edit",
        "POST",
        "json",
        false,
        false,
        params
    )
}

export function deleteDevice(params) {
    return apiClient(
        "/api/v1/device/delete",
        "POST",
        "json",
        false,
        false,
        params
    )
}

function populateDevicesTable(dataSet) {
    $("#devicesTable").DataTable({
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
            { data: "serial_number" },
            { data: "ip_address" },
            { data: "name" },
            { data: "device_type" },
            { data: "mac_address" },
            { data: null },
            { data: null }
        ],
        columnDefs: [
    
            {
                render: getEditDeviceBtn,
                data: null,
                targets: [6],
            },
            {
                render: getDelDeviceBtn,
                data: null,
                targets: [7],
            },
        ],
    });
}


function getEditDeviceBtn(data, type, row, metas) {
    let dataFields = `data-device-id="${data.id}"
                      data-custodian-device-id="${data.custodian_id}"
                      data-serial-number="${data.serial_number}"
                      data-ip-address="${data.ip_address}"
                      data-device-name="${data.name}"
                      data-device-type="${data.device_type}"
                      data-mac-address="${data.mac_address}"
                      data-action-type="edit"`;

    return getButton(dataFields, "device", "primary", "fas fa-edit");
}


function getDelDeviceBtn(data, type, row, metas) {
    let dataFields = `data-id = "${data.id}"
                      data-action-type = "edit"`;

    return getButton(dataFields, "", "danger delete", "fas fa-trash");
}



function getButton(dataFields, modal, color, icon) {
    return `<button type='button' class="btn btn-block btn-${color}" data-toggle="modal" 
              data-target="#modal-${modal}" ${dataFields} ><i class="${icon}" aria-hidden="true"></i></button>`;
}
