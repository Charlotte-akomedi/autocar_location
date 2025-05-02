import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bienvenue chez Autocar Location</h1>
      <p>Organisez vos trajets en autocar en quelques clics.</p>
      <Link to="/reserver">
        <button>Réserver un autocar</button>
      </Link>
      <p>📞 01 23 45 67 89 | ✉️ contact@autocarlocation.fr</p>
    </div>
  );
}
