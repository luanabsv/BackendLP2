import conectar from "./conexao.js";
import Fornecedor from "../modelo/fornecedor.js";

export default class FornecedorDAO {
    async gravar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const sql = "INSERT INTO fornecedor(forn_cnpj, forn_nome, forn_endereco, forn_telefone, forn_email) VALUES (?, ?, ?, ?, ?)";
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
            const sql = "DELETE FROM fornecedor WHERE forn_cnpj = ?";
            const parametros = [fornecedor.cnpj];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async alterar(fornecedor) {
        if (fornecedor instanceof Fornecedor) {
            const sql = "UPDATE fornecedor SET forn_nome = ?, forn_endereco = ?, forn_telefone = ?, forn_email = ? WHERE forn_cnpj = ?";
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
            sql = 'SELECT * FROM fornecedor WHERE forn_cnpj = ?';
            parametros = [parametroConsulta];
        } else {
            if (!parametroConsulta) {
                parametroConsulta = '';
                sql="SELECT * FROM fornecedor"
            } else {
                sql = 'SELECT * FROM fornecedor WHERE forn_nome LIKE ?';
                parametros = ['%' + parametroConsulta + '%'];
            }
        }

        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaFornecedores = [];
        for (const registro of registros) {
            const fornecedor = new Fornecedor(
                registro.forn_cnpj,
                registro.forn_nome,
                registro.forn_endereco,
                registro.forn_telefone,
                registro.forn_email
            );
            listaFornecedores.push(fornecedor);
        }

        return listaFornecedores;
    }
}
