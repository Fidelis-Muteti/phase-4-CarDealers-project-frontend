import { Link } from "react-router-dom";

function CarList({ cars, onDeleteCar }) {
  const handleDelete = (carId) => {
    if (window.confirm("Are you sure you want to delete this car?")) {
      fetch(`https://phase-4-cardealers-project-backend-flask-x2hc.onrender.com/cars/${carId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            onDeleteCar(carId); // Remove the car from the list in the frontend
          } else {
            alert("Failed to delete car.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error deleting car.");
        });
    }
  };

  return (
    <section className="container">
      <div className="cars-list">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <h3>{car.name}</h3>
            <img src={car.picture_url} alt={car.name} className="car-image" />
            
            {/* Display Features */}
            <h4>Features:</h4>
            <ul>
              {car.features && car.features.length > 0 ? (
                car.features.map((feature) => (
                  <li key={feature.id}>{feature.name}</li>
                ))
              ) : (
                <li>No features assigned</li>
              )}
            </ul>

            {/* Edit and Delete Buttons */}
            <Link to={`/cars/${car.id}/edit`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => handleDelete(car.id)} className="delete-button">
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CarList;
