import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({
    medicineName: "",
    type: "",
    Qty: "",
    Price: "",
  });
  const [editingId, setEditingId] = useState(null);
  
  // New state for validation errors
  const [errors, setErrors] = useState({});

  const API_URL = "http://localhost:3333/api/medicines";

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(API_URL);
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines:", error);
    }
  };

  // Validation Logic
  const validateForm = () => {
    const newErrors = {};

    // 1. Name Validation 
    if (!form.medicineName.trim()) {
      newErrors.medicineName = "Medicine Name is required";
    } else if (form.medicineName.length > 80) {
      newErrors.medicineName = "Name cannot exceed 80 characters";
    }

    // 2. Type Validation 
    if (!form.type) {
      newErrors.type = "Please select a medicine type";
    }

    // 3. Quantity Validation 
    if (!form.Qty) {
      newErrors.Qty = "Quantity is required";
    } else if (parseInt(form.Qty) <= 0) {
      newErrors.Qty = "Quantity must be greater than 0";
    }

    // 4. Price Validation 
    if (!form.Price) {
      newErrors.Price = "Price is required";
    } else if (parseFloat(form.Price) <= 0) {
      newErrors.Price = "Price must be greater than 0";
    }

    setErrors(newErrors);
    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error for this field as the user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Run validation before submitting
    if (!validateForm()) return;

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(`${API_URL}/add`, form);
      }
      setForm({ medicineName: "", type: "", Qty: "", Price: "" });
      fetchMedicines();
    } catch (error) {
      console.error("Error saving medicine:", error);
    }
  };

  const handleEdit = (medicine) => {
    setEditingId(medicine.id);
    setErrors({}); // Clear errors when switching to edit mode
    setForm({
      medicineName: medicine.medicineName,
      type: medicine.type,
      Qty: medicine.Qty,
      Price: medicine.Price,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this medicine?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchMedicines();
      } catch (error) {
        console.error("Error deleting medicine:", error);
      }
    }
  };

  return (
    <div className="container">
      <h1>Medical Shop Inventory</h1>

      <div className="form-container">
        <h2>{editingId ? "Edit Medicine" : "Add New Medicine"}</h2>
        <form onSubmit={handleSubmit} noValidate>
          {/* Medicine Name Input */}
          <div className="form-group">
            <input
              type="text"
              name="medicineName"
              placeholder="Medicine Name"
              value={form.medicineName}
              onChange={handleChange}
              className={errors.medicineName ? "input-error" : ""}
            />
            {errors.medicineName && <span className="error-msg">{errors.medicineName}</span>}
          </div>

          {/* Type Select */}
          <div className="form-group">
            <select 
              name="type" 
              value={form.type} 
              onChange={handleChange}
              className={errors.type ? "input-error" : ""}
            >
              <option value="">Select Type</option>
              <option value="Tablet">Tablet</option>
              <option value="Syrup">Syrup</option>
              <option value="Injection">Injection</option>
              <option value="Capsule">Capsule</option>
            </select>
            {errors.type && <span className="error-msg">{errors.type}</span>}
          </div>

          {/* Quantity Input */}
          <div className="form-group">
            <input
              type="number"
              name="Qty"
              placeholder="Quantity"
              value={form.Qty}
              onChange={handleChange}
              className={errors.Qty ? "input-error" : ""}
            />
            {errors.Qty && <span className="error-msg">{errors.Qty}</span>}
          </div>

          {/* Price Input */}
          <div className="form-group">
            <input
              type="number"
              name="Price"
              placeholder="Price"
              value={form.Price}
              onChange={handleChange}
              className={errors.Price ? "input-error" : ""}
            />
            {errors.Price && <span className="error-msg">{errors.Price}</span>}
          </div>

          <button type="submit">{editingId ? "Update" : "Add"}</button>
          
          {editingId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                setEditingId(null);
                setErrors({});
                setForm({ medicineName: "", type: "", Qty: "", Price: "" });
              }}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <div className="list-container">
        <h2>Medicine List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => (
              <tr key={med.id}>
                <td>{med.id}</td>
                <td>{med.medicineName}</td>
                <td>{med.type}</td>
                <td>{med.Qty}</td>
                <td>₹{med.Price}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(med)}>
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(med.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;