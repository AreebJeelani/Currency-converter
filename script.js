//part where we access country codes and put them in the select.

let BASE_URL = "https://api.exchangerate.host/convert?access_key=5dfb993698da9dd04a66be8ed9c39ccf&";
let dropdown = document.querySelectorAll(".dropdown select");
let fromCurr = document.querySelector(".selectFrom select");
let toCurr = document.querySelector(".selectTo select");

for (let select of dropdown) {
  for (let currCodes in countryList) {
    let newOptions = document.createElement("option");
    newOptions.innerText = currCodes;
    newOptions.value = currCodes;
    if (select.name === "from" && currCodes === "USD") {
      newOptions.selected = true; // it sets the default exchange from USD TO INR.
    } else if (select.name === "to" && currCodes === "INR") {
      newOptions.selected = true;
    }
    select.append(newOptions);
  }
  // part where we add flags to different countries. 
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);//evt.target is element where eventlistner is added (which is the select element), here it is select element where we changed country.
  });
}
// means we call this fn and pass evt.target through it ,
//element is its variable which here is given value = evt.target, means evt.target = "select element" is accessed.
function updateFlag(element) {
  console.log(element);
  currCodes = element.value;// extracting currency codes out from the select element, the one which is selected by the user.
  // this fetches the actual currency code when we change it on the converter ,
  // the codes are saved in "value" attribute. that's why we do element.value
  console.log(currCodes);
  let cntryCodes = countryList[currCodes];// IN, USA, country codes, as we know 'for in ' loop returns "key" of objects and arrays as well as "value"
  console.log(cntryCodes);                // and countryList is an object.
  let newSrc =`https://flagsapi.com/${cntryCodes}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
  // now here the img source for flags changed to above and since cntryCodes is a variable in it , 
  //it automatically changes with diff countries selected and that inturn changes the flag.
}

// part where we get the exchange value by clicking the get exchange button.

let btn = document.querySelector(".exchange button");
btn.addEventListener("click", function(evt){
  evt.preventDefault();
});// thsi prevents the defautl action of the event , here it is submitting the form.

let url = async ()=>{
  let amount = document.querySelector(".convertFrom input");
  let amtVal = amount.value;
  if(amtVal < 0 || amtVal === ""){
    amtVal = 1 ;
    amount.value = "1";// by this if the enter amount is negative or empty , it will automatically change to 1.
  }
  console.log(amtVal);
  let URL =`${BASE_URL}from=${fromCurr.value}&to=${toCurr.value}&amount=${amtVal}`
  let response = await fetch(URL);
  console.log(response);
  let value = await response.json();
  console.log(value.result);// as the final converted price is stored in "result" key.
  let finalVal = document.querySelector(".convertTo input");
  finalVal.value = value.result ;
  
}
btn.addEventListener("click", url);




