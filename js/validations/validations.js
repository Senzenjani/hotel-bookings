import { notify } from "../notifications/sweetalert.js"

export function validate(formElements) {
    
    //Check for different validations
    let valid = true;

    formElements.reverse().some(element => {
        let inputVal = $(element.id).val();
  
        if (element.checkIsFilled) {
            if (inputVal === '' || typeof inputVal == undefined 
                    || typeof inputVal == "undefined" || inputVal.length === 0) {
                showError(element.name, `Please fill ${element.name}`);
                valid =  false; // Break the loop if validation fails
            }
        }

        if (valid) {
            if (element.type === "email") {
                if (!checkMail(inputVal)) {
                    showError(element.name, `Please enter valid email address`);
                    valid =  false; // Break the loop if validation fails
                }
            }

            if (element.type === "phoneNumber") {
                if (!validateMalawianPhoneNumber(inputVal)) {
                    showError(element.name, `Please enter valid phone number`);
                    valid =  false; // Break the loop if validation fails
                }
            }

            if (element.type === "personName") {
                if (!validatePersonName(inputVal)) {
                    showError(element.name, `Please enter valid person name`);
                    valid =  false;// Break the loop if validation fails
                }
            }

            if (element.type === "moneyAmount") {
                if (!validateMoneyAmount(inputVal)) {
                    showError(element.name, `Please enter correct monetary value`);
                    valid =  false; // Break the loop if validation fails
                }
            }

            if (element.type === "dateOfBirth") {
                if (!validateDateOfBirth(inputVal)) {
                    showError(element.name, `Date Of Birth can only be 18 years ago and above`);
                    valid =  false; // Break the loop if validation fails
                }
            }

            if (element.type === "village") {
                if (!validateVillage(inputVal)) {
                    showError(element.name, `Enter valid village name`);
                    valid =  false; // Break the loop if validation fails
                }
            }

            if (element.type === "ta") {
                if (!validateTraditionalAuthority(inputVal)) {
                    showError(element.name, `Please enter valid traditional authority`);
                    valid =  false; // Break the loop if validation fails
                }
            }

            if (element.type === "alphanum") {
                if (!validateAlphanumeric(inputVal)) {
                    showError(element.name, `Please enter only alphanumerics for ${element.name}`);
                    valid =  false; // Break the loop if validation fails
                }
            }

            if (element.type === "description") {
                if (!validateDescription(inputVal)) {
                    showError(element.name, `Please enter correct description for ${element.name}`);
                    valid =  false; // Break the loop if validation fails
                }
            }

            if (element.type === "startDate") {
                if (!validateStartDate(inputVal)) {
                    showError(element.name, `${element.name} cannot be in the future`);
                    valid =  false; // Break the loop if validation fails
                }
            }

            if (element.type === "alphabeticStringWithSpace") {
                if (!validateAlphabeticStringWithSpace(inputVal)) {
                    showError(element.name, `${element.name} should have only alphabetics with spaces`);
                    valid =  false; // Break the loop if validation fails
                }
            }

            if (element.type === "futureDate") {
                if (!validateFutureDate(inputVal)) {
                    showError(element.name, `${element.name} cannot be in the past`);
                    valid =  false; // Break the loop if validation fails
                }
            }

            if(element.type === "integer"){
                if (!validateInteger(inputVal)) {
                    showError(element.name, `${element.name} can only be an integer`);
                    valid =  false; // Break the loop if validation fails
                }
            }

            if(element.type === "positiveDoubleNumber"){
                if (!validatePositiveDoubleNumber(inputVal)) {
                    showError(element.name, `${element.name} can only be a positive decimal figure`);
                    valid =  false; // Break the loop if validation fails
                }
            }
            
        }
    });

    return valid;
}

function showError(name, message) {
    notify("center", "error", `Invalid ${name}`,
        `${message}`, true, 50000);
    $("#modal-edit-user").modal("hide");
}

function checkMail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateMalawianPhoneNumber(phoneNumber) {
    var phoneRegex = /^(?!00)(\+265|0)[1-9]\d{8}$/;
    return phoneRegex.test(phoneNumber);
}

function validatePersonName(name) {
    var nameRegex = /^[A-Za-z']+$/;
    return nameRegex.test(name);
}

function validateMoneyAmount(amount) {
    var amountRegex = /^\d+(\.\d{1,2})?$/;
    return amountRegex.test(amount);
}



function validateDateOfBirth(dateString) {
    // Create a regular expression to match the date format "YYYY-MM-DD"


    // Create a Date object from the date string
    var dateOfBirth = new Date(dateString);

    // Get the current date
    var currentDate = new Date();

    // Calculate the age difference in milliseconds
    var ageDifference = currentDate - dateOfBirth;

    // Convert the age difference to years
    var age = Math.floor(ageDifference / (1000 * 60 * 60 * 24 * 365.25));

    // Check if the age is less than 18
    if (age < 18) {
        return false; // Age is less than 18
    }

    return true; // Valid date of birth
}


function validateTraditionalAuthority(traditionalAuthority) {
    var regex = /^[A-Za-z0-9\s-,]+$/;
    var maxLength = 100;

    if (!regex.test(traditionalAuthority)) {
        return false; // Traditional Authority contains invalid characters
    }

    if (traditionalAuthority.length > maxLength) {
        return false; // Traditional Authority exceeds the maximum length
    }

    return true; // Traditional Authority is valid
}


function validateVillage(village) {
    var regex = /^[A-Za-z0-9\s-]{1,100}$/;

    if (!regex.test(village)) {
        return false; // Village name contains invalid characters or exceeds the maximum length
    }

    return true; // Village name is valid
}


function validateAlphanumeric(identifier) {
    var regex = /^[a-zA-Z0-9]+$/;

    if (!regex.test(identifier)) {
        return false; // Identifier contains invalid characters
    }

    return true; // Identifier is valid
}

function validateDescription(description) {
    // Remove leading/trailing whitespace and line breaks
    description = description.trim();

    // Count the number of words in the description
    var wordCount = description.split(/\s+/).length;

    if (wordCount > 300) {
        return false; // Description exceeds the maximum word limit
    }

    return true; // Description is valid
}

function validateStartDate(startDate) {
    // Get the current date
    var today = new Date();
    startDate = new Date(startDate);

    // Set the time to midnight (00:00:00) to ignore the time component
    today.setHours(0, 0, 0, 0);

    // Compare the start date with today's date
    if (startDate.getTime() > today.getTime()) {
        return false; // Start date is greater than today
    }

    return true; // Start date is valid
}

function validateAlphabeticStringWithSpace(input) {
    // Remove leading/trailing white spaces
    input = input.trim();

    // Check if the input contains more than 60 words
    if (input.split(/\s+/).length > 60) {
        return false; // Exceeded the word count limit
    }

    var regex = /^[A-Za-z0-9\s]*[A-Za-z][A-Za-z0-9\s]*$/;

    if (!regex.test(input)) {
        return false; // String does not match the pattern
    }

    return true; // String is valid
}


function validateFutureDate(input) {
    var inputDate = new Date(input);
    var today = new Date();

    // Set the time to midnight (00:00:00) for both dates
    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (inputDate > today && inputDate.getTime() !== today.getTime()) {
        return true; // Date is in the future but not today
    }

    return false; // Date is in the past or today
}

function validateInteger(input) {
    input = input.trim();
    // Regular expression to match an integer number
    var regex = /^-?\d+$/;
  
    // Test the input against the regular expression
    return regex.test(input);
}

function validatePositiveDoubleNumber(input) {
    input = input.trim();
    // Regular expression to match a positive double or integer value
    var regex = /^\d+(\.\d+)?$/;

    // Test the input against the regular expression
    return regex.test(input);
}
  
  

