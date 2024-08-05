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
const changeDueDisplay = document.getElementById('change-due');
const priceDisplay = document.getElementById('total-cost');

function displayChange (status, change) {
    changeDueDisplay.innerHTML = `<p>Status: ${status}</p>`;
    change.forEach(element => {
        changeDueDisplay.innerHTML += `<p>${element[0]}: $${element[1]}</p>`;
    }); 
}

function calculateMoneyChanges(){
    if (parseFloat(moneyInput.value) < price){
        alert('Customer does not have enough money to purchase the item');
        moneyInput.value = '';
        return;
    } 

    if (parseFloat(moneyInput.value) === price){
        changeDueDisplay.innerText = "No change due - customer paid with exact cash";
        moneyInput.value = '';
        return;
    } 
    
    let changeDue = Number(moneyInput.value) - price;
    let denominations = [100, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01];
    let reversedCashInDraw = [...cid].reverse();
    let result = { status: 'OPEN', change: []};
    let totalCashInDraw = parseFloat(cid.map(total => total[1]).reduce((acc,element) => acc + element).toFixed(2));

    if (totalCashInDraw < changeDue){
        return (changeDueDisplay.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>');
    }
    if(totalCashInDraw === changeDue){
        result.status = 'CLOSED';
    }
    for (let i=0; i < reversedCashInDraw.length; i++){
        if(changeDue >= denominations[i] && changeDue > 0){
            let count = 0;
            let total = reversedCashInDraw[i][1];
            while (total > 0 && changeDue >= denominations[i]){
                total -= denominations[i];
                changeDue = parseFloat((changeDue -= denominations[i]).toFixed(2));
                count++;
            }
            if (count > 0){
                result.change.push([reversedCashInDraw[i][0], count * denominations[i]]);// the amount of change for each denomination returned to customer
            }
        }
    }
console.log(result)
displayChange(result.status, result.change) ;
amountInDrawerUpdate(result.change)
}






function amountInDrawerUpdate(change){
    const currencyNameMap = {
        PENNY: 'Pennies',
        NICKEL: 'Nickels',
        DIME: 'Dimes',
        QUARTER: 'Quarters',
        ONE: 'Ones',
        FIVE: 'Fives',
        TEN: 'Tens',
        TWENTY: 'Twenties',
        'ONE HUNDRED': 'Hundreds'
      };
      // Update cid if change is passed in
      if (change) {
        change.forEach(changeArr => {
          const targetArr = cid.find(cidArr => cidArr[0] === changeArr[0]);
          targetArr[1] = parseFloat((targetArr[1] - changeArr[1]).toFixed(2));
        });
      }// objects and arrays are reference types, which means that when you modify a property of an object or an array element, you're modifying the same reference that exists elsewhere in your code. 
      //In your case, cid is an array of arrays, and when you find an item in cid and update its property, you are directly modifying the cid array because targetArr is a reference to an element in cid.
    
      moneyInput.value = '';
      priceDisplay.textContent = `Total: $${price}`;
      cashDrawer.innerHTML = `<p><strong>Change in drawer:</strong></p>
      ${cid
          .map(money => `<p>${currencyNameMap[money[0]]}: $${money[1]}</p>`)
          .join('')}  
      `;
}

purchaseBtn.addEventListener('click', ()=> {
    calculateMoneyChanges()

})

moneyInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'){
        calculateMoneyChanges();
    }
})






