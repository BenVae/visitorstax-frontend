import {store} from '../store'

export function checkLoginData(loginData){
    let businessData = store.getters.businessData;
    let loginMatch = false;

    businessData.forEach(function (business) {
        if (loginDataMatches(business, loginData)){
            mutateStateForLandlordRegforms(business.businessId);
            loginMatch = true;
        }
    });
    return loginMatch;
}

function loginDataMatches(business, loginData){
    return ((business.user.username).toString() === (loginData.username).toString()
        && (business.user.password).toString() === (loginData.password).toString());
}

function mutateStateForLandlordRegforms(businessId){
    let regForms = store.getters.registrationForms.filter(element => parseInt(element.meta.businessObject.business.id) === parseInt(businessId));
    store.commit('changeRegForm', regForms);
}