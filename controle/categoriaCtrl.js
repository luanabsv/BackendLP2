import Categoria from "../modelo/categoria.js";

export default class CategoriaCtrl {

    gravar(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const descricao = dados.descricao;
            if (descricao) {   
                const categoria = new Categoria(0, descricao)

                categoria.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": categoria.codigo,
                        "mensagem": "Categoria incluída com sucesso!"
                    });
                }).catch((erro)=> {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar categoria: " + erro.message
                    });
                })
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe a descrição da categoria"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar uma categoria!"
            });
        }
    }

    alterar(requisicao, resposta){
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const descricao = dados.descricao;
            if (codigo && descricao) {   
                const categoria = new Categoria(codigo, descricao)

                categoria.alterar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": categoria.codigo,
                        "mensagem": "Categoria incluída com sucesso!"
                    });
                }).catch((erro)=> {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar categoria: " + erro.message
                    });
                })
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe a descrição da categoria"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar uma categoria!"
            });
        }
    }

    excluir(requisicao, resposta){
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;

            if (codigo) {   
                const categoria = new Categoria(codigo)

                categoria.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Categoria excluída com sucesso!"
                    });
                }).catch((erro)=> {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir categoria: " + erro.message
                    });
                })
            } else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código da categoria"
                });
            }
        } else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir uma categoria!"
            });
        }
    }

    consultar(requisicao, resposta) {
        resposta.type('application/json');
        let termo = requisicao.params.termo;
        if (!termo){
            termo = "";
        }
        if (requisicao.method === "GET"){
            const categoria = new Categoria();
            categoria.consultar(termo).then((listaCategorias)=>{
                resposta.json(
                    {
                        status:true,
                        listaCategorias
                    });
            })
            .catch((erro)=>{
                resposta.json(
                    {
                        status:false,
                        mensagem:"Não foi possível obter as categorias: " + erro.message
                    }
                );
            });
        }
        else 
        {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar categorias!"
            });
        }
    }
}