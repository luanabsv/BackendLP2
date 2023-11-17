import Fornecedor from "../modelo/fornecedor.js";

export default class FornecedorCtrl {

    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        try {
            if (requisicao.method === 'POST' && requisicao.is('application/json')) {
                const dados = requisicao.body;
                const cnpj = dados.cnpj;
                const nome = dados.nome;
                const endereco = dados.endereco;
                const telefone = dados.telefone;
                const email = dados.email;

                if (cnpj && nome) {
                    const fornecedor = new Fornecedor(
                        cnpj,
                        nome,
                        endereco || '',
                        telefone || '',
                        email || ''
                    );

                    await fornecedor.gravar();

                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Fornecedor cadastrado com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Por favor, informe CNPJ e nome do fornecedor"
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, utilize o método POST para cadastrar um fornecedor!"
                });
            }
        } catch (erro) {
            resposta.status(500).json({
                "status": false,
                "mensagem": "Erro ao cadastrar fornecedor: " + erro.message
            });
        }
    }

    async alterar(requisicao, resposta) {
        resposta.type('application/json');
        try {
            if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
                const dados = requisicao.body;
                const cnpj = dados.cnpj;
                const nome = dados.nome;
                const endereco = dados.endereco;
                const telefone = dados.telefone;
                const email = dados.email;

                if (cnpj && nome) {
                    const fornecedor = new Fornecedor(
                        cnpj,
                        nome,
                        endereco || '',
                        telefone || '',
                        email || ''
                    );

                    await fornecedor.alterar();

                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Fornecedor alterado com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Por favor, informe CNPJ e nome do fornecedor"
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um fornecedor!"
                });
            }
        } catch (erro) {
            resposta.status(500).json({
                "status": false,
                "mensagem": "Erro ao atualizar fornecedor: " + erro.message
            });
        }
    }

    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        try {
            if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
                const dados = requisicao.body;
                const cnpj = dados.cnpj;

                if (cnpj) {
                    const fornecedor = new Fornecedor(cnpj);

                    await fornecedor.excluir();

                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Fornecedor excluído com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Por favor, informe o CNPJ do fornecedor a ser excluído"
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, utilize o método DELETE para excluir um fornecedor!"
                });
            }
        } catch (erro) {
            resposta.status(500).json({
                "status": false,
                "mensagem": "Erro ao excluir fornecedor: " + erro.message
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
            const fornecedor = new Fornecedor();
            fornecedor.consultar(termo).then((listaFornecedores)=>{
                resposta.json(
                    {
                        status:true,
                        listaFornecedores
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter os fornecedores: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar fornecedores!"
            });
        }
    }
}
