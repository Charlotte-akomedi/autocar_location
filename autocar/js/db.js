// Base de données simulée avec localStorage
const DB = {
  // Initialiser la base de données si elle n'existe pas
  init: function() {
    if (!localStorage.getItem('partenaires')) {
      localStorage.setItem('partenaires', JSON.stringify([
        { id: 1, nom: "Autocars Express", email: "contact@autocarsexpress.com", password: "express123", telephone: "+33 1 23 45 67 89" },
        { id: 2, nom: "Luxe Transport", email: "info@luxetransport.com", password: "luxe123", telephone: "+33 9 87 65 43 21" },
        { id: 3, nom: "Voyages Confort", email: "contact@voyagesconfort.com", password: "confort123", telephone: "+33 6 12 34 56 78" }
      ]));
    }
    
    if (!localStorage.getItem('autocars')) {
      localStorage.setItem('autocars', JSON.stringify([
        { id: 1, type: "standard", capacite: 50, prix: 450, partenaire_id: 1, disponible: true, image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
        { id: 2, type: "premium", capacite: 40, prix: 650, partenaire_id: 1, disponible: true, image: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
        { id: 3, type: "vip", capacite: 30, prix: 950, partenaire_id: 2, disponible: true, image: "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
        { id: 4, type: "standard", capacite: 55, prix: 480, partenaire_id: 3, disponible: true, image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
        { id: 5, type: "premium", capacite: 35, prix: 700, partenaire_id: 2, disponible: true, image: "https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
        { id: 6, type: "standard", capacite: 45, prix: 420, partenaire_id: 3, disponible: true, image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" }
      ]));
    }
    
    if (!localStorage.getItem('reservations')) {
      localStorage.setItem('reservations', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('villes')) {
      localStorage.setItem('villes', JSON.stringify([
        "Paris", "Lyon", "Marseille", "Bordeaux", "Lille", "Toulouse", 
        "Nice", "Nantes", "Strasbourg", "Montpellier", "Rennes", "Grenoble"
      ]));
    }
  },
  
  // Récupérer toutes les données d'une table
  getAll: function(table) {
    return JSON.parse(localStorage.getItem(table)) || [];
  },
  
  // Récupérer un élément par son ID
  getById: function(table, id) {
    const items = this.getAll(table);
    return items.find(item => item.id === parseInt(id));
  },
  
  // Ajouter un nouvel élément
  add: function(table, item) {
    const items = this.getAll(table);
    // Générer un nouvel ID
    const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
    item.id = newId;
    items.push(item);
    localStorage.setItem(table, JSON.stringify(items));
    return item;
  },
  
  // Mettre à jour un élément
  update: function(table, id, updates) {
    const items = this.getAll(table);
    const index = items.findIndex(item => item.id === parseInt(id));
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      localStorage.setItem(table, JSON.stringify(items));
      return items[index];
    }
    return null;
  },
  
  // Supprimer un élément
  delete: function(table, id) {
    const items = this.getAll(table);
    const filteredItems = items.filter(item => item.id !== parseInt(id));
    localStorage.setItem(table, JSON.stringify(filteredItems));
  },
  
  // Rechercher des autocars disponibles selon les critères
  searchAutocars: function(departCity, arrivalCity, departDate, passengers, coachType) {
    const autocars = this.getAll('autocars');
    return autocars.filter(autocar => {
      return (
        autocar.disponible === true &&
        autocar.type === coachType &&
        autocar.capacite >= parseInt(passengers)
      );
    }).map(autocar => {
      const partenaire = this.getById('partenaires', autocar.partenaire_id);
      return {
        id: `offer-${autocar.id}`,
        departCity: departCity,
        arrivalCity: arrivalCity,
        departDate: departDate,
        departTime: this.generateRandomTime(8, 14),
        arrivalTime: this.generateRandomTime(12, 20),
        duration: this.calculateDuration(departCity, arrivalCity),
        coachType: autocar.type,
        price: autocar.prix,
        availableSeats: autocar.capacite,
        features: this.getFeaturesForType(autocar.type),
        image: autocar.image,
        partenaire: partenaire ? partenaire.nom : "Partenaire inconnu"
      };
    });
  },
  
  // Générer une heure aléatoire entre min et max
  generateRandomTime: function(minHour, maxHour) {
    const hour = Math.floor(Math.random() * (maxHour - minHour + 1)) + minHour;
    const minute = Math.random() < 0.5 ? "00" : "30";
    return `${hour}:${minute}`;
  },
  
  // Calculer une durée approximative entre deux villes
  calculateDuration: function(departCity, arrivalCity) {
    // Simulation simple de durée
    const cities = {
      "Paris": { x: 2, y: 2 },
      "Lyon": { x: 4, y: 4 },
      "Marseille": { x: 5, y: 7 },
      "Bordeaux": { x: 1, y: 5 },
      "Lille": { x: 2, y: 0 },
      "Toulouse": { x: 2, y: 6 },
      "Nice": { x: 6, y: 6 },
      "Nantes": { x: 0, y: 3 },
      "Strasbourg": { x: 5, y: 1 },
      "Montpellier": { x: 4, y: 6 },
      "Rennes": { x: 0, y: 2 },
      "Grenoble": { x: 5, y: 4 }
    };
    
    const city1 = cities[departCity] || { x: 0, y: 0 };
    const city2 = cities[arrivalCity] || { x: 0, y: 0 };
    
    // Distance euclidienne approximative
    const distance = Math.sqrt(Math.pow(city2.x - city1.x, 2) + Math.pow(city2.y - city1.y, 2));
    
    // Convertir en heures (1 unité = ~1 heure)
    const hours = Math.floor(distance);
    const minutes = Math.round((distance - hours) * 60);
    
    return `${hours}h${minutes < 10 ? '0' + minutes : minutes}`;
  },
  
  // Obtenir les équipements selon le type d'autocar
  getFeaturesForType: function(type) {
    const baseFeatures = ["WiFi", "Climatisation", "Toilettes", "Prises électriques"];
    
    if (type === "standard") {
      return baseFeatures;
    } else if (type === "premium") {
      return [...baseFeatures, "Sièges inclinables", "Plus d'espace"];
    } else if (type === "vip") {
      return [...baseFeatures, "Sièges inclinables", "Service de restauration", "Écrans individuels"];
    }
    
    return baseFeatures;
  },
  
  // Authentification des partenaires
  authenticatePartner: function(email, password) {
    const partenaires = this.getAll('partenaires');
    const partenaire = partenaires.find(p => p.email === email && p.password === password);
    return partenaire || null;
  },
  
  // Récupérer les autocars d'un partenaire
  getPartnerAutocars: function(partnerId) {
    const autocars = this.getAll('autocars');
    return autocars.filter(autocar => autocar.partenaire_id === parseInt(partnerId));
  },
  
  // Récupérer les réservations pour les autocars d'un partenaire
  getPartnerReservations: function(partnerId) {
    const reservations = this.getAll('reservations');
    const autocars = this.getPartnerAutocars(partnerId);
    const autocarIds = autocars.map(a => a.id);
    
    return reservations.filter(reservation => {
      // Extraire l'ID de l'autocar à partir de offerId (format: "offer-X")
      const autocarId = parseInt(reservation.offerId.split('-')[1]);
      return autocarIds.includes(autocarId);
    });
  }
};

// Initialiser la base de données au chargement
document.addEventListener('DOMContentLoaded', function() {
  DB.init();
});