import businessObjects from '../../../assets/businessObjects'
import moment from 'moment'
import {store} from '../../../store'

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

export function setSubmittedFlag(registrationNumber) {
    let registrationForms = store.getters.registrationForms;

    for (let i = 0; i < registrationForms.length; i++) {
        if (registrationForms[i].meta.registrationNumber === registrationNumber) {
            registrationForms[i].meta.state = 'submitted';
        }
    }
}

export function updateRegistrationForm(formData, businessObject, registrationNumber) {
    let regForm = {
        meta: {
            "registrationNumber": registrationNumber,
            "businessObject": businessObject,
            "state": "unsubmitted",
            "tax": calculateTaxes(formData)
        },
        formData: formData
    };

    let registrationForms = store.getters.registrationForms;

    for (let i = 0; i < registrationForms.length; i++) {
        if (registrationForms[i].meta.registrationNumber === registrationNumber) {
            registrationForms[i] = regForm;
        }
    }
}

export function createRegistrationForm(formData, businessObject) {
    let regForm = {
        meta: {
            "registrationNumber": getNextRegistrationFormNumber(),
            "businessObject": businessObject,
            "state": "unsubmitted",
            "tax": calculateTaxes(formData)
        },
        formData: formData
    };

    let registrationForms = store.getters.registrationForms;

    registrationForms[registrationForms.length] = regForm;

    store.commit('changeRegForm', registrationForms)
    console.log("created registration form with number: " + regForm.meta.registrationNumber);

}

function calculateTaxes(formData) {
    if (formData.registrationFormType === "Regulär") {
        return String(calculateRegularTaxes(formData)).replace(".", ",");
    } else {
        return String(calculateGroupTaxes(formData)).replace(".", ",");
    }
}

function calculateRegularTaxes(formData) {
    let amountPerson = formData.spouse.name === "" ? 1 : 2;

    //hier vielleicht noch ein ternärer operator für empty string check
    let amountBusiness = parseInt(formData.business.amountBusinessAdults, 10) + parseInt(formData.business.amountConferenceVisitors, 10);


    return calculateDays(formData) * 2.5 * (amountPerson - amountBusiness);
}

function calculateGroupTaxes(formData) {
    const amountTaxPersons = 1 + formData.amountAdultHoliday;
    return calculateDays(formData) + amountTaxPersons * 2.5;
}

function calculateDays(formData) {
    const arrivalDate = moment(formData.arrivalDate);
    const departureDate = moment(formData.departureDate);

    return (departureDate.diff(arrivalDate, 'days'));
}

function getNextRegistrationFormNumber() {

    let registrationForms = store.getters.registrationForms;

    const registrationFormNumber = registrationForms[registrationForms.length - 1].meta.registrationNumber;

    return parseInt(registrationFormNumber, 10) + 1;
}