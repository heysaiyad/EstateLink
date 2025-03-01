import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Import Routes
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

// Resolve the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  // origin: "https://real-estate-web-app-1cus.onrender.com",
  origin: "http://localhost:5173", 
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);
app.use("/api/posts", postRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// Serve static files for the frontend
app.use(express.static(path.join(__dirname, "/client/dist")));

// Handle all other routes for SPA (Single Page Application)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/dist/index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});