import React from "react";

export default function ResultPage() {
  const data = JSON.parse(localStorage.getItem("reservationData"));

  const prixParType = {
    standard: 350,
    premium: 500,
    vip: 750
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Récapitulatif de votre réservation</h2>
      <p><strong>Départ :</strong> {data.depart} le {data.dateDepart}</p>
      <p><strong>Arrivée :</strong> {data.arrivee} le {data.dateArrivee}</p>
      <p><strong>Nombre de passagers :</strong> {data.passagers}</p>
      <p><strong>Type d’autocar :</strong> {data.type.toUpperCase()}</p>
      <p><strong>Prix estimé :</strong> {prixParType[data.type]} €</p>
      <p>✅ Votre demande a été envoyée. Un conseiller vous contactera rapidement.</p>
    </div>
  );
}
