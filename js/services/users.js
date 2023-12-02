import * as validator from "./validator.js";
import { apiClient } from "./api-client.js";

let token = sessionStorage.getItem("token");

export function add(national_id, username, firstname, lastname, email, role) {

  let user_data = {
    national_id: national_id,
    username: username,
    firstname: firstname,
    lastname: lastname,
    email: email,
    role: role,
  };

  return apiClient("/api/v1/new_user", "POST", "json", false, false, user_data);
}

export function edit(
  user_id,
  national_id,
  username,
  firstname,
  lastname,
  email,
  role
) {
  let user_data = {
    user_id: user_id,
    national_id: national_id,
    username: username,
    firstname: firstname,
    lastname: lastname,
    email: email,
    role: role,
  };
  return apiClient(
    "/api/v1/edit_user",
    "POST",
    "json",
    false,
    false,
    user_data
  );
}

export function login(formData) {
  $.when(
    apiClient("/api/v1/auth/login", "POST", "json", false, false, formData)
  ).done(function (data) {
    if (data != null) {
      token = data.token;
      sessionStorage.setItem("user_id", data.user_id)
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("username", data.username);
      
      if (data.facility != null) {
        sessionStorage.setItem("facility_id", data.facility.facility_id);
        sessionStorage.setItem("facility_name", data.facility.name);
      }

      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("role", data.role);
      localStorage.setItem("state", "map");
      window.location = "index.html";
    } else {
      //Display an error here
    }
  });
}

export function verifyCurPasword(params) {
  return apiClient("/api/v1/verify_password",
    "POST", "json", false, false,
    params);
}

export function updateProfile(params) {
  return apiClient("/api/v1/update_profile",
    "POST", "json", false, false,
    params);
}

export function delete_user(user_id) {
  return apiClient("/api/v1/delete_user", "POST", "json", false, false, {
    user_id: user_id,
  });
}

export function fetchUsers() {
  return apiClient("/api/v1/users", "GET", "json", false, false, {});
}

export function unassignedUsers() {
  return apiClient("/api/v1/unassigned_users", "GET", "json", false, false, {});
}

export function loadUsersTable(dataset) {
  $("#usersTable").DataTable({
    destroy: true,
    responsive: true,
    ordering: true,
    lengthChange: true,
    autoWidth: false,
    bfilter: false,
    info: true,
    data: dataset,
    columns: [
      { data: "id" },
      { data: "national_id" },
      { data: "username" },
      { data: "firstname" },
      { data: "lastname" },
      { data: "email" },
      { data: "role" },
      { data: null },
      { data: null },
    ],
    columnDefs: [
      {
        render: getEditButton,
        data: null,
        targets: [7],
      },
      {
        render: getDelButton,
        data: null,
        targets: [8],
      },
    ],
  });
}

function getDelButton(data, type, row, meta) {
  return `<button  type="button"  class="btn btn-block btn-danger"
    data-toggle="modal" data-target = "#modal-delete-user"
    data-id = "${data.id}"
    data-username = "${data.username}">
   <i class="fas fa-trash"></i></button>`;
}

function getEditButton(data, type, row, meta) {
  return `<button  type="button"  class="btn btn-block btn-default"
    data-toggle="modal" data-target = "#modal-edit-user"
    data-user-id = "${data.id}"
    data-national-id = "${data.national_id}"
    data-username = "${data.username}"
    data-firstname = "${data.firstname}"
    data-lastname = "${data.lastname}"
    data-email = "${data.email}"
    data-role = "${data.role}"
    data-button-type = "edit">
   <i class="fas fa-edit"></i></button>`;
}
