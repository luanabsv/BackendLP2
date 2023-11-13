import conectar from "./conexao.js";
import Fornecedor from "../modelo/fornecedor.js";

export default class FornecedorDAO {
    async gravar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const sql = "INSERT INTO fornecedor(cnpj, nome, endereco, telefone, email) VALUES (?, ?, ?, ?, ?)";
            const parametros = [
                fornecedor.cnpj,
                fornecedor.nome,
                fornecedor.endereco,
                fornecedor.telefone,
                fornecedor.email
            ];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            fornecedor.id = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const sql = "DELETE FROM fornecedor WHERE cnpj = ?";
            const parametros = [fornecedor.cnpj];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async alterar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const sql = "UPDATE fornecedor SET nome = ?, endereco = ?, telefone = ?, email = ? WHERE cnpj = ?";
            const parametros = [
                fornecedor.nome,
                fornecedor.endereco,
                fornecedor.telefone,
                fornecedor.email,
                fornecedor.cnpj
            ];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros = [];

        if (!isNaN(parseInt(parametroConsulta))) {
            sql = 'SELECT * FROM fornecedor WHERE cnpj = ?';
            parametros = [parametroConsulta];
        } else {
            if (!parametroConsulta) {
                parametroConsulta = '';
            } else {
                sql = 'SELECT * FROM fornecedor WHERE nome LIKE ?';
                parametros = ['%' + parametroConsulta + '%'];
            }
        }

        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaFornecedores = [];
        for (const registro of registros) {
            const fornecedor = new Fornecedor(
                registro.cnpj,
                registro.nome,
                registro.endereco,
                registro.telefone,
                registro.email
            );
            listaFornecedores.push(fornecedor);
        }

        return listaFornecedores;
    }
}
