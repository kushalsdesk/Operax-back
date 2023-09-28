import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDB } from "./services/mongodb.service";
import seriesRoutes from "./routes/series.route";

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api", seriesRoutes);

//Server Initialization
const PORT = process.env.PORT;
const startServer = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      console.log(`The Server is running on the http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("Database Connection failed", err.message);
    process.exit();
  }
};

startServer();
