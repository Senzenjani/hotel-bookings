import * as device from "../services/devices.js";
import { notify } from "../services/utils.js";

const deviceModal = "#modal-device"

$(function () {
    $(document).on("show.bs.modal", deviceModal, function (e) {
        clearDeviceFields();

        let opener = e.relatedTarget;

        if ($(opener).attr("data-action-type") === "edit") {
            $(deviceModal).find(`[id = 'deviceModalTitle']`).text("Edit Device");

            $.each(opener.dataset, function (key, value) {
                $(deviceModal).find(`[id = '${key}']`).val(value);
            });
        } else {
            $(deviceModal).find(`[id = 'deviceModalTitle']`).text("Add Device");
        }
    });

    $(document).on("click", "#saveDeviceBtn", function () {
        let deviceParams = getDeviceParams();
        saveDevice(deviceParams)
    });
});

function saveDevice(params){
    if ($("#deviceModalTitle").text() === "Edit Device") {
        let resp = device.editDevice(params);

        if (resp.updated) {
            $.when(
                notify(
                    "center",
                    "success",
                    "Edit Device",
                    "Device updated successfully",
                    false,
                    3000
                )
            ).done(function () {
                $.when(device.fetchDevices()).done(function () {
                    $(deviceModal).modal("hide");
                });
            });
        }
    } else {
        let resp = device.addDevice(params);
        if (resp != null) {
            $.when(
                notify(
                    "center",
                    "success",
                    "Add Device",
                    "Device added successfully",
                    false,
                    3000
                )
            ).done(function () {
                $.when(device.fetchDevices()).done(function () {
                    $(deviceModal).modal("hide");
                });
            });
        }
    }
}



function getDeviceParams() {
    let id  = $("#deviceId").val();
    let custodianId = $("#custodianId").val();
    let serialNumber = $("#serialNumber").val();
    let ipAddress = $("#ipAddress").val();
    let name = $("#name").val();
    let deviceType = $("#deviceType").val();
    let macAddress = $("#macAddress").val();

    let params = {
        id: id,
        custodian_id: custodianId,
        serial_number: serialNumber,
        ip_address: ipAddress,
        name: name,
        device_type: deviceType,
        mac_address: macAddress
    };

    return params;
}

function clearDeviceFields() {
    $("#custodianId").val("");
    $("#deviceId").val("");
    $("#serialNumber").val("");
    $("#ipAddress").val("");
    $("#name").val("");
    $("#deviceType").val("").trigger("change"); // Clear and reset select2 dropdown
    $("#macAddress").val("");
}


