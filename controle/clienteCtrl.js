import Cliente from "../modelo/cliente.js";

export default class ClienteCtrl {

    async gravar(requisicao, resposta) {
        resposta.type('application/json');
        try {
            if (requisicao.method === 'POST' && requisicao.is('application/json')) {
                const dados = requisicao.body;
                const cpf = dados.cpf;
                const nome = dados.nome;

                if (cpf && nome) {
                    const cliente = new Cliente(
                        cpf,
                        nome,
                        dados.endereco || '',
                        dados.numero || '',
                        dados.bairro || '',
                        dados.cidade || '',
                        dados.uf || '',
                        dados.cep || '',
                        dados.telefone || '',
                        dados.genero || ''
                    );

                    await cliente.gravar();
                    
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cliente cadastrado com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Por favor, informe CPF e nome do cliente"
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, utilize o método POST para cadastrar um cliente!"
                });
            }
        } catch (erro) {
            resposta.status(500).json({
                "status": false,
                "mensagem": "Erro ao cadastrar cliente: " + erro.message
            });
        }
    }

    async alterar(requisicao, resposta) {
        resposta.type('application/json');
        try {
            if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
                const dados = requisicao.body;
                const cpf = dados.cpf;
                const nome = dados.nome;

                if (cpf && nome) {
                    const cliente = new Cliente(
                        cpf,
                        nome,
                        dados.endereco,
                        dados.numero,
                        dados.bairro,
                        dados.cidade,
                        dados.uf,
                        dados.cep,
                        dados.telefone,
                        dados.genero
                    );

                    await cliente.alterar();

                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cliente alterado com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Por favor, informe CPF e nome do cliente"
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um cliente!"
                });
            }
        } catch (erro) {
            resposta.status(500).json({
                "status": false,
                "mensagem": "Erro ao atualizar cliente: " + erro.message
            });
        }
    }

    async excluir(requisicao, resposta) {
        resposta.type('application/json');
        try {
            if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
                const dados = requisicao.body;
                const cpf = dados.cpf;

                if (cpf) {
                    const cliente = new Cliente(cpf);

                    await cliente.excluir();

                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Cliente excluído com sucesso!"
                    });
                } else {
                    resposta.status(400).json({
                        "status": false,
                        "mensagem": "Por favor, informe o CPF do cliente a ser excluído"
                    });
                }
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, utilize o método DELETE para excluir um cliente!"
                });
            }
        } catch (erro) {
            resposta.status(500).json({
                "status": false,
                "mensagem": "Erro ao excluir cliente: " + erro.message
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
            const cliente = new Cliente();
            cliente.consultar(termo).then((listaClientes)=>{
                resposta.json(
                    {
                        status:true,
                        listaClientes
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter os clientes: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar clientes!"
            });
        }
    }
}
