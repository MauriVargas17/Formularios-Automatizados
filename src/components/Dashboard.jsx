import React, { useState } from "react";
import Form from "./Form";
import Card from "./Card";
import "../scss/buttons.scss";
import "./Dashboard.scss";
import Logo from "../assets/logo.png";

function Dashboard() {
  const [formDataArray, setFormDataArray] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const addFormData = (data) => {
    setFormDataArray((prevDataArray) => [...prevDataArray, data]);
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm); // Toggle form visibility
  };

  const handleDeleteCard = (dataToDelete) => {
    setFormDataArray((prevDataArray) =>
      prevDataArray.filter((data) => data !== dataToDelete)
    );
  };

  return (
    <div className="dashboard">
      {showForm ? (
        <Form onSubmit={addFormData} onCancel={toggleFormVisibility} />
      ) : (
        <>
          {" "}
          <img
            src={Logo} // Replace with the path to your logo image
            alt="Logo"
            className="logo"
          />
          <h1>Creador de Ordenes</h1>
          <button className="edv_button" onClick={toggleFormVisibility}>
            Nueva Orden
          </button>
          {/* Conditional rendering of the Form component */}
          {}
          {/* Display the form data received from the form */}
          <div>
            <h2>Ordenes creadas:</h2>
            <ul>
              {formDataArray.map((data, index) => (
                <li key={index}>
                  <Card formData={data} onDelete={handleDeleteCard} />
                  {/* Render each data item here */}
                  {/* Example: {data.fieldName}: {data.fieldValue} */}
                </li>
              ))}
            </ul>
          </div>{" "}
        </>
      )}
    </div>
  );
}

export default Dashboard;
