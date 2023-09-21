import React, { useState, useEffect } from "react";
import "./Card.scss";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import DescriptionIcon from "@mui/icons-material/Description";
import modifyMessageTemplate from "../middlewares/modifyMessage";
import copy from "clipboard-copy";
import axios from "axios";

function Card({ formData, onDelete }) {
  const [messageTemplate, setMessageTemplate] = useState(``);
  const { codigoNumerico, nombreSolicitante, day, month, year, hour, minute } =
    formData;
  useEffect(() => {
    setMessageTemplate(
      modifyMessageTemplate(formData).replace(/(<([^>]+)>)/gi, "")
    );
  }, [formData]);

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hour}:${minute}`;

  const copyData = () => {
    copy(messageTemplate);
    alert("Texto copiado exitosamente");
  };

  const generateWordDocument = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/generate-word",
        formData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `Orden Nº${formData.codigoNumerico} de Permanencia.docx`
      );
      document.body.appendChild(link);
      link.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error generating Word document:", error);
    }
  };

  return (
    <div className="card">
      <button className="delete-button" onClick={() => onDelete(formData)}>
        X
      </button>
      <h2>Informacion de Orden</h2>
      <p>
        <strong>Codigo:</strong> {codigoNumerico}
      </p>
      <p>
        <strong>Solicitante:</strong> {nombreSolicitante}
      </p>
      <p>
        <strong>Fecha:</strong> {formattedDate}
      </p>
      <p>
        <strong>Hora:</strong> {formattedTime}
      </p>
      <div className="button-section">
        <button className="card_button" onClick={copyData}>
          <FileCopyIcon /> Copiar
        </button>
        <button className="card_button" onClick={generateWordDocument}>
          <DescriptionIcon /> Word
        </button>
      </div>
      {/*<p>{messageTemplate}</p>*/}
    </div>
  );
}

export default Card;
