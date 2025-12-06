const express = require("express");
const cors = require("cors");
const medicinesRoutes = require("./router"); 

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", medicinesRoutes); 
//http://localhost:3333/api/medicines

app.listen(3333, () => {
    console.log("Server Listening on Port 3333");
});