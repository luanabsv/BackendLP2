import { Router } from "express";
import FornecedorCtrl from "../controle/fornecedorCtrl.js";

const fornCtrl = new FornecedorCtrl();
const rotaFornecedor = new Router();

rotaProduto
.get('/', fornCtrl.consultar)
.get('/:termo', fornCtrl.consultar)
.post('/', fornCtrl.gravar)
.patch('/', fornCtrl.alterar)
.put('/', fornCtrl.alterar)
.delete('/', fornCtrl.excluir);

export default rotaFornecedor;