// playground requires you to assign document definition to a variable called dd

import moment from 'moment';
import {store} from "../../../store";

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
    let registrationForms = store.getters.registrationForms;

    let body = [];
    body.push(header);

    for (let i = 0; i < registrationForms.length; i++) {
        if (registrationForms[i].meta.state === 'submitted') {
            let row = [registrationForms[i].meta.registrationNumber, registrationForms[i].formData.arrivalDate, registrationForms[i].formData.departureDate,
                nachtBerechnung(registrationForms[i]), berechnungNormal(registrationForms[i]), berechnungFrei(registrationForms[i]), "0",
                übernachtungen(registrationForms[i]), kurtaxeberechnung(registrationForms[i])
            ];
            body.push(row)
        }
    }

    body.push(calculateLastRow());

    return body;
}

function nachtBerechnung(form) {
    return 10
}

function berechnungNormal(form) {
    return 4
}

function berechnungFrei(form) {
    return 2
}

function übernachtungen(form) {
    return 6
}

function kurtaxeberechnung(form) {
    return "20,00"
}

function calculateLastRow() {
    return [
        '', {colSpan: 3, text: 'Gesamtsummen', bold: 'true'}, '', {text: '99', bold: 'true'}, {
            text: '99',
            bold: 'true'
        },
        {text: '0', bold: 'true'}, {text: '0', bold: 'true'}, {text: '8', bold: 'true'}, {text: '99', bold: 'true'}
    ]
}

const header = [{text: 'Meld-Nr.', style: 'tableHeader'}, {
    text: 'Ankunft',
    style: 'tableHeader'
}, {text: 'Abreise', style: 'tableHeader'}, {text: 'Nächte', style: 'tableHeader'}, {
    text: 'Normal',
    style: 'tableHeader'
}, {text: 'frei', style: 'tableHeader'}, {
    text: 'Sonst.',
    style: 'tableHeader'
}, {text: 'Übernachtungen', style: 'tableHeader'},
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