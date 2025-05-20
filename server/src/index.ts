import express from "express";
import cors from "cors";
import router from "./routes/router";
import { envvars } from "./config/constants";

const PORT = envvars.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Running at ${PORT}`)
})
