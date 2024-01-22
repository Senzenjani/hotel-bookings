
import * as conn_data from "./config.js";

let config = conn_data.getConfigs();
let token = sessionStorage.getItem("token");

export function apiClient(path, method, dataType, async, cache, data) {
    let result = null;

    $.ajax({
        url: `${config.apiProtocol}://${config.apiURL}:${config.apiPort}/api/v1/proxy?path=${path}&method=${method}`,
        type: "POST", // Using a proxy, so the default method is POST
        dataType: dataType,
        async: async,
        cache: cache,
        contentType: 'application/json', // Set content type to JSON
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: JSON.stringify(data), // Convert data to JSON format
        success: function (res) {
            result = res;
        },
        error: function (res) {
            if (res.status === 401) {
                sessionStorage.clear();
                localStorage.clear();
                window.location = "index.html";
            }
        }
    }).fail(function (jqXHR, testStatus, errorThrown) {
        // Handle failure
    });

    return result;
}
