import conectar from "./conexao.js";
import Cliente from "../modelo/cliente.js";

export default class ClienteDAO {
    async gravar(cliente) {
        if (cliente instanceof Cliente) {
            const sql = "INSERT INTO cliente(cpf, nome, endereco, numero, bairro, cidade, uf, cep, telefone, genero) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const parametros = [
                cliente.cpf,
                cliente.nome,
                cliente.endereco,
                cliente.numero,
                cliente.bairro,
                cliente.cidade,
                cliente.uf,
                cliente.cep,
                cliente.telefone,
                cliente.genero
            ];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            cliente.id = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(cliente) {
        if (cliente instanceof Cliente) {
            const sql = "DELETE FROM cliente WHERE cpf = ?";
            const parametros = [cliente.cpf];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async alterar(cliente) {
        if (cliente instanceof Cliente) {
            const sql = "UPDATE cliente SET nome = ?, endereco = ?, numero = ?, bairro = ?, cidade = ?, uf = ?, cep = ?, telefone = ?, genero = ? WHERE cpf = ?";
            const parametros = [
                cliente.nome,
                cliente.endereco,
                cliente.numero,
                cliente.bairro,
                cliente.cidade,
                cliente.uf,
                cliente.cep,
                cliente.telefone,
                cliente.genero,
                cliente.cpf
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
            sql = 'SELECT * FROM cliente WHERE cpf = ?';
            parametros = [parametroConsulta];
        } else {
            if (!parametroConsulta) {
                parametroConsulta = '';
            } else {
                sql = 'SELECT * FROM cliente WHERE nome LIKE ?';
                parametros = ['%' + parametroConsulta + '%'];
            }
        }

        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaClientes = [];
        for (const registro of registros) {
            const cliente = new Cliente(
                registro.cpf,
                registro.nome,
                registro.endereco,
                registro.numero,
                registro.bairro,
                registro.cidade,
                registro.uf,
                registro.cep,
                registro.telefone,
                registro.genero
            );
            listaClientes.push(cliente);
        }

        return listaClientes;
    }
}
