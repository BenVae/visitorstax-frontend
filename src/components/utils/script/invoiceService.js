import {store} from '../../../store'


export function getBusinesses() {
    let businessData = store.getters.businessData;
    let businesses = [];


    businessData.forEach(function (business) {
        let tmp = {
            text: business.businessName,
            value: business.businessId,
        };
        businesses.push(tmp)
    })

    return businesses;
}