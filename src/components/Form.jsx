import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Chip,
  MenuItem,
} from "@mui/material";
import "./Form.scss";
import Grid from "@mui/material/Grid";
import { base_cargos } from "../constants/base_cargos";

// const initialFormData = {
//   codigoNumerico: "",
//   nombreGerencia: "",
//   prefijoSolicitante: "",
//   nombreSolicitante: "",
//   hour: "",
//   minute: "",
//   day: "",
//   month: "",
//   year: "",
//   integrantes: [],
//   esMensajero: false,
// };

const initialFormData = {
  codigoNumerico: "",
  nombreGerencia: "",
  prefijoSolicitante: "",
  nombreSolicitante: "",
  fechas: [],
  integrantes: [],
  carnets: [],
  empresas: [],
  cargos: [],
  esMensajero: false,
};

const gerencias = [
  "Auditoría Interna",
  "Gerencia de Administración y Finanzas",
  "Gerencia General",
  "Gerencia de Gestión Integral de Riesgos",
  "Gerencia Legal",
  "Gerencia de Operaciones",
  "Gerencia de Tecnología de la Información",
  "Subgerencia de Proyectos e Innovación",
];

function Formulario({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState(initialFormData);
  const [newIntegrante, setNewIntegrante] = useState("");
  const [isExternalIntegrante, setIsExternalIntegrante] = useState(false);
  const [carnet, setCarnet] = useState("");
  const [empresa, setEmpresa] = useState("");

  const handleDateChange = (event) => {
    const { name, value } = event.target;

    // Ensure that the input is numeric and within the appropriate range
    if (/^\d*$/.test(value) && value >= 1 && value <= 31) {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleMonthChange = (event) => {
    const { name, value } = event.target;

    // Ensure that the input is numeric and within the appropriate range
    if (/^\d*$/.test(value) && value >= 1 && value <= 12) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleYearChange = (event) => {
    const { name, value } = event.target;

    // Ensure that the input is numeric and within the appropriate range
    if (new Date().getFullYear() > value && /^\d*$/.test(value) && value >= 0) {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleMinutesChange = (event) => {
    const { name, value } = event.target;

    // Ensure that the input is numeric and within the appropriate range
    if (/^\d*$/.test(value) && value >= 0 && value <= 59) {
      setFormData({ ...formData, [name]: value });
    }
  };
  const handleHourChange = (event) => {
    const { name, value } = event.target;

    // Ensure that the input is numeric and within the appropriate range
    if (/^\d*$/.test(value) && value >= 0 && value <= 23) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const searchMatchInPositions = (name) => {
    for (let key in base_cargos) {
      let regex = new RegExp(key, "i");

      if (regex.test(name)) {
        return base_cargos[key];
      }
    }
    return "";
  };

  const addIntegrante = () => {
    if (newIntegrante.trim() !== "") {
      const updatedIntegrantes = [...formData.integrantes, newIntegrante];
      const updatedCarnets = [...formData.carnets, carnet];
      let empresaFinal = empresa;
      if (empresa == "") {
        empresaFinal = "EDV";
      }
      const updatedCargos = [
        ...formData.cargos,
        searchMatchInPositions(newIntegrante) || "",
      ];
      const updatedEmpresas = [...formData.empresas, empresaFinal];
      setFormData({
        ...formData,
        integrantes: updatedIntegrantes,
        carnets: updatedCarnets,
        empresas: updatedEmpresas,
        cargos: updatedCargos,
        esMensajero:
          updatedIntegrantes.length === 1 && !isExternalIntegrante
            ? formData.esMensajero
            : false,
      });
      setNewIntegrante("");
      setCarnet("");
      setEmpresa("");
    }
  };
  const handleEsMensajeroChange = (event) => {
    setFormData({
      ...formData,
      esMensajero: event.target.checked,
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIntegranteRemove = (integranteToRemove) => {
    const updatedIntegrantes = formData.integrantes.filter(
      (integrante) => integrante !== integranteToRemove
    );

    setFormData({
      ...formData,
      integrantes: updatedIntegrantes,
      esMensajero: updatedIntegrantes.length === 1 && formData.esMensajero,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);

    setFormData({});
    onCancel();
    console.log(formData);
  };

  const handleCancel = () => {
    setFormData({});
    onCancel();
  };

  const handleInternosChange = () => {
    setIsExternalIntegrante(!isExternalIntegrante);
  };

  return (
    <Paper elevation={3} className="form-container">
      <button className="close-button" onClick={handleCancel}>
        X
      </button>
      <h2 className="text-color">Orden de Permanencia</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          className="edv"
          label="Nº Orden de Permanencia"
          name="codigoNumerico"
          value={formData.codigoNumerico}
          onChange={handleInputChange}
          onInput={(e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          }}
          required
        />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Gerencia"
              name="nombreGerencia"
              select
              value={formData.nombreGerencia}
              onChange={handleInputChange}
              required
            >
              {gerencias.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Prefijo"
              name="prefijoSolicitante"
              select
              value={formData.prefijoSolicitante}
              onChange={handleInputChange}
              required
            >
              {["Sr.", "Sra.", "Srta."].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>

        <TextField
          label="Nombre del Solicitante"
          name="nombreSolicitante"
          value={formData.nombreSolicitante}
          onChange={handleInputChange}
          required
          InputProps={{ maxLength: 100 }}
        />
        {/** DATE*/}
        <div className="input-container">
          <p className="input-title">Fecha de Permanencia (DD/M/YY)</p>
          <div>
            <input
              type="text"
              name="day"
              value={formData.day}
              onChange={handleDateChange}
              placeholder="DD"
              maxLength="2"
              required
              className="date-input"
            />
            <span className="separator">/</span>
            <input
              type="text"
              name="month"
              value={formData.month}
              onChange={handleMonthChange}
              placeholder="MM"
              maxLength="2"
              required
              className="date-input"
            />
            <span className="separator">/</span>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleYearChange}
              placeholder="YYYY"
              maxLength="4"
              required
              className="date-input"
            />
          </div>
        </div>
        {/** TIME*/}
        <div className="input-container">
          <p className="input-title">Hora de Salida (HH:MM)</p>
          <div>
            <input
              type="text"
              name="hour"
              value={formData.hour}
              onChange={handleHourChange}
              placeholder="HH"
              maxLength="2"
              required
              className="time-input"
            />
            <span className="separator">:</span>
            <input
              type="text"
              name="minute"
              value={formData.minute}
              onChange={handleMinutesChange}
              placeholder="MM"
              maxLength="2"
              required
              className="time-input"
            />
          </div>
        </div>

        <TextField
          label="Integrantes (opcional)"
          name="integrantes"
          value={newIntegrante}
          onChange={(e) => setNewIntegrante(e.target.value)}
        />

        <Button
          className={`external${isExternalIntegrante ? "-true" : ""}`}
          variant="contained"
          color="primary"
          onClick={handleInternosChange}
        >
          {isExternalIntegrante ? "Externos" : "Internos"}
        </Button>

        {isExternalIntegrante ? (
          <div>
            <TextField
              label="Carnet de Identidad"
              name="carnet"
              value={carnet}
              onChange={(e) => setCarnet(e.target.value)}
            ></TextField>

            <TextField
              label="Empresa"
              name="empresa"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
            ></TextField>
          </div>
        ) : (
          <></>
        )}

        <Button className="add_button" onClick={addIntegrante}>
          Agregar Integrante
        </Button>

        <div>
          {formData.integrantes.map((integrante, index) => (
            <Chip
              key={index}
              label={integrante}
              onDelete={() => handleIntegranteRemove(integrante)}
            />
          ))}
        </div>

        {formData.integrantes.length === 0 && !isExternalIntegrante && (
          <FormControlLabel
            control={
              <Checkbox
                name="esMensajero"
                checked={formData.esMensajero}
                onChange={handleEsMensajeroChange}
              />
            }
            label="¿Es Mensajero?"
          />
        )}

        <Button
          className="edv_button"
          variant="contained"
          color="primary"
          type="submit"
          onSubmit={handleSubmit}
        >
          Crear
        </Button>
      </form>
    </Paper>
  );
}

export default Formulario;
