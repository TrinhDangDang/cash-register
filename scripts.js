let price = 1.87;
let cid = [ //cid: cash in drawer
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const cashDrawer = document.getElementById('cash-drawer');
const moneyInput = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');
const registerDisplay = document.getElementById('register-display');
