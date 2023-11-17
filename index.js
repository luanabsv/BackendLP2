import express from 'express';
import rotaCategoria from './rotas/rotasCategoria.js';
import rotaProduto from './rotas/rotasProduto.js';
import rotaFornecedor from './rotas/rotasFornecedor.js';
import rotaCliente from './rotas/rotasCliente.js';

const host = "localhost";
const porta = 4000;
//aplicação HTTP pronta, bastando parametrizá-la
const app = express();
//preparar a app para entender o formato JSON
app.use(express.json());
app.use('/categoria',rotaCategoria);
app.use('/produto',rotaProduto);
app.use('/cliente',rotaCliente);
app.use('/fornecedor',rotaFornecedor);

app.listen(porta,host, ()=>{
    console.log(`API do sistema em execução: ${host}:${porta}`);
});