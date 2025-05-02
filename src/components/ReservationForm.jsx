import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    depart: "",
    dateDepart: "",
    arrivee: "",
    dateArrivee: "",
    passagers: 1,
    type: "standard"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("reservationData", JSON.stringify(formData));
    navigate("/resultat");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "2rem" }}>
      <h2>Réservation</h2>
      <input name="depart" placeholder="Départ" onChange={handleChange} required />
      <input type="date" name="dateDepart" onChange={handleChange} required />
      <input name="arrivee" placeholder="Arrivée" onChange={handleChange} required />
      <input type="date" name="dateArrivee" onChange={handleChange} required />
      <input type="number" name="passagers" placeholder="Passagers" min="1" onChange={handleChange} required />
      <select name="type" onChange={handleChange}>
        <option value="standard">Standard</option>
        <option value="premium">Premium</option>
        <option value="vip">VIP</option>
      </select>
      <button type="submit">Voir le prix</button>
    </form>
  );
}
