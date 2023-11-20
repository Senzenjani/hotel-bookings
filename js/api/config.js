export function getConfigs() {
    let configs = {}
    $.ajax({
        url: "config/config.json",
        type: "post",
        dataType: "json",
        async: false,

        success: function (data) {
           configs = data
        },

    }).fail(function (jqXHR, textStatus, errorThrown) {
        //Request failed. Show error message to user.
    
    });

    return configs;
}

