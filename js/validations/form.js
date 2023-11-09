
import { validate } from "../validations/validations.js"

let formElements = []

export function validClientFormData() {
    formElements = []
    let validClientData = false;

    //Just a Dummy 
    pushFormElements("nationalId", "#nationalId", true, "National ID");
    
    $.when(validate(formElements)).done(function (value) {
        validClientData = value
    });
    
    return validClientData;
}

function pushFormElements(type, id, isFilled, name) {
    formElements.push({
      type: type,
      id: id,
      checkIsFilled: isFilled,
      name: name
    });
  }
  