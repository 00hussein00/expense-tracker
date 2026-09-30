// Expense Tracker - backend (Express API + PostgreSQL)
//
// PHASE 1
// Setup:
//   1. Create a database named expense_tracker and run schema.sql on it.
//   2. Copy .env.example to a new file named .env and write your PostgreSQL password.
//   3. npm install express cors pg dotenv

// Run:    node server.js   (restart it every time you change this file)
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";
import {
  sendQuery,
  handleValidateData
} from "./function.js";

dotenv.config();
const app = express();
app.use(cors());
//to parse JSON body
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error connecting to PostgreSQL database:", err.stack);
  }
  release();
});

// Endpoints you need to build:
//   GET    /api/expenses        return all expenses
app.get('/api/expenses', async (req, res) => {
  const query = "SELECT id, title, amount, category,date FROM expenses";
  await sendQuery(query, res, pool, "Failed when getting data");
});


//   GET    /api/expenses/:id    return one expense (404 if not found)
app.get("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id))) {
    //400 Bad Request
    return res.status(400).json({ error: "Invalid ID format. ID must be an integer." });
  }
  await sendQuery("SELECT * FROM expenses WHERE id = $1", res, pool, "Failed when get data by ID", [id]);
})


//   POST   /api/expenses        add an expense (201, or 400 if the data is invalid)
app.post("/api/expenses", async (req, res) => {
  const { title, amount, category, date } = req.body;

  const { failed, message } = handleValidateData(req);
  if (failed) {
    return res.status(400).json({ error: message });
  }

  await sendQuery(
    "INSERT INTO expenses (title, amount, category, date) VALUES ($1, $2, $3, $4) RETURNING *",
    res,
    pool,
    "Failed to add expense",
    [title, amount, category, date]
  );
});


//   PUT    /api/expenses/:id    update an expense (200, 400, or 404)
app.put("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id))) {
    // 400 Bad Request
    return res.status(400).json({ error: "Invalid ID format. ID must be an integer." });
  }

  const { failed, message } = handleValidateData(req);
  if (failed) {
    return res.status(400).json({ error: message });
  }
  
  const { title, amount, category, date } = req.body;
  await sendQuery(
    "UPDATE expenses SET title = $1, amount = $2, category = $3, date = $4 WHERE id = $5 RETURNING *",
    res,
    pool,
    "Failed to update expense",
    [title, amount, category, date, id]
  );
});


//   DELETE /api/expenses/:id    delete an expense (200, or 404)
app.delete("/api/expenses/:id", async (req, res) => {
  const { id } = req.params;
  if (!Number.isInteger(Number(id))) {
    // 400 Bad Request
    return res.status(400).json({ error: "Invalid ID format. ID must be an integer." });
  }

  await sendQuery(
    "DELETE FROM expenses WHERE id = $1 RETURNING *",
    res,
    pool,
    "Failed to delete expense",
    [id]
  );
});



// Tips:
//   - Create one Pool (from the "pg" library) with the values from .env,
//     and use pool.query(...) in every route. -- done 

//   - ALWAYS send the values as parameters: pool.query("... WHERE id = $1", [id]).
//     NEVER build the SQL text by joining strings with data from the user. -- done

//   - Use RETURNING to get the new (or updated) row back from INSERT and UPDATE. -- done

//   - The database creates the id. The client never sends one. -- done

//   - pg returns NUMERIC as text and DATE as a JavaScript Date, so fix both in your SELECT.
//     Hint: amount::float8 and to_char(date, 'YYYY-MM-DD'). -- done

//   - Validate the data before the query, and answer 400 with a message that explains the problem. -- done
//   - Check the id before the query. A text like "abc" makes PostgreSQL throw an error. -- done
//   - Enable CORS so the frontend can talk to the server.  -- done

//   - Test every endpoint with Thunder Client BEFORE you connect the frontend. -- done







app.listen(3000, () => {
  console.log('http://localhost:3000');
});
