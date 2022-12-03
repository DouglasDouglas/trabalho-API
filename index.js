const express = require ("express");
// fake database
let contratos = [];
// criar o app
const app = express ();

app.use (express.json());

app.post ("/contratos", (req, res) => {
    const {id, cod_contrato, id_cliente, data_contrato, status, diret_contrato} = req.body;
    const contrato_de_aluguel = {id, cod_contrato, id_cliente, data_contrato, status, diret_contrato};
    contratos.push (contrato_de_aluguel);
    return res.status (201).json (contrato_de_aluguel);
});

app.get ("/contratos", (req, res) => {
    const allcontratos = contratos;
    return res.status (200).json (allcontratos);
});

app.get ("/contratos/:contrato_de_aluguel_id", (req, res) => {
    const {contrato_de_aluguel_id} = req.params;
    const contrato_de_aluguel = contratos.find ((contrato_de_aluguel) => contrato_de_aluguel.id === contrato_de_aluguel_id);
    if (!contrato_de_aluguel) res.status(404).json ("contrato nao existe");
    return res.status(200).json (contrato_de_aluguel);
});

app.delete ("/contratos/ :contrato_de_aluguel_id", (req, res) => {
    const {contrato_de_aluguel_id} = req.params;
    const filteredcontratos = contratos.filter ((contrato_de_aluguel) => contrato_de_aluguel.allcontratos.id !== contrato_de_aluguel_id);
    contratos = filteredcontratos;
    return res.status(204).json ("deleted");
});
// funçao para modifica contrato

app.patch ("/contratos/ :contrato_de_aluguel_id", (req, res) => {
    const {id_cliente, data_contrato, status, diret_contrato } = req.body;
    const {contrato_de_aluguel_id} = req.params;
    const contrato_de_aluguel = contratos.find (contrato_de_aluguel =>contrato_de_aluguel.id === contrato_de_aluguel_id);
    contrato_de_aluguel.id = contrato_de_aluguel.id;
    contrato_de_aluguel.id_cliente = id_cliente ? id_cliente : contrato_de_aluguel.id_cliente;
    contrato_de_aluguel.data_contrato = data_contrato ? data_contrato : contrato_de_aluguel.data_contrato;
    contrato_de_aluguel.status = status ? status : contrato_de_aluguel.status;
    contrato_de_aluguel.diret_contrato = diret_contrato ? diret_contrato : contrato_de_aluguel.diret_contrato;
    return res.status(200).json(contrato_de_aluguel);  
});

// mandar o servidor rodar
app.listen (3333, () => console.log ("server is running"));