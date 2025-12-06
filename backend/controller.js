const db = require("./db");

// Get All Medicines
exports.getAllMedicines = (req, res) => {
    db.query("SELECT * FROM medicines", (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.json(data);
    });
};

// Add Medicine
exports.addMedicine = (req, res) => {
    const body = req.body;
    db.query("INSERT INTO medicines SET ?", [body], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.json({ message: "Medicine added", id: data.insertId });
    });
};

// Delete Medicine
exports.deleteMedicine = (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM medicines WHERE id = ?", [id], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.json({ message: "Medicine deleted" });
    });
};

// Update Medicine
exports.updateMedicine = (req, res) => {
    const id = req.params.id;
    const body = req.body;
    db.query("UPDATE medicines SET ? WHERE id = ?", [body, id], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.json({ message: "Medicine updated" });
    });
};

// Find Medicine By Id
exports.getById = (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM medicines WHERE id = ?", [id], (err, data) => {
        if (err) {
            return res.status(500).json(err);
        }
        return res.json(data[0]); 
    });
};