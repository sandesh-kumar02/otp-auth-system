import express from "express";
import session from "express-session";
const app = express();
import { fileURLToPath } from "url";
import path from "path";

// import file
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
// express-session creating

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use("/", authRoutes);

// using importing
connectDB();
app.listen(process.env.PORT_NUMBER || 3000, () => {
  console.log("server is start on port no 3000");
});
