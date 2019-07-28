import moment from 'moment';
import {store} from '../../store'


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

            elementNights = calculateNightsInPeriod(moment(start, 'DD-MM-YYYY'), moment(end, 'DD-MM-YYYY'), el)

            totalStays += elementNights * elementGuests
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

    if (moment(element.formData.arrivalDate) >= moment(start, 'DD-MM-YYYY')
        && moment(element.formData.departureDate) <= moment(end, 'DD-MM-YYYY')) {

        nights = moment(element.formData.departureDate).diff(moment(element.formData.arrivalDate), 'days')

    } else if (moment(element.formData.arrivalDate) < moment(start, 'DD-MM-YYYY')
        && moment(element.formData.departureDate) >= moment(start, 'DD-MM-YYYY')
        && moment(element.formData.departureDate) <= moment(end, 'DD-MM-YYYY')) {

        nights = moment(element.formData.departureDate).diff(moment(start, 'DD-MM-YYYY'), 'days')

    } else if (moment(element.formData.arrivalDate) >= moment(start, 'DD-MM-YYYY')
        && moment(element.formData.arrivalDate) <= moment(end, 'DD-MM-YYYY')
        && moment(element.formData.departureDate) > moment(end, 'DD-MM-YYYY')) {

        nights = moment(end, 'DD-MM-YYYY').diff(moment(element.formData.arrivalDate), 'days')

    } else if (moment(element.formData.arrivalDate) < moment(start, 'DD-MM-YYYY')
        && moment(element.formData.departureDate) > moment(end, 'DD-MM-YYYY')) {

        nights = moment(end, 'DD-MM-YYYY').diff(moment(start, 'DD-MM-YYYY'), 'days')

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

            totalStays += elementNights * elementGuests
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