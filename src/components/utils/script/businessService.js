import {store} from '../../../store'

export function createBusiness(business) {

    let businessData = store.getters.businessData;

    let tmpBusiness = business;

    tmpBusiness.businessId = getNextBusinessId();

    tmpBusiness.user.id = tmpBusiness.businessId;

    businessData[businessData.length] = tmpBusiness;
}

function getNextBusinessId() {
    let businessData = store.getters.businessData;

    const businessId = businessData[businessData.length - 1].businessId;

    return parseInt(businessId, 10) + 1;
}