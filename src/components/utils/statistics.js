import moment from 'moment';
import {store} from '../../store'

let businessDict = {}
let formDict = {"Regulaer": 0, "Gruppe": 0}


export function makeDict() {
    let businesses = store.getters.businessData
    let forms = store.getters.registrationForms

    businesses.forEach(function (el) {
        businessDict[el.businessId] = el.type
    })

    forms.forEach(function (el) {
        if (el.formData.registrationFormType === "Regulär") {
            formDict.Regulaer++
        } else {
            formDict.Gruppe++
        }
    })
}


export function getGuestsInPeriod(start, end) {
    let guests = 0
    let forms = store.getters.registrationForms

    forms.forEach(function (el) {

        if (moment(el.formData.arrivalDate) <= moment(end, 'DD-MM-YYYY')
            && moment(el.formData.departureDate) >= moment(start, 'DD-MM-YYYY')) {

            if (el.formData.registrationFormType === "Regulär") {
                if (el.formData.spouse.name !== "") {
                    guests += 2;
                } else {
                    guests += 1;
                }
                guests += el.formData.childrenYearOfBirth.length;

            } else if (el.formData.registrationFormType === "Gruppe") {
                guests += el.formData.amountAdultBusiness
                guests += el.formData.amountAdultHoliday
                guests += el.formData.amountChildren
                guests += el.formData.amountHandicapped
            }
        }
    })
    return guests
}

export function getGuestsByDistrictInPeriod(start, end, district) {
    let guests = 0
    let forms = store.getters.registrationForms

    forms.forEach(function (el) {

        if (moment(el.formData.arrivalDate) <= moment(end, 'DD-MM-YYYY')
            && moment(el.formData.departureDate) >= moment(start, 'DD-MM-YYYY')) {

            if (el.meta.businessObject.address.zipCode === district) {

                if (el.formData.registrationFormType === "Regulär") {
                    if (el.formData.spouse.name !== "") {
                        guests += 2;
                    } else {
                        guests += 1;
                    }
                    guests += el.formData.childrenYearOfBirth.length;

                } else if (el.formData.registrationFormType === "Gruppe") {
                    guests += el.formData.amountAdultBusiness
                    guests += el.formData.amountAdultHoliday
                    guests += el.formData.amountChildren
                    guests += el.formData.amountHandicapped
                }
            }
        }
    })
    return guests
}

export function getGuestInPeriodSortedByDistrict(start, end) {
    let data = JSON.parse('{}')
    let forms = store.getters.registrationForms

    let elementGuests = 0

    forms.forEach(function (el) {
        elementGuests = 0

        if (moment(el.formData.arrivalDate) <= moment(end, 'DD-MM-YYYY')
            && moment(el.formData.departureDate) >= moment(start, 'DD-MM-YYYY')) {


            if (el.formData.registrationFormType === "Regulär") {
                if (el.formData.spouse.name !== "") {
                    elementGuests += 2;
                } else {
                    elementGuests += 1;
                }
                elementGuests += el.formData.childrenYearOfBirth.length;

            } else if (el.formData.registrationFormType === "Gruppe") {
                elementGuests += el.formData.amountAdultBusiness
                elementGuests += el.formData.amountAdultHoliday
                elementGuests += el.formData.amountChildren
                elementGuests += el.formData.amountHandicapped
            }

            if (data.hasOwnProperty(el.meta.businessObject.address.zipCode)) {

                data[el.meta.businessObject.address.zipCode] += elementGuests
            } else {
                data[el.meta.businessObject.address.zipCode] = elementGuests
            }
        }
    })
    return data
}

export function getTotalStaysInPeriod(start, end) {
    let totalStays = 0
    let forms = store.getters.registrationForms

    let elementGuests = 0
    let elementNights = 0

    forms.forEach(function (el) {
        elementGuests = 0
        elementNights = 0

        if (moment(el.formData.arrivalDate) <= moment(end, 'DD-MM-YYYY')
            && moment(el.formData.departureDate) >= moment(start, 'DD-MM-YYYY')) {

            if (el.formData.registrationFormType === "Regulär") {
                if (el.formData.spouse.name !== "") {
                    elementGuests += 2;
                } else {
                    elementGuests += 1;
                }
                elementGuests += el.formData.childrenYearOfBirth.length;

            } else if (el.formData.registrationFormType === "Gruppe") {
                elementGuests += el.formData.amountAdultBusiness
                elementGuests += el.formData.amountAdultHoliday
                elementGuests += el.formData.amountChildren
                elementGuests += el.formData.amountHandicapped
            }

            elementNights = calculateNightsInPeriod(moment(start), moment(end), el)

            totalStays += (elementNights * elementGuests)
        }
    })

    return totalStays
}

export function getTaxInPeriod(start, end) {

    let forms = store.getters.registrationForms
    let tax = 2.5

    let payedNights = 0

    let elementPayingGuests = 0
    let elementNights = 0

    forms.forEach(function (el) {
        elementPayingGuests = 0
        elementNights = 0

        if (moment(el.formData.arrivalDate) <= moment(end, 'DD-MM-YYYY')
            && moment(el.formData.departureDate) >= moment(start, 'DD-MM-YYYY')) {

            if (el.formData.registrationFormType === "Regulär") {
                if (el.formData.spouse.name !== "") {
                    elementPayingGuests += 2;
                } else {
                    elementPayingGuests += 1;
                }
                if (el.formData.business.amountBusinessAdults !== 0) {
                    elementPayingGuests -= el.formData.business.amountBusinessAdults;
                }
            } else if (el.formData.registrationFormType === "Gruppe") {
                elementPayingGuests += el.formData.amountAdultHoliday
            }

            elementNights = calculateNightsInPeriod(moment(start, 'DD-MM-YYYY'), moment(end, 'DD-MM-YYYY'), el)

            payedNights += elementNights * elementPayingGuests
        }
    })
    return payedNights * tax
}

export function calculateNightsInPeriod(start, end, element) {
    let nights = 0

    if (moment(element.formData.arrivalDate) >= moment(start)
        && moment(element.formData.departureDate) <= moment(end)) {

        nights = moment(element.formData.departureDate).diff(moment(element.formData.arrivalDate), 'days')

    } else if (moment(element.formData.arrivalDate) < moment(start)
        && moment(element.formData.departureDate) >= moment(start)
        && moment(element.formData.departureDate) <= moment(end)) {

        nights = moment(element.formData.departureDate).diff(moment(start), 'days')

    } else if (moment(element.formData.arrivalDate) >= moment(start)
        && moment(element.formData.arrivalDate) <= moment(end)
        && moment(element.formData.departureDate) > moment(end)) {

        nights = moment(end).diff(moment(element.formData.arrivalDate), 'days')

    } else if (moment(element.formData.arrivalDate) < moment(start)
        && moment(element.formData.departureDate) > moment(end)) {

        nights = moment(end).diff(moment(start), 'days')

    }
    return nights
}

//technisch gesehen nutzlos, da auch mit getGuestsInPeriod() lösbar
export function getGuestsInLastDays(days) {
    let forms = store.getters.registrationForms

    let guests = 0

    forms.forEach(function (el) {

        if (moment(el.formData.arrivalDate) <= moment()
            && moment(el.formData.departureDate) >= moment().subtract(days, "days")) {

            if (el.formData.registrationFormType === "Regulär") {
                if (el.formData.spouse.name !== "") {
                    guests += 2;
                } else {
                    guests += 1;
                }
                guests += el.formData.childrenYearOfBirth.length;

            } else if (el.formData.registrationFormType === "Gruppe") {
                guests += el.formData.amountAdultBusiness
                guests += el.formData.amountAdultHoliday
                guests += el.formData.amountChildren
                guests += el.formData.amountHandicapped
            }
        }
    })
    return guests
}

//technisch gesehen nutzlos, da auch mit getTotalStaysInPeriod() lösbar
export function getStaysinLastDays(days) {
    let forms = store.getters.registrationForms

    let totalStays = 0

    let elementGuests = 0
    let elementNights = 0

    forms.forEach(function (el) {
        elementGuests = 0
        elementNights = 0

        if (moment(el.formData.arrivalDate) <= moment()
            && moment(el.formData.departureDate) >= moment().subtract(days, "days")) {


            if (el.formData.registrationFormType === "Regulär") {
                if (el.formData.spouse.name !== "") {
                    elementGuests += 2;
                } else {
                    elementGuests += 1;
                }
                elementGuests += el.formData.childrenYearOfBirth.length;

            } else if (el.formData.registrationFormType === "Gruppe") {
                elementGuests += el.formData.amountAdultBusiness
                elementGuests += el.formData.amountAdultHoliday
                elementGuests += el.formData.amountChildren
                elementGuests += el.formData.amountHandicapped
            }

            elementNights = calculateNightsInPeriod(moment().subtract(days, "days"), moment(), el)
            totalStays += (elementNights * elementGuests)
        }
    })
    return totalStays
}

//technisch gesehen nutzlos, da auch mit getTaxInPeriod() lösbar
export function getTaxInLastDays(days) {
    let forms = store.getters.registrationForms
    let tax = 2.5

    let payedNights = 0

    let elementPayingGuests = 0
    let elementNights = 0

    forms.forEach(function (el) {
        elementPayingGuests = 0
        elementNights = 0

        if (moment(el.formData.arrivalDate) <= moment()
            && moment(el.formData.departureDate) >= moment().subtract(days, "days")) {


            if (el.formData.registrationFormType === "Regulär") {
                if (el.formData.spouse.name !== "") {
                    elementPayingGuests += 2;
                } else {
                    elementPayingGuests += 1;
                }
                if (el.formData.business.amountBusinessAdults !== 0) {
                    elementPayingGuests -= el.formData.business.amountBusinessAdults;
                }
            } else if (el.formData.registrationFormType === "Gruppe") {
                elementPayingGuests += el.formData.amountAdultHoliday
            }

            elementNights = calculateNightsInPeriod(moment().subtract(days, "days"), moment(), el)

            payedNights += elementNights * elementPayingGuests
        }
    })
    return payedNights * tax
}

export function getGuestsInPeriodSortedByType(start, end) {
    let forms = store.getters.registrationForms

    let data = {"gesamt": 0, "Hotel": 0, "Privat": 0}

    let elementGuests = 0

    forms.forEach(function (el) {
        elementGuests = 0

        if (moment(el.formData.arrivalDate) <= moment(end, 'DD-MM-YYYY')
            && moment(el.formData.departureDate) >= moment(start, 'DD-MM-YYYY')) {

            if (el.formData.registrationFormType === "Regulär") {
                if (el.formData.spouse.name !== "") {
                    elementGuests += 2;
                } else {
                    elementGuests += 1;
                }
                elementGuests += el.formData.childrenYearOfBirth.length;

            } else if (el.formData.registrationFormType === "Gruppe") {
                elementGuests += el.formData.amountAdultBusiness
                elementGuests += el.formData.amountAdultHoliday
                elementGuests += el.formData.amountChildren
                elementGuests += el.formData.amountHandicapped
            }
        }

        data.gesamt += elementGuests

        if (businessDict[el.meta.businessObject.business.id] == "Privat") {
            data.Privat += elementGuests
        } else {
            data.Hotel += elementGuests
        }
    })
    return data
}

export function getPayingGuestsInPeriodSortedByType(start, end) {
    let forms = store.getters.registrationForms

    let data = {"gesamt": 0, "Hotel": 0, "Privat": 0}

    let elementPayingGuests = 0

    forms.forEach(function (el) {
        elementPayingGuests = 0

        if (moment(el.formData.arrivalDate) <= moment(end, 'DD-MM-YYYY')
            && moment(el.formData.departureDate) >= moment(start, 'DD-MM-YYYY')) {

            if (el.formData.registrationFormType === "Regulär") {
                if (el.formData.spouse.name !== "") {
                    elementPayingGuests += 2;
                } else {
                    elementPayingGuests += 1;
                }
                if (el.formData.business.amountBusinessAdults !== 0) {
                    elementPayingGuests -= el.formData.business.amountBusinessAdults;
                }
            } else if (el.formData.registrationFormType === "Gruppe") {
                elementPayingGuests += el.formData.amountAdultHoliday
            }

            data.gesamt += elementPayingGuests

            if (businessDict[el.meta.businessObject.business.id] === "Privat") {
                data.Privat += elementPayingGuests
            } else {
                data.Hotel += elementPayingGuests
            }

        }
    })
    return data
}

export function getAverageLengthOfStayInPeriod(start, end) {
    let forms = store.getters.registrationForms

    let totalLength = 0
    let numberOfForms = 0

    forms.forEach(function (el) {

        if (moment(el.formData.arrivalDate) <= moment(end, 'DD-MM-YYYY')
            && moment(el.formData.departureDate) >= moment(start, 'DD-MM-YYYY')) {

            totalLength += moment(el.formData.departureDate).diff(el.formData.arrivalDate, 'days')
            numberOfForms++
        }
    })

    return totalLength / numberOfForms
}

export function getNumberOfFormTypesInPeriod(start, end) {
    let forms = store.getters.registrationForms

    let data = {"Regulaer": 0, "Gruppe": 0}

    forms.forEach(function (el) {

        if (moment(el.formData.arrivalDate) <= moment(end, 'DD-MM-YYYY')
            && moment(el.formData.departureDate) >= moment(start, 'DD-MM-YYYY')) {

            if (el.formData.registrationFormType === "Regulär") {
                data.Regulaer++
            } else {
                data.Gruppe++
            }
        }
    })
    return data
}