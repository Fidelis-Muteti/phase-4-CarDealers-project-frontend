// CarPage.jsx
import React, { useEffect, useState } from "react";
import NewCarForm from "./NewCarForm";
import CarList from "./CarList";
import Search from "./Search";

function CarPage() {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://phase-4-cardealers-project-backend-flask-x2hc.onrender.com/cars") // Ensure correct API URL
      .then((response) => response.json())
      .then((data) => setCars(data))
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  function handleAddCar(newCar) {
    setCars([...cars, newCar]);
  }

  function handleDeleteCar(id) {
    fetch(`https://phase-4-cardealers-project-backend-flask-x2hc.onrender.com/cars/${id}`, { method: "DELETE" })
      .then((r) => {
        if (r.ok) {
          setCars((prevCars) => prevCars.filter((car) => car.id !== id));
        }
      })
      .catch((error) => console.error("Error deleting car:", error));
  }

  const displayedCars = cars.filter((car) =>
    car.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <h1>Car Inventory</h1>
      <NewCarForm onAddCar={handleAddCar} />
      <Search onSearchChange={setSearchTerm} />
      <CarList cars={displayedCars} onDeleteCar={handleDeleteCar} />
    </main>
  );
}

export default CarPage;
