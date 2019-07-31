import moment from 'moment';
import {store} from "../store";

let businessid;
let businessName;
let streetAndNumber;
let city;
let zipCode;

export function createpdf(businessId) {
    let pdfMake = require('pdfmake/build/pdfmake.js');
    let pdfFonts = require('pdfmake/build/vfs_fonts.js');
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    businessid = businessId;
    getDataForBusiness(businessId);

    const pdfDocGenerator = pdfMake.createPdf(getDocumentDefinition());
    pdfDocGenerator.getDataUrl((dataUrl) => {
        document.getElementById('pdfV').src = dataUrl;
    });
}

function createTable() {
    let registrationForms = store.getters.registrationForms.filter(function (element){
        if(parseInt(element.meta.businessObject.business.id) === parseInt(businessid)){
            return element;
        }
    });

    let body = [];
    body.push(header);

    for (let i = 0; i < registrationForms.length; i++) {
        if (registrationForms[i].meta.state === 'submitted') {
            let row = [registrationForms[i].meta.registrationNumber, moment(registrationForms[i].formData.arrivalDate).format('DD.MM.YYYY'),
                moment(registrationForms[i].formData.departureDate).format('DD.MM.YYYY'), nachtBerechnung(registrationForms[i]),
                berechnungNormal(registrationForms[i]), berechnungFrei(registrationForms[i]), "0",
                uebernachtungen(registrationForms[i]), kurtaxeberechnung(registrationForms[i])
            ];
            body.push(row)
        }
    }
    body.push(calculateLastRow(body));

    return body;
}

function nachtBerechnung(form) {
    const arrivalDate = moment(form.formData.arrivalDate);
    const departureDate = moment(form.formData.departureDate);

    return (departureDate.diff(arrivalDate, 'days'));
}

function berechnungNormal(form) {
    if(form.formData.registrationFormType === "Regulär"){
        if(form.formData.business.amountBusinessAdults === 0){
            if(form.formData.spouse.name !== ""){
                return 2;
            }else{
                return 1;
            }
        }else{
            return 0;
        }
    }else{
        return form.formData.amountAdultHoliday;
    }
}

function berechnungFrei(form) {
    if(form.formData.registrationFormType === "Regulär"){
        return (form.formData.business.amountBusinessAdults === 0 ? form.formData.childrenYearOfBirth.length : form.formData.business.amountBusinessAdults + form.formData.childrenYearOfBirth.length)
    }else{
        return form.formData.amountHandicapped + form.formData.amountAdultBusiness + form.formData.amountChildren;
    }
}

function uebernachtungen(form) {
    const persons = berechnungNormal(form);
    const arrivalDate = moment(form.formData.arrivalDate);
    const departureDate = moment(form.formData.departureDate);

    return (departureDate.diff(arrivalDate, 'days') * persons);
}

function kurtaxeberechnung(form) {
    const kurtaxe = 2.50;
    return (uebernachtungen(form) * kurtaxe)
}

function calculateLastRow(data) {

    let entireNights = 0;
    let entirePersons = 0;
    let entireFreeOfCharge = 0;
    let entireOvernights = 0;
    let tax = 0;

    for(let i = 1; i < data.length; i++){
        entireNights += data[i][3];
        entirePersons += data[i][4];
        entireFreeOfCharge += data[i][5];
        entireOvernights += data[i][7];
        tax += data[i][8];
    }

    return [
        '',
        {colSpan: 2, text: 'Gesamtsumme', bold: 'true'},
        '',
        {text: entireNights, bold: 'true'},
        {text: entirePersons, bold: 'true'},
        {text: entireFreeOfCharge, bold: 'true'},
        {text: '0', bold: 'true'},
        {text: entireOvernights, bold: 'true'},
        {text: tax, bold: 'true'}
    ]
}

const header = [{text: 'Meld-Nr.', style: 'tableHeader'}, {
    text: 'Ankunft',
    style: 'tableHeader'},
    {text: 'Abreise', style: 'tableHeader'},
    {text: 'Nächte', style: 'tableHeader'},
    {text: 'Normal', style: 'tableHeader'},
    {text: 'frei', style: 'tableHeader'},
    {text: 'Sonst.', style: 'tableHeader'},
    {text: 'Übernachtungen', style: 'tableHeader'},
    {text: 'Kurtaxe in €', style: 'tableHeader'}];

function getDocumentDefinition() {
    return {
        pageMargins: [40, 40, 40, 100],
        footer: {
            columns: [
                {
                    text: [{
                        text: 'Zahlungsmöglichkeiten:',
                        bold: true
                    }, '\nSparkasse Bodensee', '\nIBAN: DE66 6905 0001 0000 0718 86', '\nBIC: SOLADES1KNZ'],
                    style: 'documentFooterLeft'
                },
                {
                    text: 'PSchA Karlsruhe\nIBAN: DE34 6601 0075 0005 5037 56\nBIC: PBNKDEFF',
                    style: 'documentFooterCenter'
                },
                {
                    text: 'Volksbank eG Konstanz\nIBAN: DE96 6929 1000 0214 0554 06\nBIC: GENIDE61RAD',
                    style: 'documentFooterRight'
                }
            ]
        },

        content: [

            {
                stack: [
                    'Stadt Konstanz',
                    'Benediktinerplatz 2',
                ],
                style: 'headerStadt'
            },

            {
                stack: [
                    'Kämmerei Abt. Steuern',
                    '78459 Konstanz',
                ], style: 'headerStadt2'
            },
            {
                stack: [
                    '78459 Konstanz, den ',
                    moment().format('DD.MM.YYYY'),
                ], style: 'headerStadt3'
            },

            {
                stack: [
                    'Auskünfte erteilen:',
                    'Veranlagung:',
                    'Tel.: 07531/900-657 Frau Walbrecht',
                    'Tel.: 07531/900-314 Frau Balduani',
                    '\n',
                    'Kirsten.Walbrecht@Konstanz.de',
                    'Lara.Balduani@Konstanz.de',
                    'Zahlung: Tel.: 07531/900-313',
                ],
                style: 'stadtDaten',
            },
            {
                stack: [
                    'Betr .Nr.: ', businessid,
                    '\n',
                    '\n',
                    {
                        text: 'Stadtverwaltung, 78459 Konstanz - KÄ. Abt. Steuern',
                        style: ['quote', 'ul']
                    },
                    {
                        text: businessName,
                        style: ['subheader']
                    },
                    {
                        text: streetAndNumber,
                        style: ['subheader']
                    },
                    {
                        stack: [zipCode, city],
                        style: ['subheader']
                    },

                ], style: 'kundenDaten'
            },

            {
                stack: [
                    '\n',
                    '\n',
                    {
                        style: 'buchungszeichen',
                        table: {
                            heights: [10, 50, 70],
                            body: [
                                ['Buchungszeichen \n 1111.2222.3333', 'Bitte bei der Zahlung oder \n Rückfrage angeben'],

                            ],
                        },
                    },
                ],
            },

            {
                stack: [
                    {
                        text: 'KURTAXEBESCHEID:',
                        style: ['header', 'ul']
                    },

                ],
                style: 'betreff',
            },

            {
                stack: [
                    {
                        text: 'Abrechnung der Kurtaxe für nachfolgende aufgeführte Meldescheine',
                        style: ['quote']
                    },
                ],
                style: 'betreff2',
            },
            {text: 'Anzahl der Personen', fontSize: 14, margin: [220, -120, 0, 8]},
            {
                style: 'table',

                table: {
                    headerRows: 1,
                    body: createTable(),
                },
                layout: 'lightHorizontalLines'
            },
            {
                stack: [
                    '\n',
                    'Fälligkeit: +14 days from',
                    moment().format('DD.MM.YYYY'),
                ], style: 'subheader'
            },
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true
            },
            subheader: {
                fontSize: 14,
                bold: true
            },
            quote: {
                italics: true
            },
            small: {
                fontSize: 8
            },
            stadtDaten: {
                fontSize: 12,
                alignment: 'justify',
                margin: [310, 50, 10, 50]
            },
            headerStadt: {
                fontSize: 12,
                alignment: 'left',
                bold: 'true',
                margin: [0, 0, 50, 50]
            },
            headerStadt2: {
                fontSize: 12,
                alignment: 'left',
                bold: true,
                margin: [120, -78, 0, 50]
            },
            headerStadt3: {
                fontSize: 12,
                margin: [280, -78, 0, 50]
            },
            kundenDaten: {
                fontSize: 12,
                alignment: 'left',
                margin: [10, -160, 50, 50]
            },
            betreff: {
                fontSize: 12,
                margin: [150, 30, 0, 150]
            },
            betreff2: {
                fontSize: 12,
                margin: [66, -150, 0, 150]
            },
            buchungszeichen: {
                fontSize: 12,
                margin: [260, -30, 0, 0],
                alignment: 'right',
                bold: 'true'
            },

            table: {
                fontSize: 9,
                margin: [10, 0, 0, 10],
            },
            documentFooterLeft: {
                fontSize: 10,
                margin: [20, 20, 5, 5],
                alignment: 'left'
            },
            documentFooterCenter: {
                fontSize: 10,
                margin: [5, 33, 5, 5],
                alignment: 'left'
            },
            documentFooterRight: {
                fontSize: 10,
                margin: [5, 33, 20, 5],
                alignment: 'right'
            },

        }
    }
}

function getBusinesses() {
    let businessData = store.getters.businessData;
    let businesses = [];
    businessData.forEach(function (business) {
        let tmp = {
            text: business.businessName,
            value: business.businessId,
        };
        businesses.push(tmp)
    });

    return businesses;
}

function getDataForBusiness(businessId) {
    getBusinesses().forEach(function (business) {
        if (business.businessId === businessId) {
            businessName = business.businessName;
            streetAndNumber = business.streetAndNumber;
            city = business.city;
            zipCode = business.zipCode;
        }
    })
}