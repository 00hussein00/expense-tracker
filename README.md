# Expense Tracker

**the main Goul :** 
Expense Tracker is a web app for recording and managing expenses. to help
the user to follow up his Expense


## How to run

<!-- Write the exact steps someone needs to run your project from scratch.
     Assume they have Node.js, PostgreSQL, and VS Code, and nothing else.
     Include: creating the database, running schema.sql, writing the .env file,
     starting the backend, and opening the frontend. -->

**Backend**

1. Create a PostgreSQL database:
     use folder **schema.sql** and run it 
2. create a .env file and fill it with your data
3. move to backend directory from your terminal
     ```cd backend ```
4. run this command ```node server.js ``` to run the back end  

**Frontend**
1. you just run it useing liveServer you wannat 

## Features

- [x] Add an expense (with validation)
- [x] Delete an expense
- [x] Edit an expense
- [x] Filter by category
- [x] Summary cards (total, count, highest)
- [x] Data is saved in a PostgreSQL database


## Screenshots
**Main Page**
<p>
  <img src="img/main.png" alt="Project Screenshot" width="600">
</P>

**Edit Form**
<P>
  <img src="img/editForm.png" alt="Project Screenshot" width="600">
</P>

**Demo Video**

https://youtu.be/7AIYDJltOJ4?si=s-tNFdqAoOKuogxS


## What was the hardest part?
**Backend**
1. just a small proplem when orgnize the code, and try to make it general, like a function sendQuerey its take a long time to do it and use it.
2. how pass the id of the element.
3. i have an error becuse i forget to add type="module" to js 




**FrontEnd**
1. make a simple design like alighn item in the table
2. make the connection bettwen the edit form and the PUL method 
3. let the edit Form appear in the top layers
4. write a method like updateExpense and addExpense
