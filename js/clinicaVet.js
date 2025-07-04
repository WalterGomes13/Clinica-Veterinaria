const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // Libera o acesso do navegador
app.use(express.json());

// ---------------------------- TUTOR ----------------------------
const tutorRoutes = require('./Routes/tutorRoutes');

app.use('/tutores' ,tutorRoutes);

// ---------------------------- ANIMAL ----------------------------
const animalRoutes = require('./Routes/animalRoutes');

app.use('/animais', animalRoutes);

// ---------------------------- CONSULTA ----------------------------
const consultaRoutes = require('./Routes/consultaRoutes');

app.use('/consultas' ,consultaRoutes);

// ---------------------------- CIRURGIA ----------------------------
const cirurgiaRoutes = require('./Routes/cirurgiaRoutes');

app.use('/cirurgias', cirurgiaRoutes);

// ---------------------------- PRODUTOS ----------------------------
const produtosRoutes = require('./Routes/estoqueRoutes');

app.use('/estoque', produtosRoutes);

// ---------------------------- VETERINÁRIO ----------------------------
const veterinariosRoutes = require('./Routes/veterinarioRoutes');

app.use('/veterinario', veterinariosRoutes);

app.listen(8080, () => {
  console.log("Servidor Express rodando em http://localhost:8080");
});


