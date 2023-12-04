import { apiClient } from "./api-client.js";

export function fetchCustodians(...args) {
    let data = apiClient(
        "/api/v1/custodians",
        "GET",
        "json",
        false,
        false,
        {}
    )

    if (args[0] === "load-none")
        return data
    else
        populateCustodiansTable(data);
}

export function addCustodian(params) {
    return apiClient(
        "/api/v1/custodian/new",
        "POST",
        "json",
        false,
        false,
        params
    )
}

export function editCustodian(params) {
    return apiClient(
        "/api/v1/custodian/edit",
        "POST",
        "json",
        false,
        false,
        params
    )
}

export function deleteCustodian(params) {
    return apiClient(
        "/api/v1/custodian/delete",
        "POST",
        "json",
        false,
        false,
        params
    )
}

function populateCustodiansTable(dataSet) {
    $("#custodiansTable").DataTable({
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
            { data: "national_id" },
            { data: "firstname" },
            { data: "lastname" },
            { data: "date_of_birth" },
            { data: "phone_number" },
            { data: "custodian_type" },
            { data: null },
            { data: null },
            { data: null }
        ],
        columnDefs: [
            {
                render: getAddDeviceBtn,
                data: null,
                targets: [7],
            },
            {
                render: getEditCustodianBtn,
                data: null,
                targets: [8],
            },
            {
                render: getDelCustodianBtn,
                data: null,
                targets: [9],
            },
        ],
    });
}


function getAddDeviceBtn(data, type, row, metas) {
    let dataFields = `data-custodian-id = ${data.id} 
                      data-title = "Edit Collateral Sale"`;

    return getButton(dataFields, "device", "success ",
        "fas fa-plus");
}


function getEditCustodianBtn(data, type, row, metas) {


    let dataFields = `data-custodian-id = ${data.id}
                      data-national-id = ${data.national_id}
                      data-firstname = ${data.firstname}
                      data-lastname = ${data.lastname}
                      data-date-of-birth = ${data.date_of_birth}
                      data-phone-number = ${data.phone_number}
                      data-action-type = "edit"`;

    return getButton(dataFields, "individual-custodian", "primary ", "fas fa-edit");
}


function getDelCustodianBtn(data, type, row, metas) {
    let dataFields = `data-id = "${data.id}"
                      data-action-type = "edit"`;

    return getButton(dataFields, "", "danger delete-investment-package", "fas fa-trash");
}



function getButton(dataFields, modal, color, icon) {
    return `<button type='button' class="btn btn-block btn-${color}" data-toggle="modal" 
              data-target="#modal-${modal}" ${dataFields} ><i class="${icon}" aria-hidden="true"></i></button>`;
}
