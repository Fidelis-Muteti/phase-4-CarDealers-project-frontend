import { useState, useEffect } from "react";

function FeaturesForm({ selectedFeatures, setSelectedFeatures }) {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch("https://phase-4-cardealers-project-backend-flask-x2hc.onrender.com/features")
      .then((r) => r.json())
      .then(setFeatures);
  }, []);

  function handleFeatureChange(e) {
    const { value, checked } = e.target;
    const featureId = parseInt(value);

    setSelectedFeatures((prevFeatures) =>
      checked ? [...prevFeatures, featureId] : prevFeatures.filter((id) => id !== featureId)
    );
  }

  return (
    <fieldset>
      <legend>Features:</legend>
      {features.map((feature) => (
        <div key={feature.id}>
          <input
            type="checkbox"
            id={`feature-${feature.id}`}
            value={feature.id}
            checked={selectedFeatures.includes(feature.id)}
            onChange={handleFeatureChange}
          />
          <label htmlFor={`feature-${feature.id}`}>{feature.name}</label>
        </div>
      ))}
    </fieldset>
  );
}

export default FeaturesForm;
