
import * as conn_data from "./config.js";

let config = conn_data.getConfigs();
let token = sessionStorage.getItem("token");

export function apiClient(path, type, dataType, async, cache, data) {
    let result = null
    $.ajax({
        url: `${config.apiProtocol}://${config.apiURL}:${config.apiPort}${path}`,
        type: type,
        dataType: dataType,
        async: async,
        cache: cache,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        data: data,
        success: function (res) {
            result = res
        },
        error: function(res){
            if(res.status === 401){
               sessionStorage.clear();
               localStorage.clear();
               window.location = "index.html"
            } 
        } 
    }).fail(function (jqXHR, testStatus, errorThrown) {

    });

    return result;
}