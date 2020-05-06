//listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
   
   // hide results
   document.getElementById('results').style.display = 'none';
   // show loader
   document.getElementById('loading').style.display = 'block';

   setTimeout(calculateResults, 2000);
   e.preventDefault();
} );



function calculateResults(){


const investment = document.getElementById('investment');
const bills = document.getElementById('bills');
const savings = document.getElementById('savings');

const BreakEven = document.getElementById('BreakEven');
const TenYear = document.getElementById('10Year');
const TwentyYear = document.getElementById('20Year');
const RateOfIncrease = .075;

var newBill = parseInt(bills.value) * 12;
var monthlySavings = parseInt(savings.value);
var investmentTotal = parseInt(investment.value);
monthlySavings = monthlySavings * .01;//convert to decimal
var totalSavings= 0;
var payOffYear = 0;


if(isFinite(newBill)&&isFinite(monthlySavings)&&isFinite(investmentTotal)){

   document.getElementById('results').style.display = 'block';
         var i;
         for (i = 0; i < 31; i++) { 
            newBill = newBill * RateOfIncrease + newBill;
            totalSavings = newBill * monthlySavings + totalSavings;

            if (payOffYear === 0 ){
               if(totalSavings >= investmentTotal){
                  payOffYear = i; 
                  console.log("Pay off year " + payOffYear);
                  BreakEven.value = payOffYear;
               }
            }

            if (i === 10 ){

               TenYear.value = (totalSavings - investmentTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  
            }

            if (i === 20 ){
               TwentyYear.value = (totalSavings - investmentTotal).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  
            }
         

         }
} else {
   showError("Please check your entry.")
   document.getElementById('loading').style.display = 'none';
}


}

function showError(error){
//create div
const errorDiv = document.createElement('div');

// get elements
const card = document.querySelector('.card');

const heading = document.querySelector('.heading');

// add class
errorDiv.className = 'alert alert-danger';

// create text note and append to div
errorDiv.appendChild(document.createTextNode(error));

//Instert error above heading
card.insertBefore(errorDiv, heading);
document.getElementById('loading').style.display = 'none';
document.getElementById('results').style.display = 'none';
// Clear error after 3 seconds
setTimeout(clearError, 5000);

}

function clearError(){
//clear the aleart error div
document.querySelector('.alert').remove();
document.getElementById('results').style.display = 'none';
   
}