import moment from 'moment';
import {store} from '../../store'


export function getGuestsByMonth(month) {
    var guests = 0
    var forms = store.getters.registrationForms

    forms.forEach(function (el) {

        if (moment(el.formData.arrivalDate).format('MM-YYYY') === moment(month, 'MM-YYYY').format('MM-YYYY')
            || moment(el.formData.departureDate).format('MM-YYYY') === moment(month, 'MM-YYYY').format('MM-YYYY')
            || moment(el.formData.arrivalDate).format('MM-YYYY') < moment(month, 'MM-YYYY').format('MM-YYYY')
            && moment(el.formData.departureDate).format('MM-YYYY') === moment(month, 'MM-YYYY').format('MM-YYYY')) {

            if (el.formData.registrationFormType === "Regulär") {
                if (el.formData.spouse.name !== "") {
                    guests += 2;
                } else {
                    guests += 1;
                }
                if (el.formData.business.amountBusinessAdults !== 0) {
                    guests += el.formData.business.amountBusinessAdults;
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

export function getGuestsByDistrictByMonth(month, district) {
    var guests = 0
    var forms = store.getters.registrationForms

    forms.forEach(function (el) {

        if (moment(el.formData.arrivalDate).format('MM-YYYY') === moment(month, 'MM-YYYY').format('MM-YYYY')
            || moment(el.formData.departureDate).format('MM-YYYY') === moment(month, 'MM-YYYY').format('MM-YYYY')
            || moment(el.formData.arrivalDate).format('MM-YYYY') < moment(month, 'MM-YYYY').format('MM-YYYY')
            && moment(el.formData.departureDate).format('MM-YYYY') === moment(month, 'MM-YYYY').format('MM-YYYY')) {

            if (el.meta.businessObject.address.zipCode === district) {

                if (el.formData.registrationFormType === "Regulär") {
                    if (el.formData.spouse.name !== "") {
                        guests += 2;
                    } else {
                        guests += 1;
                    }
                    if (el.formData.business.amountBusinessAdults !== 0) {
                        guests += el.formData.business.amountBusinessAdults;
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

export function getTotalStaysByMonth(month) {
    var totalStays = 0
    var forms = store.getters.registrationForms

    var elementGuests = 0
    var elementNights = 0

    forms.forEach(function (el) {

        elementGuests = 0
        elementNights = 0

        if (moment(el.formData.arrivalDate).format('MM-YYYY') === moment(month, 'MM-YYYY').format('MM-YYYY')
            || moment(el.formData.departureDate).format('MM-YYYY') === moment(month, 'MM-YYYY').format('MM-YYYY')
            || moment(el.formData.arrivalDate).format('MM-YYYY') < moment(month, 'MM-YYYY').format('MM-YYYY')
            && moment(el.formData.departureDate).format('MM-YYYY') === moment(month, 'MM-YYYY').format('MM-YYYY')) {

            if (el.formData.registrationFormType === "Regulär") {
                if (el.formData.spouse.name !== "") {
                    elementGuests += 2;
                } else {
                    elementGuests += 1;
                }
                if (el.formData.business.amountBusinessAdults !== 0) {
                    elementGuests += el.formData.business.amountBusinessAdults;
                }
                elementGuests += el.formData.childrenYearOfBirth.length;
            } else if (el.formData.registrationFormType === "Gruppe") {
                elementGuests += el.formData.amountAdultBusiness
                elementGuests += el.formData.amountAdultHoliday
                elementGuests += el.formData.amountChildren
                elementGuests += el.formData.amountHandicapped
            }

            elementNights = calculateNightsInMonth(el, month)

            totalStays += elementNights * elementGuests
        }
    })

    return totalStays
}

export function getTaxByMonth(month) {

    var forms = store.getters.registrationForms
    var tax = 2.5

    var payedNights = 0
    var elementPayingGuests = 0
    var elementNights = 0

    forms.forEach(function (el) {

        elementPayingGuests = 0
        elementNights = 0

        if (moment(el.formData.arrivalDate).format('MM-YYYY') === moment(month, 'MM-YYYY').format('MM-YYYY')
            || moment(el.formData.departureDate).format('MM-YYYY') === moment(month, 'MM-YYYY').format('MM-YYYY')
            || moment(el.formData.arrivalDate).format('MM-YYYY') < moment(month, 'MM-YYYY').format('MM-YYYY')
            && moment(el.formData.departureDate).format('MM-YYYY') === moment(month, 'MM-YYYY').format('MM-YYYY')) {

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

            elementNights = calculateNightsInMonth(el, month)

            payedNights += elementNights * elementPayingGuests
        }
    })
    return payedNights
}

export function calculateNightsInMonth(element, month) {
    var nights = 0

    if (moment(element.formData.arrivalDate).format('MM-YYYY') === moment(month, 'MM-YYYY').format('MM-YYYY')
        && moment(element.formData.departureDate).format('MM-YYYY') === moment(month, 'MM-YYYY').format('MM-YYYY')) {

        nights = moment(element.formData.departureDate).diff(moment(element.formData.arrivalDate), 'days')

    } else if (moment(element.formData.arrivalDate).format('MM-YYYY') < moment(month, 'MM-YYYY').format('MM-YYYY')
        && moment(element.formData.departureDate).format('MM-YYYY') === moment(month, 'MM-YYYY').format('MM-YYYY')) {

        nights = moment(element.formData.departureDate).diff(moment(('01-' + month), 'DD-MM-YYYY'), 'days')

    } else if (moment(element.formData.arrivalDate).format('MM-YYYY') === moment(month, 'MM-YYYY').format('MM-YYYY')
        && moment(element.formData.departureDate).format('MM-YYYY') > moment(month, 'MM-YYYY').format('MM-YYYY')) {

        nights = moment(month, 'MM-YYYY').endOf('month').diff(moment(element.formData.arrivalDate))

    } else if (moment(element.formData.arrivalDate).format('MM-YYYY') < moment(month, 'MM-YYYY').format('MM-YYYY')
        && moment(element.formData.departureDate).format('MM-YYYY') > moment(month, 'MM-YYYY').format('MM-YYYY')) {

        nights = moment(month, 'MM-YYYY').daysInMonth()

    }
    return nights
}