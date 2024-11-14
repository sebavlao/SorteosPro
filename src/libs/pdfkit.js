const PDFDocument = require("pdfkit");

const aclaracion =
  "Aclaración: antes de otorgar el dinero correspondiente, basándose en los datos proporcionados en el papel, es necesario verificar la existencia de la persona que se ha ganado este sorteo. Esto implica confirmar su identidad y cualquier otra información relevante asociada para poder llevar acabo la entrega del premio. Es importante realizar estas verificaciones para garantizar la legitimidad y transparencia en los datos entregados por el usuario plasmado.";

const campos = [
  "ID:",
  "DNI:",
  "Nombre:",
  "Apellido:",
  "Fecha de nacimiento:",
  "Correo:",
];

const margin = 80;

const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const generatePdf = (dataCallback, endCallback, datos) => {
  const fecha = new Date();
  const [dia, mes, anio] = [
    fecha.getDate(),
    meses[fecha.getMonth()],
    fecha.getFullYear(),
  ];

  const doc = new PDFDocument({
    margin: margin,
  });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  doc.font("Helvetica");

  doc.save();

  doc
    .moveTo(doc.x - 5, doc.y)
    .lineTo(doc.page.width - (margin - 5), doc.y)
    .strokeColor("#BFBFBF")
    .stroke();

  doc.moveDown(1.2);

  let [positionX, positionY] = [doc.x, doc.y];

  doc.text(`${dia} de ${mes} de ${anio}`);

  doc.text("Sorteo - @sebavlao", positionX + 156, positionY);

  doc.moveDown(0.8);

  doc
    .moveTo(positionX - 5, doc.y)
    .lineTo(doc.page.width - (margin - 5), doc.y)
    .stroke();

  doc.restore();

  doc.x = positionX + 20;
  doc.y = positionY;

  doc.moveDown(4);

  positionX = doc.x;
  positionY = doc.y;

  doc.save();

  doc
    .circle(doc.x - 20, doc.y + 10, 3)
    .fill("#009EE2")
    .stroke();

  doc
    .moveTo(doc.x - 20, doc.y + 12)
    .lineTo(doc.x - 20, doc.y + 165)
    .strokeColor("#BFBFBF")
    .stroke();

  doc
    .circle(doc.x - 20, doc.y + 165, 3)
    .fill("#009EE2")
    .stroke();

  doc.restore();

  doc.fontSize(13);

  campos.forEach((campo) => {
    doc.text(campo, { width: 100 }).moveDown(1);
  });

  doc.font("Helvetica-Bold");

  doc.text(datos.id, positionX + 100, positionY - 2).moveDown(1);

  doc.text(datos.dni).moveDown(1);

  doc.text(datos.nombre).moveDown(1);

  doc.text(datos.apellido).moveDown(1.4);

  doc.text(datos.nacimiento).moveDown(1.4);

  doc.text(datos.email).moveDown(1);

  doc.moveDown(3);

  positionX = doc.x;
  positionY = doc.y;

  const totalText = `$ ${datos.mount}`;
  const longitudTotal = doc.widthOfString(totalText);

  doc.text("Total: ", doc.x + 100, doc.y);

  doc.text(totalText, positionX + 150, positionY);

  doc.save();

  doc
    .circle(positionX + 110, doc.y + 10, 3)
    .fill("#FF4476")
    .stroke();

  doc
    .moveTo(positionX + 112, doc.y + 10)
    .lineTo(doc.x + (longitudTotal - 10), doc.y + 10)
    .strokeColor("#BFBFBF")
    .stroke();

  doc
    .circle(doc.x + (longitudTotal - 10), doc.y + 10, 3)
    .fill("#FF4476")
    .stroke();

  doc.restore();

  doc.moveDown(4);

  doc.text(aclaracion, positionX - 120, doc.y, { lineGap: 3 });
  doc.end();
};

module.exports = generatePdf;
