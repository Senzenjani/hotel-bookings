import * as custodian from "../services/custodian.js";
import { notify } from "../services/utils.js";

const modalId = "#modal-custodian";

$(function () {
  $(document).on("show.bs.modal", modalId, function (e) {
    let opener = e.relatedTarget;

    if ($(opener).attr("data-action-type") === "edit") {
      $(modalId).find(`[id = 'custodianModalTitle']`).text("Edit Custodian");

      $.each(opener.dataset, function (key, value) {
        $(modalId).find(`[id = '${key}']`).val(value);
      });
    } else {
      $(modalId).find(`[id = 'custodianModalTitle']`).text("Add Custodian");
    }
  });

  $(document).on("click", "#saveDepartmentBtn", function () {
    let id = $("#departmentId").val();
    let name = $("#name").val();
    let description = $("#description").val();
    let phone_number = $("#phoneNumber").val();
    let email = $("#email").val();
  
    let params = {
      id: id,
      custodian_type: "department",
      name: name,
      description: description,
      phone_number: phone_number,
      email: email
    };

    console.log(params);

    
    /*if ($("#custodianModalTitle").text() === "Edit Custodian") {
      let resp = custodian.editCustodian(params);

      if (resp.updated) {
        $.when(
          notify(
            "center",
            "success",
            "Edit Custodian",
            "Interest updated successfully",
            false,
            3000
          )
        ).done(function () {
          $.when(custodian.fetchCustodians()).done(function () {
            $(modalId).modal("hide");
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
            $(modalId).modal("hide");
          });
        });
      }
      //
    }
    */
  });

  $(document).on("hide.bs.modal", modalId, function (e) {
    clearFields();
  });

  $(document).on("click", "#delCustodianBtn", function (e) {
    let id = $("#delCustodianId").val();

    deleteNotification(custodian.deleteCustodian(id));
  });

 
});

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
          $(delModalId).modal("hide");
        });
      });
    }
  }

function clearFields() {
  $("#interestId").val("");
  $("#name").val("");
  $("#max").val("");
  $("#min").val("");
  $("#rate").val("");
  $("#period").val("");
  $("#accumAmount").val("");
  $("#gracePeriod").val("");
  $("#accumDays").val("");
}
