
import {
  handleGetData,
  getTotalAmount,
  getMaxExpenses
} from "./function.js";


// Expense Tracker - frontend logic

const API_URL = "http://localhost:3000/api/expenses";  //process.env.API_URL;
const tableBody = document.getElementById("table-body");
const form = document.getElementById("expense-form");

//card data 
const totalAmount = document.getElementById("total-amount");
const numberOfExpenses = document.getElementById("number-of-expenses");
const highestExpense = document.getElementById("highest-expense");


// try to do cataegory
/*
const catFillter = document.getElementById("filter-category");


async function catFiltterd() {
  console.log(catFillter.value);
  const data = await getExpenses();
  data.forEach( async e => {
    if(catFillter.value == "All" || catFillter.value == ""){
      handleGetData(data,tableBody);
    }
    else if(e.category == catFillter.value){
      
    }
    
  });
  
}


catFillter.addEventListener("change",catFiltterd)
catFiltterd();

*/

// PHASE 2
// Your backend from Phase 1 is already running, with real expenses in the
// database (from schema.sql). Build this page directly against it with
// fetch and async/await - there is no in-memory or localStorage stage
// this time, and no sample data file.
//
// A possible structure (change it if you have a better idea):
//   - async function getExpenses()          fetch(API_URL), return the JSON



// Call the function
async function getExpenses() {
  try{
    const response = await fetch(API_URL);
    if(response.ok){
      const data = await response.json();
      // set card value
      totalAmount.innerHTML = getTotalAmount(data);
      numberOfExpenses.textContent = data.length;
      highestExpense.innerHTML = getMaxExpenses(data);
      
      return data;
    }else{
      console.error("Failed to get expenses :", response.error);
    }
  }catch(error){
    console.error("Error getting expenses:", error);
  }
  
}


handleGetData(await getExpenses(),tableBody);

//   - async function addExpense(data)       fetch(API_URL, { method: "POST", ... })
async function addExpense(data) {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      // Handles 400 validation errors sent from backend
      console.log(`Error: ${result.error}`);
      return false;
    }

    console.log("Expense added successfully:", result);
    // flag to indicate 
    return true; 

  } catch (error) {
    console.error("Error adding expense:", error);
    return false;
  }
}

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const newExpense = {
    title: document.getElementById("title").value.trim(),
    amount: parseFloat(document.getElementById("amount").value),
    category: document.getElementById("category").value,
    date: document.getElementById("date").value,
  };

  const success = await addExpense(newExpense);

  //Reset form and refresh table on success
  if (success) {
    form.reset();
    handleGetData(await getExpenses(),tableBody);
  }
});


//   - async function updateExpense(id,data) fetch(API_URL + "/" + id, { method: "PUT", ... })
//   - async function deleteExpense(id)      fetch(API_URL + "/" + id, { method: "DELETE" })

//   - async function refresh()              get the list, then call renderTable and renderSummary
//   - renderTable(list)                     build the table rows from the array the API returned
//   - renderSummary(list)                   update the summary cards
//   - applyFilter()                         re-render with the list filtered by category
//
// Don't forget:
//   - Show a Bootstrap spinner while a request is in flight.
//   - Wrap every fetch call in try/catch, and show a Bootstrap alert on failure.
//   - After add, edit, or delete, call refresh() so the page always shows
//     what the server actually saved - never update the table by hand.
//   - The API is at http://localhost:3000/api/expenses (see the Roadmap).


