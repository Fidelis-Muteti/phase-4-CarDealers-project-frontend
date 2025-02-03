import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarForm from "./CarForm";
import CarList from "./CarList";  // Import CarList

function Dealer() {
  const [{ data: dealer, error, status }, setDealer] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://phase-4-cardealers-project-backend-flask-x2hc.onrender.com/dealers/${id}`)
      .then((r) => {
        if (r.ok) {
          r.json().then((dealerData) =>
            setDealer({ data: dealerData, error: null, status: "resolved" })
          );
        } else {
          r.json().then((err) =>
            setDealer({ data: null, error: err.error, status: "rejected" })
          );
        }
      });
  }, [id]);

  function handleAddCar(newCar) {
    setDealer({
      data: {
        ...dealer,
        cars: [...dealer.cars, newCar],
      },
      error: null,
      status: "resolved",
    });
  }

  if (status === "pending") return <h1>Loading...</h1>;
  if (status === "rejected") return <h1>Error: {error.error}</h1>;

  return (
    <section className="container">
      <div className="card">
        <h1>{dealer.name}</h1>
        <p>{dealer.address}</p>
      </div>

      {/* Render CarList component */}
      <CarList cars={dealer.cars} />

      <div className="card">
        <h3>Add New Car</h3>
        <CarForm dealerId={dealer.id} onAddCar={handleAddCar} />
      </div>
    </section>
  );
}

export default Dealer;
