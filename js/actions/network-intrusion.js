import * as intrusion from "../services/network-intrusions.js";
import { notify } from "../services/utils.js";

const intrusionModal = "#modal-intrusion";

$(function () {

    $(document).on("show.bs.modal", intrusionModal, function (e) {
        let opener= e.relatedTarget;

        if ($(opener).attr("data-action-type") === "edit") {
            $(intrusionModal).find(`[id = 'intrusionModalTitle']`).text("Edit Intrusion");

            $.each(opener.dataset, function (key, value) {
                $(intrusionModal).find(`[id = '${key}']`).val(value);
            });
        } else {
            $.each(opener.dataset, function (key, value) {
                $(intrusionModal).find(`[id = '${key}']`).val(value);
            });
            $(intrusionModal).find(`[id = 'intrusionModalTitle']`).text("Add Intrusion");
        }
    });

    $(document).on("click", "#saveIntrusionBtn", function () {
        let intrusionId = $("#intrusionId").val();
        let networkEventId = $("#intrusionNetworkEventId").val();
        let description = $("#intrusionDescription").val();

        let params = {
            id: intrusionId,
            network_event_id: networkEventId,
            description: description
        }

        saveIntrusion(params);
    });
});

function saveIntrusion(params){
    if ($("#intrusionModalTitle").text() === "Edit Intrusion") {
        let resp = intrusion.editIntrusion(params);

        if (resp.updated) {
            $.when(
                notify(
                    "center",
                    "success",
                    "Edit Intrusion",
                    "Intrusion updated successfully",
                    false,
                    3000
                )
            ).done(function () {
                $.when(intrusion.fetchIntrusions()).done(function () {
                    $(intrusionModal).modal("hide");
                });
            });
        }
    } else {
        let resp = intrusion.addIntrusion(params);
        if (resp != null) {
            $.when(
                notify(
                    "center",
                    "success",
                    "Add Intrusion",
                    "Intrusion added successfully",
                    false,
                    3000
                )
            ).done(function () {
                $.when(intrusion.fetchIntrusions()).done(function () {
                    $(intrusionModal).modal("hide");
                });
            });
        }
    }
}

