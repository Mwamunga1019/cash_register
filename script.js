let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

const currencyUnits = {
  PENNY: 0.01,
  NICKEL: 0.05,
  DIME: 0.1,
  QUARTER: 0.25,
  ONE: 1.0,
  FIVE: 5.0,
  TEN: 10.0,
  TWENTY: 20.0,
  "ONE HUNDRED": 100.0,
};

document
  .getElementById("purchase-btn")
  .addEventListener("click", processTransaction);

function processTransaction() {
  let cash = parseFloat(document.getElementById("cash").value);
  let changeDue = cash - price;
  let changeArray = [];
  let status = "";

  if (cash < price) {
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  if (cash === price) {
    document.getElementById("change-due").innerText =
      "No change due - customer paid with exact cash";
    return;
  }

  let cidCopy = [...cid]; // Create a copy of the cash-in-drawer array

  let totalCid = cidCopy.reduce((acc, curr) => acc + curr[1], 0);

  if (totalCid < changeDue) {
    status = "INSUFFICIENT_FUNDS";
    changeArray = [];
  } else if (totalCid === changeDue) {
    status = "CLOSED";
    changeArray = cidCopy;
  } else {
    let changeLeft = changeDue;
    for (let i = cidCopy.length - 1; i >= 0; i--) {
      let coinName = cidCopy[i][0];
      let coinTotal = cidCopy[i][1];
      let coinValue = currencyUnits[coinName];
      let coinsToReturn = 0;

      while (changeLeft >= coinValue && coinTotal > 0) {
        changeLeft -= coinValue;
        changeLeft = changeLeft.toFixed(2);
        coinTotal -= coinValue;
        coinsToReturn++;
      }

      if (coinsToReturn > 0) {
        changeArray.push([coinName, coinsToReturn * coinValue]);
      }
    }

    if (changeLeft > 0) {
      status = "INSUFFICIENT_FUNDS";
      changeArray = [];
    } else {
      status = "OPEN";
    }
  }

  if (status === "INSUFFICIENT_FUNDS") {
    document.getElementById("change-due").innerText =
      "Status: INSUFFICIENT_FUNDS";
  } else if (status === "CLOSED") {
    document.getElementById("change-due").innerText = "Status: CLOSED";
    // Display the entire drawer content in this case
    let changeMessage = cidCopy
      .map((item) => `${item[0]}: $${item[1].toFixed(2)}`)
      .join(" ");
    document.getElementById("change-due").innerText += ` ${changeMessage}`;
  } else if (status === "OPEN") {
    document.getElementById("change-due").innerText = "Status: OPEN";
    // Display the changeArray in this case
    let changeMessage = changeArray
      .map((item) => `${item[0]}: $${item[1].toFixed(2)}`)
      .join(" ");
    document.getElementById("change-due").innerText += ` ${changeMessage}`;
  }
}
