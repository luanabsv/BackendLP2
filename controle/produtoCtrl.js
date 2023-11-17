import Produto from "../modelo/produto.js";

export default class ProdutoCtrl {

    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        try {
            if (requisicao.method === 'POST' && requisicao.is('application/json')) {
                const dados = requisicao.body;
                const codigo = dados.codigo;
                const descricao = dados.descricao;
                const precoCusto = dados.precoCusto;
                const precoVenda = dados.precoVenda;
                const dataValidade = dados.dataValidade;
                const qtdEstoque = dados.qtdEstoque;
                const categoria = dados.categoria;

                if (codigo && descricao && precoCusto && precoVenda && dataValidade && qtdEstoque && categoria) {
                    const produto = new Produto(
                        codigo,
                        descricao,
                        precoCusto,
                        precoVenda,
                        dataValidade,
                        qtdEstoque,
                        categoria
                    );

                    await produto.gravar();

                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Produto cadastrado com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Por favor, informe todos os campos obrigatórios do produto"
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, utilize o método POST para cadastrar um produto!"
                });
            }
        } catch (erro) {
            resposta.status(500).json({
                "status": false,
                "mensagem": "Erro ao cadastrar produto: " + erro.message
            });
        }
    }

    async alterar(requisicao, resposta) {
        resposta.type('application/json');
        try {
            if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
                const dados = requisicao.body;
                const codigo = dados.codigo;
                const descricao = dados.descricao;
                const precoCusto = dados.precoCusto;
                const precoVenda = dados.precoVenda;
                const dataValidade = dados.dataValidade;
                const qtdEstoque = dados.qtdEstoque;
                const categoria = dados.categoria;

                if (codigo && descricao && precoCusto && precoVenda && dataValidade && qtdEstoque && categoria) {
                    const produto = new Produto(
                        codigo,
                        descricao,
                        precoCusto,
                        precoVenda,
                        dataValidade,
                        qtdEstoque,
                        categoria
                    );

                    await produto.alterar();

                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Produto alterado com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Por favor, informe todos os campos obrigatórios do produto"
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um produto!"
                });
            }
        } catch (erro) {
            resposta.status(500).json({
                "status": false,
                "mensagem": "Erro ao atualizar produto: " + erro.message
            });
        }
    }

    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        try {
            if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
                const dados = requisicao.body;
                const codigo = dados.codigo;

                if (codigo) {
                    const produto = new Produto(codigo);

                    await produto.excluir();

                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Produto excluído com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Por favor, informe o código do produto a ser excluído"
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, utilize o método DELETE para excluir um produto!"
                });
            }
        } catch (erro) {
            resposta.status(500).json({
                "status": false,
                "mensagem": "Erro ao excluir produto: " + erro.message
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const produto = new Produto();
            produto.consultar(termo).then((listaProdutos)=>{
                resposta.json(
                    {
                        status:true,
                        listaProdutos
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter aos produtos: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar produtos!"
            });
        }
    }
}
