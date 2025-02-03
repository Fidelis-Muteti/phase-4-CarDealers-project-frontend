import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CarForm from "./CarForm";

function Home() {
  const [dealers, setDealers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://phase-4-cardealers-project-backend-flask-x2hc.onrender.com/dealers")
      .then((r) => r.json())
      .then(setDealers);
  }, []);

  const filteredDealers = dealers.filter((dealer) =>
    dealer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="container">
      <div className="dealers-header">
        <h1>Car Dealers</h1>
      </div>

      {/* Add Car Form */}
      <CarForm />

      <div className="dealers-list">
        {filteredDealers.length === 0 ? (
          <p>No dealers available.</p>
        ) : (
          filteredDealers.map((dealer) => (
            <div key={dealer.id} className="dealer-card">
              <h2>
                <Link to={`/dealers/${dealer.id}`}>{dealer.name}</Link>
              </h2>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Home;
