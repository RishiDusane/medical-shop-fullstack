const express = require("express");
const router = express.Router();
const controller = require("./controller");


router.get("/medicines", controller.getAllMedicines);
router.post("/medicines/add", controller.addMedicine);
router.put("/medicines/:id", controller.updateMedicine); 
router.delete("/medicines/:id", controller.deleteMedicine);
router.get("/medicines/:id", controller.getById);

module.exports = router;