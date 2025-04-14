import app from "./app.js"; // Ensure the file extension is included
import connectDatabase from "./db/database.js"; // Ensure the file extension is included

const PORT = process.env.PORT || 5001;

connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
