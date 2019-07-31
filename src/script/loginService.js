import {store} from '../store'

export function checkLoginData(loginData) {
    let businessData = store.getters.businessData;
    let loginMatch = false;

    businessData.forEach(function (business) {
        if (loginDataMatches(business, loginData)) {
            loginMatch = true;
        }
    });
    return loginMatch;
}

export function getBusinessIdOfLoggedInUser() {

    let businessid = 0;

    let username = store.getters.username;

    let businessData = store.getters.businessData;

    businessData.forEach(function (business) {
        if (business.user.username === username) {
            businessid = business.businessId;
        }
    });

    return businessid;
}

function loginDataMatches(business, loginData) {
    return ((business.user.username).toString() === (loginData.username).toString()
        && (business.user.password).toString() === (loginData.password).toString());
}