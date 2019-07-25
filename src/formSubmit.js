import businessObjects from './assets/businessObjects';

export function getBusinessObjects() {
    let objects = [];

    businessObjects.forEach(function (businessObject) {
        let test = {
            text: businessObject.address.streetAndNumber,
            value: businessObject
        };
        objects.push(test)
    });
    return objects;
}

export function createRegistrationForm(formData, businessObject) {
    let regForm = {
        meta: {
            "registrationNumber": getNextRegistrationFormNumber(),
            "businessObject": businessObject,
            "isSubmitted": "false",
            "tax": calculateTaxes(formData)
        },
        formData: formData
    }

    //TODO: regForm an sampleRegistrationForm appenden
}

function calculateTaxes(formData) {
    if (formData.registrationFormType === "Regulär"){
        return calculateRegularTaxes(formData)
    }else{
        return calculateGroupTaxes(formData)
    }
}

function calculateRegularTaxes(formData){
    //TODO implement
}

function calculateGroupTaxes(formData) {
    //TODO implement
}

function getNextRegistrationFormNumber() {
    //TODO get highest registrationNumber from sampleRegistrationForm
}