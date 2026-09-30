export async function sendQuery(query, res, pool,errorMsg = "Failed to process it", params = []) {
    try {
        const result = await pool.query(query, params);
        
        if (result.rows.length === 0) {
            // 404 Not Found
            return res.status(404).json({ error: "Not found this id" });
        }
        // just to get the row of data rather than the all iinfo 
        return res.json(result.rows);

    } catch (error) {
        console.error("Database query error:", error);
        //Server Error 
        res.status(500).json({ error: errorMsg });
    }
};



export function handleValidateData(req) {
  const { title, amount, category, date } = req.body;
  const validCategories = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];
  if(!title || !amount || !category || !date){
    // 400 Bad Request
    return { failed: true, message: "4 values are required" };
  }

  if (typeof title !== "string" || title.trim() === "") {
    return { failed: true, message: "Title must be a non-empty string." };
  }
  
  if (typeof amount !== "number" || amount <= 0) {
    return { failed: true, message: "Amount must be a positive number." } ;
  }

  if (!validCategories.includes(category)) {
    return { failed: true, message: `Category must be one of: ${validCategories.join(', ')}.` };
  }

  return { failed: false };
}