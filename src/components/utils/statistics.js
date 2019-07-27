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

}

export function getTaxByMonth(month) {

}