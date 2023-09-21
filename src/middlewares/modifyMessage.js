// const messageTemplates = {
//   1: `FORMULARIO ORDEN DE PERMANENCIA N°{codigoNumerico} Estimado {nombreSolicitante}, Buenos días, por instrucciones del Oficial de Riesgos, a través del presente le solicito su colaboración con el “FORMULARIO DE PERMANENCIA EN OFICINAS FUERA DEL HORARIO NORMAL”, el mismo debe ser llenado, firmado (con las firmas del solicitante y del gerente de área) y entregado/enviado al Oficial de Riesgos, el formulario adjunto corresponde a la fecha {fecha} y el código asignado es el Nº{codigoNumerico}. Aprovechamos la oportunidad para recordarle que las órdenes de permanencia según la Circular-AF-No.03-2023 se realizan cuando el personal se encuentra en oficinas posterior a las 20:30 hrs. De antemano muchas gracias, Saludos cordiales, `,
//   2: "FORMULARIO ORDEN DE PERMANENCIA N°{codigoNumerico} Estimado {nombreSolicitante}, Buenos días, por instrucciones del Oficial de Riesgos, a través del presente le solicito su colaboración con el “FORMULARIO DE PERMANENCIA EN OFICINAS FUERA DEL HORARIO NORMAL”, el mismo debe ser llenado, firmado (con las firmas del solicitante y del gerente de área) y entregado/enviado al Oficial de Riesgos, el formulario adjunto corresponde a la fecha {fecha} y el código asignado es el Nº{codigoNumerico}. Se deben incluir a las siguientes personas en su lista: {integrantes} Aprovechamos la oportunidad para recordarle que las órdenes de permanencia según la Circular-AF-No.03-2023 se realizan cuando el personal se encuentra en oficinas posterior a las 20:30 hrs. De antemano muchas gracias, Saludos cordiales, ",
//   3: "FORMULARIO ORDEN DE PERMANENCIA N°{codigoNumerico} Estimado {nombreSolicitante}, Buenos días, por instrucciones del Oficial de Riesgos, a través del presente le solicito su colaboración con el “FORMULARIO DE PERMANENCIA EN OFICINAS FUERA DEL HORARIO NORMAL”, el mismo debe ser llenado, firmado (con las firmas del solicitante y del gerente de área) y entregado/enviado al Oficial de Riesgos, el formulario adjunto corresponde a la fecha {fecha} y el código asignado es el Nº{codigoNumerico}. Se añadió al mensajero en turno para la activación de sistema de seguridad. Aprovechamos la oportunidad para recordarle que las órdenes de permanencia según la Circular-AF-No.03-2023 se realizan cuando el personal se encuentra en oficinas posterior a las 20:30 hrs. De antemano muchas gracias, Saludos cordiales, ",
// };

import messageTemplates from "../assets/constants/messageTemplates";

function modifyMessageTemplate(data) {
  let messageChosen;

  if (data.esMensajero) {
    messageChosen = 3;
  } else if (data.integrantes && data.integrantes.length > 0) {
    messageChosen = 2;
  } else {
    messageChosen = 1;
  }

  let template = messageTemplates[messageChosen];

  template = template.replace(
    "{prefijo}",
    data.prefijoSolicitante === "Sra." || data.prefijoSolicitante === "Srta."
      ? "a"
      : "o"
  );
  template = template.replace(
    "{nombreSolicitante}",
    data.nombreSolicitante.split(" ")[0]
  );
  template = template.replace(/{codigoNumerico}/g, data.codigoNumerico);
  template = template.replace(
    "{fecha}",
    `${data.day}/${data.month}/${data.year}`
  );
  template = template.replace("{hora}", `${data.hour}:${data.minute}`);
  template = template.replace(
    "{integrantes}",
    data.integrantes.map((value) => `\n - ${value}`)
  );

  return template;
}

export default modifyMessageTemplate;
