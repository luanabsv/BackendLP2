import CategoriaDAO from "../persistencia/categoriaDAO.js";

export default class Categoria {
    #codigo
    #descricao

    constructor(codigo=0, descricao='') {
        this.#codigo = codigo;
        this.descricao = descricao;
    }

    get codigo() {
        return this.#codigo;
    }

    set codigo(novoCodigo) {
        this.#codigo = novoCodigo;
    }

    get descricao() {
        return this.#descricao;
    }

    set descricao(novaDescricao) {
        this.#descricao = novaDescricao;
    }

    toJSON() {
        return {
            codigo: this.#codigo,
            descricao: this.#descricao
        }
    }

    async gravar() {
        const catDAO = new CategoriaDAO();
        await catDAO.gravar(this);
    }

    async excluir() {
        const catDAO = new CategoriaDAO();
        await catDAO.excluir(this);
    }

    async alterar() {
        const catDAO = new CategoriaDAO();
        await catDAO.alterar(this);
    }

    async consultar(parametro) {
        const catDAO = new CategoriaDAO();
        return await catDAO.consultar(parametro);
    }

}