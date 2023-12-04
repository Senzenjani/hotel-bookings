import * as custodian from "../services/custodian.js";
import { notify } from "../services/utils.js";

const individualModal = "#modal-individual-custodian";

$(function () {
    $(document).on("show.bs.modal", individualModal, function (e) {
        let opener = e.relatedTarget;

        if ($(opener).attr("data-action-type") === "edit") {
            $(individualModal).find(`[id = 'individualModalTitle']`).text("Edit Custodian");

            $.each(opener.dataset, function (key, value) {
                $(individualModal).find(`[id = '${key}']`).val(value);
            });
        } else {
            $(individualModal).find(`[id = 'individualModalTitle']`).text("Add Custodian");
        }
    });

    $(document).on("click", "#saveIndividualBtn", function () {
        let id = $("#custodianId").val();
        let nationalId = $("#nationalId").val();
        let firstname = $("#firstname").val();
        let lastname = $("#lastname").val();
        let gender = $("#gender").val();
        let dateOfBirth = $("#dateOfBirth").val();
        let phone_number = $("#phoneNumber").val();
        let email = $("#email").val();

        let params = {
            id: id,
            custodian_type: "individual",
            national_id: nationalId,
            firstname: firstname,
            lastname: lastname,
            gender: gender,
            date_of_birth: dateOfBirth,
            phone_number: phone_number,
            email: email
        };

        saveCustodian(params);
    });

    $(document).on("hide.bs.modal", individualModal, function (e) {
        clearFields();
    });

    $(document).on("click", "#delCustodianBtn", function (e) {
        let id = $("#delCustodianId").val();

        deleteNotification(custodian.deleteCustodian(id));
    });
});

function saveCustodian(params) {
    if ($("#individualModalTitle").text() === "Edit Custodian") {
        let resp = custodian.editCustodian(params);

        if (resp.updated) {
            $.when(
                notify(
                    "center",
                    "success",
                    "Edit Custodian",
                    "Custodian updated successfully",
                    false,
                    3000
                )
            ).done(function () {
                $.when(custodian.fetchCustodians()).done(function () {
                    $(individualModal).modal("hide");
                });
            });
        }
    } else {
        let resp = custodian.addCustodian(params);
        if (resp != null) {
            $.when(
                notify(
                    "center",
                    "success",
                    "Add Custodian",
                    "Custodian added successfully",
                    false,
                    3000
                )
            ).done(function () {
                $.when(custodian.fetchCustodians()).done(function () {
                    $(individualModal).modal("hide");
                });
            });
        }
    }
}

function deleteNotification(resp) {
    if (resp.deleted) {
        $.when(
            notify(
                "center",
                "success",
                "Delete Custodian",
                "Custodian has been deleted successfully",
                false,
                1500
            )
        ).done(function () {
            $.when(custodian.fetchCustodians()).done(function () {
             
            });
        });
    }
}

function clearFields() {
    $("#individualId").val("");
    $("#nationalId").val("");
    $("#firstname").val("");
    $("#lastname").val("");
    $("#gender").val("");
    $("#dateOfBirth").val("");
    $("#phoneNumber").val("");
    $("#email").val("");
}
