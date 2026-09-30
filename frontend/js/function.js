import { deleteExpense, passValueToForm } from "./app.js";
const tSpinner = document.getElementById("table-spinner");

//for add a them in cat
export function handleCategoryColor(category) {
  switch (category) {
    case "Food":
      return "badge bg-success";
    case "Transport":
      return "badge bg-primary";
    case "Bills":
      return "badge bg-warning text-dark";
    case "Entertainment":
      return "badge bg-info text-dark";
    case "Other":
      return "badge bg-danger";
  }
} 

//for table of data 
export function handleGetData(info, tableBody, selectedCategore = "All") {
  //reset the row in table 
  let data = info;
  tSpinner.style.display = "none";
  tableBody.replaceChildren();

  data.forEach(d=>{
    const tr = document.createElement("tr");

    const tdTitle = document.createElement("td");
    const tdDate = document.createElement("td");
    const tdAmount = document.createElement("td");
    tdAmount.classList.add("sheftRight")

    // for category 
    const tdCategory = document.createElement("td");
    const spanCategory = document.createElement("span"); // to add style on cat
    spanCategory.className = handleCategoryColor(d.category);
    tdCategory.appendChild(spanCategory);
    
    // for fillter data by category  
    if(selectedCategore!= "All"){
      if(d.category !=selectedCategore)
        tr.style.display  = "none"
    }
   
    // for button
    const tdActions = document.createElement("td");
    tdActions.classList.add("d-flex", "gap-2","justify-content-end"); // sheftRight
      // edit btn
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.classList.add("btn", "btn-outline-success", "btn-sm");
      editButton.addEventListener("click",()=>{
        console.log(d);
        passValueToForm(d.id,d.title,d.amount,d.category,d.date.split("T")[0]);
      })
      //delete btn
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("btn", "btn-outline-danger", "btn-sm");
      deleteButton.addEventListener("click", async () => {
        const confirmed = confirm(`you wanna delete this row ${d.title}`);
        if (confirmed) {
          await deleteExpense(d.id);
        }
      });
      
      tdActions.appendChild(editButton);
      tdActions.appendChild(deleteButton);


    tdTitle.textContent = d.title;
    tdAmount.textContent = d.amount;
    spanCategory.textContent = d.category;   
    tdDate.textContent = d.date.split("T")[0];

    tr.appendChild(tdTitle);
    tr.appendChild(tdAmount);
    tr.appendChild(tdCategory);
    tr.appendChild(tdDate);
    tr.appendChild(tdActions);

    tableBody.appendChild(tr);
  })
}

//for card info
export function getTotalAmount(data) {
  let temp = 0 ;
  data.forEach(e => {
    temp +=  Number(e.amount); 
  });
  return temp;
}

//for card info
export function getMaxExpenses(data){
 let temp = 0;
 data.forEach(e=>{
  if (temp < Number(e.amount))
    temp = e.amount;
 })
 return temp;
}

// for validation the amount
export function isValidAmount(amount) {
  if (amount.value <= 0 || isNaN(parseFloat(amount.value))) {
    alert("the amout must be a positive number");
    return false;
  }
  return true;
}