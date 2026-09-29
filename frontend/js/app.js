
import {
  handleGetData,
  getTotalAmount,
  getMaxExpenses,
  isValidAmount
} from "./function.js";


let dataExpensTracker = [];

const API_URL = "http://localhost:3000/api/expenses";  //process.env.API_URL;

// for table of date
const tableBody = document.getElementById("table-body");
const catFillter = document.getElementById("filter-category");

//card data 
const totalAmount = document.getElementById("total-amount");
const numberOfExpenses = document.getElementById("number-of-expenses");
const highestExpense = document.getElementById("highest-expense");




// Form 
const addForm = document.getElementById("expense-form");
const formTitle = document.getElementById("title");
const formAmount = document.getElementById("amount");
const formCategory = document.getElementById("category");
const formDate = document.getElementById("date");


// edit Form
const editContainer = document.getElementById("edit-container");
const btnCancel = document.getElementById("btn-cancel");
const editForm = document.getElementById("edit-form");
const newTitle =   document.getElementById("newtitle");
const newAmount =   document.getElementById("newamount");
const newCategory =   document.getElementById("newcategory");
const newdate =   document.getElementById("newdate");
let currentEditFieldID = 0;



// PHASE 2
// Your backend from Phase 1 is already running, with real expenses in the
// database (from schema.sql). Build this page directly against it with
// fetch and async/await - there is no in-memory or localStorage stage
// this time, and no sample data file.
//
// A possible structure (change it if you have a better idea):

//   - async function getExpenses()          fetch(API_URL), return the JSON
async function getExpenses() {
  try{
    const response = await fetch(API_URL);
    if(response.ok){
      const data = await response.json();
      dataExpensTracker = await data;

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


// render the table 
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
      console.log(`Error: ${result.error}`);
      return false;
    }

    console.log("Expense added done:", result);
    return true; 

  } catch (error) {
    console.error("Error adding expense:", error);
    return false;
  }
}

addForm.addEventListener("submit", async (e) => {

  e.preventDefault();

  if(!isValidAmount(formAmount))
    return;

  const newExpense = {
    title:formTitle.value.trim(),
    amount: parseFloat(formAmount.value),
    category: formCategory.value,
    date: formDate.value,
  };

  const success = await addExpense(newExpense);

  if (success) {
    //Reset form and refresh table
    addForm.reset();
    handleGetData(await getExpenses(),tableBody);
  }
});

//   - async function updateExpense(id,data) fetch(API_URL + "/" + id, { method: "PUT", ... })
async function updateExpense(id, data) {
  try {
    const response = await fetch(API_URL + "/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    const result = await response.json();

    if (!response.ok) {
      console.log(`error: ${result.error}`);
      return false;
    }

    console.log("Expense update done:", result);
    return true;

  } catch (error) {
    console.log("error when update the filed with id " + id);
    return false;
  }
}

btnCancel.addEventListener("click", () => {
  editContainer.style.display = "none";
});

export function passValueToForm(id,title,amount,cat,date){
  editContainer.style.display = "flex";
  currentEditFieldID = id;
  newTitle.value = title;
  newAmount.value = amount;
  newCategory.value = cat;
  newdate.value = date;
}

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!isValidAmount(newAmount))
    return;

  const edittedExpenses = {
    title: newTitle.value.trim(),
    amount: parseFloat(newAmount.value),
    category: newCategory.value,
    date: newdate.value,
  };

  const success = await updateExpense(currentEditFieldID, edittedExpenses);

  if (success) {
    editContainer.style.display = "none";
    handleGetData(await getExpenses(), tableBody);
  }
});

//   - async function deleteExpense(id)      fetch(API_URL + "/" + id, { method: "DELETE" })
export async function deleteExpense(id) {
  try {
    const respone = await fetch(API_URL + "/" + id,
    {
      method: "DELETE"
    })

    const result = await respone.json();
    if (!respone.ok) {
      console.log(`Error: ${result.error}`);
      return false;
    }
    console.log("Expense deletes done:", result);
    return true;

  } catch (error) {
    console.log("Error when delete this row " + id);
  } finally {
    handleGetData(await getExpenses(), tableBody);
  }
}  

/* ---------------------
//   - async function refresh()              get the list, then call renderTable and renderSummary
//   - renderTable(list)                     build the table rows from the array the API returned
//  its inside  handle get data 
//   - renderSummary(list)                   update the summary cards
// i put it inside get expense 
 ---------------------- */
 
 /*-------
//   - applyFilter()                         re-render with the list filtered by category
// i put it inside handle get data and pass a code from data 
--------*/
catFillter.addEventListener("change", () =>
  handleGetData(dataExpensTracker, tableBody, catFillter.value)
);


// Don't forget:
//   - Show a Bootstrap spinner while a request is in flight.
//   - Wrap every fetch call in try/catch, and show a Bootstrap alert on failure.
//   - After add, edit, or delete, call refresh() so the page always shows
//     what the server actually saved - never update the table by hand.
//   - The API is at http://localhost:3000/api/expenses (see the Roadmap).


