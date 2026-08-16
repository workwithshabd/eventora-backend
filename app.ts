import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./routes/auth.js";
import eventsRouter from "./routes/events.js";
import bookingRoutes from "./routes/bookings.js";

const app = express();



app.use(cors({

  origin: "https://eventora-ruddy.vercel.app",

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: ["Content-Type", "Authorization"],

}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use((req, res, next) => {
  console.log("content-Type:", req.headers["content-type"]);
  console.log("Body:", req.body);
  next();
});

app.use("/api/bookings", bookingRoutes);
app.use("/api", router);
app.use("/api/events", eventsRouter);

app.get("/", (req, res) => {
  res.json({
    message: "Eventora API is running",
  });
});

export default app;