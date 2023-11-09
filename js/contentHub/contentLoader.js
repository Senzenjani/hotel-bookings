export function loadContent(containerId, newState, urlPath) {
    $.ajax({
      url: urlPath,
      data: {},
      type: "GET",
      async: false,
      success: function (resp) {

        if (newState != null && newState !== "")
          $(`#${containerId}`).html(""); //

        $(`#${containerId}`).append(resp);
  
        /*$("#pageTitle").text("");
  
        $("#pageTitle").text(title);*/
        if (newState != "") localStorage.setItem("state", newState);
      },
      error: function () {
        /* $(``).append(
          "<h>" + title + " view could not be loaded </h1>"
        ); //Displays an error message if content is not loaded;*/
      },
    });
  }