import { Router } from "express";
import ProdutoCtrl from "../controle/produtoCtrl.js";

const prodCtrl = new ProdutoCtrl();
const rotaProduto = new Router();

rotaProduto
.get('/', prodCtrl.consultar)
.get('/:termo', prodCtrl.consultar)
.post('/', prodCtrl.gravar)
.patch('/', prodCtrl.alterar)
.put('/', prodCtrl.alterar)
.delete('/', prodCtrl.excluir);

export default rotaProduto;