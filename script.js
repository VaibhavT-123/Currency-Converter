const BASE_URL = "https://raw.githubusercontent.com/WoXy-Sensei/currency-api/main/api";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Show dropdowns Options
for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;

        
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }

        select.append(newOption);
    }
    
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}
// Change The Flag
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;

    if (amountVal === "" || amountVal < 0) {
        amountVal = 1;
        amount.value = "1";
    }

    const URL = `${BASE_URL}/${fromCurr.value.toUpperCase()}_${toCurr.value.toUpperCase()}.json`;
    // In Case Any Error Occur To Fetch Data;
    try {
        let response = await fetch(URL);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        let data = await response.json();

        let actcualData = 1 / data.rate;
        let finalAmount = (amountVal * actcualData).toFixed(2);

        msg.innerText = `${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch (error) {
        // Handle errors gracefully
        console.error(error);
        msg.innerText = "An error occurred while fetching the conversion rate. Please try again or Any Other.";
    }
});


