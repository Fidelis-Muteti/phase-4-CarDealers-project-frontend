import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FeaturesForm from "./FeaturesForm"; // Import FeaturesForm component

function CarForm({ onAddCar, onEditCar, onDeleteCar }) {
  // Local state for form fields and error handling
  const [dealers, setDealers] = useState([]);
  const [allFeatures, setAllFeatures] = useState([]); // NEW: store full list of features
  const [carName, setCarName] = useState("");
  const [dealerId, setDealerId] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [formErrors, setFormErrors] = useState([]);

  const navigate = useNavigate();
  const { carId: paramCarId } = useParams(); // Get carId from URL if editing an existing car

  // Fetch all dealers to populate the dropdown menu
  useEffect(() => {
    fetch("https://phase-4-cardealers-project-backend-flask-x2hc.onrender.com/dealers")
      .then((r) => r.json())
      .then(setDealers)
      .catch((error) => console.error("Error fetching dealers:", error));
  }, []);

  // Fetch all features (needed to reconstruct feature objects later)
  useEffect(() => {
    fetch("https://phase-4-cardealers-project-backend-flask-x2hc.onrender.com/features")
      .then((r) => r.json())
      .then(setAllFeatures)
      .catch((error) => console.error("Error fetching features:", error));
  }, []);

  // If editing an existing car, fetch its details to prefill the form
  useEffect(() => {
    if (paramCarId) {
      fetch(`https://phase-4-cardealers-project-backend-flask-x2hc.onrender.com/cars/${paramCarId}`)
        .then((r) => r.json())
        .then((car) => {
          setCarName(car.name);
          setDealerId(car.dealer_id);
          setPictureUrl(car.picture_url || "");
          // Here we assume car.features is an array of feature objects
          setSelectedFeatures(car.features.map((feature) => feature.id));
        })
        .catch((error) => console.error("Error fetching car details:", error));
    }
  }, [paramCarId]);

  // Handle form submission for adding or editing a car
  function handleSubmit(e) {
    e.preventDefault();

    const formData = {
      name: carName,
      dealer_id: dealerId,
      picture_url: pictureUrl,
      feature_ids: selectedFeatures, // send only the IDs to the backend
    };

    const url = paramCarId
      ? `https://phase-4-cardealers-project-backend-flask-x2hc.onrender.com/cars/${paramCarId}`
      : "https://phase-4-cardealers-project-backend-flask-x2hc.onrender.com/cars";
    const method = paramCarId ? "PATCH" : "POST";

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((car) => {
          if (paramCarId) {
            // In edit mode, use the onEditCar callback directly.
            onEditCar && onEditCar(car);
          } else {
            // In add mode, if the returned car doesn't include its feature objects,
            // manually attach them from allFeatures using the selected feature IDs.
            if (!car.features || car.features.length === 0) {
              car.features = allFeatures.filter((feature) =>
                selectedFeatures.includes(feature.id)
              );
            }
            onAddCar && onAddCar(car);
            // Clear the form fields after adding a new car
            setCarName("");
            setDealerId("");
            setPictureUrl("");
            setSelectedFeatures([]);
          }
          setFormErrors([]);
          // Navigate to the dealer's page (adjust if necessary)
          navigate(`/dealers/${dealerId}`);
        });
      } else {
        r.json().then((err) =>
          setFormErrors(err.errors || ["An error occurred"])
        );
      }
    });
  }

  // Handler for deleting a car
  function handleDelete(e) {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    fetch(`https://phase-4-cardealers-project-backend-flask-x2hc.onrender.com/cars/${paramCarId}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          onDeleteCar && onDeleteCar(paramCarId);
          navigate(`/dealers/${dealerId}`);
        } else {
          r.json().then((err) =>
            setFormErrors(err.errors || ["Failed to delete car"])
          );
        }
      })
      .catch((error) => console.error("Error deleting car:", error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{paramCarId ? "Edit Car" : "Add Car"}</h2>

      <label htmlFor="car_name">Car Name:</label>
      <input
        id="car_name"
        name="name"
        type="text"
        value={carName}
        onChange={(e) => setCarName(e.target.value)}
      />

      <label htmlFor="dealer_id">Dealer:</label>
      <select
        id="dealer_id"
        name="dealer_id"
        value={dealerId}
        onChange={(e) => setDealerId(e.target.value)}
      >
        <option value="">Select a dealer</option>
        {dealers.map((dealer) => (
          <option key={dealer.id} value={dealer.id}>
            {dealer.name}
          </option>
        ))}
      </select>

      <label htmlFor="picture_url">Car Picture URL:</label>
      <input
        id="picture_url"
        name="picture_url"
        type="text"
        value={pictureUrl}
        onChange={(e) => setPictureUrl(e.target.value)}
      />

      {/* Features selection form */}
      <FeaturesForm
        selectedFeatures={selectedFeatures}
        setSelectedFeatures={setSelectedFeatures}
      />

      {/* Display any form errors */}
      {formErrors.length > 0 &&
        formErrors.map((err, index) => (
          <p key={index} style={{ color: "red" }}>
            {err}
          </p>
        ))}

      <button type="submit">
        {paramCarId ? "Update Car" : "Add Car"}
      </button>

      {/* Show Delete button only if editing an existing car */}
      {paramCarId && (
        <button
          type="button"
          onClick={handleDelete}
          style={{
            backgroundColor: "#e74c3c",
            color: "#fff",
            marginLeft: "10px",
          }}
        >
          Delete Car
        </button>
      )}
    </form>
  );
}

export default CarForm;
