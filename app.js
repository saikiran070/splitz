import express from "express";
import db from "./models/index.js";
import groupRoutes from "./routes/groupRoutes.js";

const app = express();
app.use(express.json());

// routes
app.use("/groups", groupRoutes);

// DB Sync + Server Start
db.sequelize.sync({ force: false }).then(() => {
  console.log("Database synced.");
  app.listen(8000, () => console.log("Server running on http://localhost:8000"));
});
