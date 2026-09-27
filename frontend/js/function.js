const tSpinner = document.getElementById("table-spinner");

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




export async function handleGetData(info, tableBody) {
  
  let data = info;
  
  tSpinner.style.display = "none";
  data.forEach(d=>{
    const tr = document.createElement("tr");
    const tdTitle = document.createElement("td");
    const tdAmount = document.createElement("td");
    const tdCategory = document.createElement("td");
   
    const spanCategory = document.createElement("span");
    
    spanCategory.className = handleCategoryColor(d.category);
    tdCategory.appendChild(spanCategory);

    const tdDate = document.createElement("td");
    const tdActions = document.createElement("td");
    tdActions.classList.add("d-flex", "gap-2");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("btn", "btn-outline-success", "btn-sm");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-outline-danger", "btn-sm");
    

    tdActions.appendChild(editButton);
    tdActions.appendChild(deleteButton);

    
    tdTitle.textContent = d.title;
    tdAmount.textContent = d.amount;
    spanCategory.textContent = d.category;
    
    tdDate.textContent = d.date ? d.date.split("T")[0] : "";;
    tr.appendChild(tdTitle);
    tr.appendChild(tdAmount);
    tr.appendChild(tdCategory);
    tr.appendChild(tdDate);
    tr.appendChild(tdActions);

    tableBody.appendChild(tr);
  })
}



export function getTotalAmount(data) {
  let temp = 0 ;
  data.forEach(e => {
    temp +=  Number(e.amount); 
  });
  return temp;
}

export function getMaxExpenses(data){
 let temp = 0;
 data.forEach(e=>{
  if (temp < Number(e.amount))
    temp = e.amount;
 })
 return temp;
}