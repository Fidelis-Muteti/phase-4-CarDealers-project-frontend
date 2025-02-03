import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Dealer from "./components/Dealers";
import CarForm from "./components/CarForm";
import Navbar from "./components/Navbar";
import "./App.css"; 
function App() {
  const [cars, setCars] = useState([]);

  // Fetch cars on load
  useEffect(() => {
    fetch("https://phase-4-cardealers-project-backend-flask-x2hc.onrender.com/cars")
      .then((r) => r.json())
      .then(setCars);
  }, []);

  // Handle car edit
  function handleEditCar(updatedCar) {
    setCars((prevCars) =>
      prevCars.map((car) => (car.id === updatedCar.id ? updatedCar : car))
    );
  }

  // Handle delete
  function handleDeleteCar(carId) {
    setCars((prevCars) => prevCars.filter((car) => car.id !== carId));
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home cars={cars} onDeleteCar={handleDeleteCar} />} />
        <Route path="/dealers/:id" element={<Dealer />} />
        <Route path="/cars/:carId/edit" element={<CarForm onEditCar={handleEditCar} />} />
      </Routes>
    </Router>
  );
}

export default App;
