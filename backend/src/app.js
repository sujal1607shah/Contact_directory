import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact.router.js"; // Adjust path if needed

const app = express();

// Middleware
app.use(cors({
    origin: '*', // or restrict to your frontend URL in production
  credentials: true
})); // Enables CORS
app.use(express.json()); // Parses JSON body

// Routes
app.use("/api/contacts", contactRoutes); // All contact APIs go through this route

// Optional: Test route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

export { app };
