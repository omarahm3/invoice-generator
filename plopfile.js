require('dotenv-safe').config();

const
  moment            = require('moment'),
  TOTAL_SALARY      = process.env.SALARY_TOTAL,
  DAY_TOTAL         = process.env.DAY_TOTAL,
  YOUR_NAME         = process.env.YOUR_NAME,
  BANK_NAME         = process.env.BANK_NAME,
  ACCOUNT_NUMBER    = process.env.ACCOUNT_NUMBER,
  SWIFT_CODE        = process.env.SWIFT_CODE,
  COMPANY_NAME      = process.env.COMPANY_NAME,
  COMPANY_ADDRESS1  = process.env.COMPANY_ADDRESS1,
  COMPANY_ADDRESS2  = process.env.COMPANY_ADDRESS2,
  CONTRACT_DATE     = process.env.CONTRACT_DATE,
  WORKING_DIR_PATH  = __dirname,
  DATE_FORMAT       = 'MMM D, YYYY',
  LONG_DATE_FORMAT  = 'D MMMM';

module.exports = function (plop) {
  const todayDate         = moment().format(DATE_FORMAT);
  const dueDate           = moment().endOf('month').subtract(6, 'days').format(DATE_FORMAT);
  const invoiceStartDate  = moment().subtract(1, 'months').date(1).format(LONG_DATE_FORMAT);
  const invoiceEndDate    = moment().subtract(1, 'months').endOf('month').format(LONG_DATE_FORMAT);

  plop.setHelper('nowDate',           todayDate),
  plop.setHelper('dueDate',           dueDate),
  plop.setHelper('invoiceStartDate',  invoiceStartDate),
  plop.setHelper('invoiceEndDate',    invoiceEndDate),
  plop.setHelper('yourName',          YOUR_NAME),
  plop.setHelper('bankName',          BANK_NAME.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); })),
  plop.setHelper('swiftCode',         SWIFT_CODE),
  plop.setHelper('accountNumber',     ACCOUNT_NUMBER),
  plop.setHelper('companyName',       COMPANY_NAME),
  plop.setHelper('companyAddress1',   COMPANY_ADDRESS1),
  plop.setHelper('companyAddress2',   COMPANY_ADDRESS2),
  plop.setHelper('contractDate',      CONTRACT_DATE),
  plop.setHelper('workingDirPath',    WORKING_DIR_PATH),


  plop.setGenerator('invoice', {
    description: 'Invoice generator',
    prompts: [
      {
        type:     'input',
        name:     'invoiceNumber',
        message:  'Enter invoice number.',
        filter: function(value) {
          return value.toString();
        }
      },
      {
        type:     'input',
        name:     'totalMoney',
        message:  'How many days did you take off this month?',
        filter: function(days) {
          return parseFloat(TOTAL_SALARY) - (days * parseFloat(DAY_TOTAL));
        }
      }
    ],
    actions: [
      {
        type:         'add',
        path:         'invoices/Invoice #{{invoiceNumber}}.html',
        templateFile: 'template/invoice.hbs'
      },
      {
        type:         'add',
        path:         'convert-to-pdf.js',
        templateFile: 'template/convert-to-pdf.script.hbs'
      }
    ]
  });
}
