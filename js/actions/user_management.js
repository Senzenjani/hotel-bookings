import * as users from "../services/users.js";

import { selectContent } from "../actions/switcher.js"

import { notify } from "../services/utils.js"


let formType;
let addedUsers = 0;

$(document).ready(function () {

    $("#lbl-username").text(sessionStorage.getItem("username"));

    $(document).on('click', '#add-user', function (e) {

        let username = $("#username").val();
        let firstname = $("#firstname").val();
        let lastname = $("#lastname").val();
        let national_id = $("#nationalId").val();
        let email = $("#email").val();
        let role = $("#role").val();

        if (formType === 'add') {
            $.when(users.add(national_id, username, firstname, lastname, email, role)).done(
                function (result) {
                    if (result != null ) {
                        clearFields();
                        users.loadUsersTable(users.fetchUsers());
                        notify("center", "success", "Added User", 
                            `User has been added successfully (Keep the following default
                                 password   ${result.password} `, true, 50000);
                        $("#modal-edit-user").modal("hide");
                      
                    }
                }
            )
        } else {
            let user_id = $("#userId").val();
            let resp = users.edit(user_id, national_id, username, firstname, lastname, email, role);
            if (resp != null) {
                if (resp.updated) {
                    $("#modal-edit-user").modal('hide');
                    notify("center", "success", "Edit user", "User has been edited successfully", true, 50000);
                    users.loadUsersTable(users.fetchUsers());
                }
            }
        }

    });

    $(document).on('show.bs.modal', '#modal-edit-user', function (e) {
        let opener = e.relatedTarget;
        formType = $(opener).attr('data-button-type');

        //Checking if the button clicked was a edit or add
        if (formType === 'add') {
            $('.modal-title').text("Add User");
            $('#add-user').text("Add");
            $('.alt-btn').removeAttr("data-dismiss");
            $('.alt-btn').text("Finish");
        } else {
            $('#add-user').text("Save");
            $('.alt-btn').attr("data-dismiss", "modal");
            $('.alt-btn').text("Close");
            $('.modal-title').text("Edit User");
            let $userModal = $('#modal-edit-user');

            $.each(opener.dataset, function (key, value) {
                $userModal.find(`[id = '${key}']`).val(value);
            });
        }
    });

    $(document).on("click", '.alt-btn', function () {
        if (addedUsers > 0) {
            $("#modal-edit-user").modal('hide');
            notify("center", "success", "Add user", "You have succesfully added " + addedUsers +
                " user(s)", false, 6000);
            selectContent("users");
        } else {
            $("#modal-edit-user").modal('hide');
        }
    })

    $(document).on('hide.bs.modal', '#modal-edit-user', function (e) {
        clearFields();
    });

    $(document).on('show.bs.modal', '#modal-delete-user', function (e) {

        let opener = e.relatedTarget;
        let user_id = $(opener).attr('data-id');
        let username = $(opener).attr('data-username');

        let modal = $('#modal-delete-user');
        modal.find('[id="del-user-id"]').val(user_id);
        modal.find('[id="del-user-message"]').text("Are you sure you want to delete " + username + "?");
    });

    $(document).on('click', '#del-user-btn', function (e) {
        let resp = users.delete_user($("#del-user-id").val());
        if (resp.deleted) {
            $("#modal-delete-user").modal('hide');
            notify("center", "success", "Deleted User", "User has been deleted successfully", false, 1500);
            users.loadUsersTable(users.fetchUsers());
        }
    });

    $(document).on('click', '#settings-link', function (e) {
        $.when($("#modal-profile").modal("show")).done(function () {
            $("#profileUsername").attr('disabled', true);
            $("#profileUsername").val(sessionStorage.getItem("username"));
            $("#saveProfile").attr('disabled', true);
            $("#newPassword").attr('disabled', true);
            $("#confirmPassword").attr('disabled', true);

        });
    });

    $(document).on('blur', '#curPassword', function (e) {
        let curPassword = $("#curPassword").val();
        let email = sessionStorage.getItem("email");
        let user_id = sessionStorage.getItem("user_id");

        $("#invalidPassword").text("");
        $("#newPassword").attr('disabled', true);

        if (curPassword !== "" && curPassword !== null) {
            $.when(users.verifyCurPasword({
                user_id: user_id,
                email: email,
                cur_password: curPassword
            })).done(function (data) {
                if (!data.valid_password) {
                    $("#invalidPassword").text(`Invalid Password`);
                } else {
                    $("#newPassword").attr('disabled', false);
                }
            });
        }
    });

    $(document).on('blur', '#newPassword', function (e) {
        let newPassword = $("#newPassword").val();
        $("#wrongPassword").text("");
        $("#confirmPassword").attr('disabled', true);

        if (newPassword !== "" && newPassword !== null) {
            if (!validatePassword(newPassword)) {
                $("#wrongPassword").text(`Password should have at 
                least 6 characters, containing at least
                 one alphanumeric character, one number, 
                 and one special character`);
            } else {
                $("#confirmPassword").attr('disabled', false);
            }
        }
    });

    $(document).on('blur', '#confirmPassword', function (e) {
        let confirmPassword = $("#confirmPassword").val();
        let newPassword = $("#newPassword").val();

        $("#wrongPasswordMatch").text("");

        if ((newPassword !== "" && newPassword !== null) && (confirmPassword !== "" && confirmPassword !== null)) {
            if (!(newPassword === confirmPassword)) {
                $("#wrongPasswordMatch").text(`Does match with new password`);
                $("#saveProfile").attr('disabled', true);
            } else {
                $("#saveProfile").attr('disabled', false);
            }
        }
    });

    $(document).on('click', '#saveProfile', function (e) {
        let user_id = sessionStorage.getItem("user_id");
        let newPassword = $("#newPassword").val();

        $.when(users.updateProfile({ user_id: user_id, new_password: newPassword })).done(
            function (data) {
                if (data.updated) {
                    notify("center", "success", "Updated Profile", "User has been deleted successfully", false, 1500);
                    $("#modal-profile").modal("hide");
                } else {
                    notify("center", "warning", "Updated Profile", "Failed to update user profile", false, 1500);
                    $("#modal-profile").modal("hide");
                }

            });
    });

});

function validatePassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return regex.test(password)
}

function clearFields() {
    $("#username").val("");
    $("#firstname").val("");
    $("#lastname").val("");
    $("#nationalId").val("");
    $("#email").val("");

}