import * as response from "../services/responses-actions.js";
import { notify } from "../services/utils.js";

const responseModal = "#modal-response";

$( function (){

    $(document).on("show.bs.modal", responseModal, function (e) {
        let opener= e.relatedTarget;

        if ($(opener).attr("data-action-type") === "edit") {
            $(responseModal).find(`[id = 'responseModalTitle']`).text("Edit Response");

            $.each(opener.dataset, function (key, value) {
                $(responseModal).find(`[id = '${key}']`).val(value);
            });
        } else {
            $.each(opener.dataset, function (key, value) {
                $(responseModal).find(`[id = '${key}']`).val(value);
            });

            $(responseModal).find(`[id = 'responseModalTitle']`).text("Add Response");
        }
    });


    $(document).on("click", "#saveResponseBtn", function () {
        let intrusionId = $("#responseIntrusionId").val();
        let responseId = $("#responseId").val();
        let responseType = $("#responseType").val();
        let description  =  $("#responseDescription").val();

        let params = {
            intrusion_id: intrusionId,
            id: responseId,
            action_type: responseType,
            description: description
        }

        saveResponse(params);
    });
});


function saveResponse(params){
    if ($("#responseModalTitle").text() === "Edit Response") {
        let resp =  response.editResponse(params);

        if (resp.updated) {
            $.when(
                notify(
                    "center",
                    "success",
                    "Edit Response",
                    "Response updated successfully",
                    false,
                    3000
                )
            ).done(function () {
                $.when(response.fetchResponses()).done(function () {
                    $(responseModal).modal("hide");
                });
            });
        }
    } else {
        let resp = response.addResponse(params);
        if (resp != null) {
            $.when(
                notify(
                    "center",
                    "success",
                    "Add Response",
                    "Response added successfully",
                    false,
                    3000
                )
            ).done(function () {
                $.when(response.fetchResponses()).done(function () {
                    $(responseModal).modal("hide");
                });
            });
        }
    }
}
