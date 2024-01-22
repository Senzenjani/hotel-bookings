export function getConfigs() {
    let configs = {}
    $.ajax({
        url: "build/config/config.json",
        type: "post",
        dataType: "json",
        async: false,
        contentType: "application/json",

        success: function (data) {
           configs = data
        },

    }).fail(function (jqXHR, textStatus, errorThrown) {
        //Request failed. Show error message to user.
    
    });

    return configs;
}

