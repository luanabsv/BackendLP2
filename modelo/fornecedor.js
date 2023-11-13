export default class Fornecedor {
    #cnpj
    #nome
    #endereco
    #telefone
    #email

    constructor(cnpj = '', nome = '', endereco = '', telefone = '', email = '') {
        this.#cnpj = cnpj;
        this.#nome = nome;
        this.#endereco = endereco;
        this.#telefone = telefone;
        this.#email = email;
    }

    get cnpj() {
        return this.#cnpj;
    }

    set cnpj(novoCnpj) {
        this.#cnpj = novoCnpj;
    }

    get nome() {
        return this.#nome;
    }

    set nome(novoNome) {
        this.#nome = novoNome;
    }

    get endereco() {
        return this.#endereco;
    }

    set endereco(novoEndereco) {
        this.#endereco = novoEndereco;
    }

    get telefone() {
        return this.#telefone;
    }

    set telefone(novoTelefone) {
        this.#telefone = novoTelefone;
    }

    get email() {
        return this.#email;
    }

    set email(novoEmail) {
        this.#email = novoEmail;
    }

    toJSON() {
        return {
            cnpj: this.#cnpj,
            nome: this.#nome,
            endereco: this.#endereco,
            telefone: this.#telefone,
            email: this.#email,
        };
    }

    async gravar() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.gravar(this);
    }

    async excluir() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.excluir(this);
    }

    async alterar() {
        const fornecedorDAO = new FornecedorDAO();
        await fornecedorDAO.alterar(this);
    }

    async consultar(parametro) {
        const fornecedorDAO = new FornecedorDAO();
        return await fornecedorDAO.consultar(parametro);
    }
}
