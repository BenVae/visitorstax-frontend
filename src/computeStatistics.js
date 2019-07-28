import moment from 'moment'

export function computeStatistics(data){

    if(data.formData.registrationFormType === "Regulär"){
        return calculateStatisticsRegular(data);
    }else{
        return calculateStatisticsGroup(data);
    }

}

function calculateStatisticsRegular(data){

    var item = {persons: 0, freeOfCharge: 0, nights: 0};

    if(data.formData.spouse.name !== ""){
        item.persons += 2;
    }else{
        item.persons += 1;
    }

    item.freeOfCharge += data.formData.childrenYearOfBirth.length;

    item.freeOfCharge += data.formData.business.amountBusinessAdults;

    item.nights += calculateNights(data);

    return item
}

function calculateStatisticsGroup(data){

    var item = {persons: 0, freeOfCharge: 0, nights: 0};

    item.persons += data.formData.amountAdultBusiness + data.formData.amountAdultHoliday + data.formData.amountChildren + data.formData.amountHandicapped;

    item.freeOfCharge += data.formData.amountChildren + data.formData.amountHandicapped +data.formData.amountAdultBusiness;

    item.nights += calculateNights(data);

    return item
}

function calculateNights(data){
    const arrivalDate = moment(data.formData.arrivalDate);
    const departureDate = moment(data.formData.departureDate);

    return (departureDate.diff(arrivalDate, 'days'));
}