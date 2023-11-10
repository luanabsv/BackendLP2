import Categoria from "../modelo/categoria.js";
import conectar from "./conexao.js";

//DAO = Data Acccess Object -> Objeto de acesso aos dados
export default class CategoriaDAO {
    async gravar(categoria) {
        if (categoria instanceof Categoria) {
            const sql = "INSERT INTO categoria(cat_descricao) VALUES(?)";
            const parametros = [categoria.descricao];
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros)
            categoria.id = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(categoria) {
        if (categoria instanceof Categoria) {
            const sql = "DELETE FROM categoria WHERE cat_codigo = ?";
            const parametros = [categoria.descricao, categoria.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros)
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async alterar(categoria) {
        if (categoria instanceof Categoria) {
            const sql = "UPDATE categoria SET cat_descricao = ? WHERE cat_codigo = ?";
            const parametros = [categoria.descricao, categoria.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros)
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta) {
        let sql = '';
        let parametros=[];

        if (!isNaN(parseInt(parametroConsulta)) ) {
            sql = 'SELECT * FROM categoria WHERE cat_codigo = ? order by cat_descricao';
            parametros = [parametroConsulta];
        } else {
            if (!parametroConsulta) {
                parametroConsulta = '';
            } else {
                sql = 'SELECT * FROM categoria WHERE cat_decricao like ?'
                parametros = ['%' + parametroConsulta + '%'];
            }
        }

        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql, parametros);
        let listaCategorias = [];
        for(const registro of registros) {
            const categoria = new Categoria(registro.cat_codigo, registro.cat_descricao);
            listaCategorias.push(categoria);
        }

        return listaCategorias;
    }

}