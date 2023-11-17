import { Router } from "express";
import ClienteCtrl from "../controle/clienteCtrl";

const cliCtrl = new ClienteCtrl();
const rotaCliente = new Router();

rotaProduto
.get('/', cliCtrl.consultar)
.get('/:termo', cliCtrl.consultar)
.post('/', cliCtrl.gravar)
.patch('/', cliCtrl.alterar)
.put('/', cliCtrl.alterar)
.delete('/', cliCtrl.excluir);

export default rotaCliente;