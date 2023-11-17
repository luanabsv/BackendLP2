CREATE DATABASE sistema;

USE sistema;

CREATE TABLE categoria (
    cat_codigo INT NOT NULL AUTO_INCREMENT,
    cat_descricao VARCHAR(100) NOT NULL,
    CONSTRAINT pk_categoria PRIMARY KEY(cat_codigo)
);

CREATE TABLE produto (
    prod_codigo INT NOT NULL AUTO_INCREMENT,
    prod_descricao VARCHAR(100) NOT NULL,
    prod_precoCusto DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_precoVenda DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_dataValidade DATE,
    prod_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
    cat_codigo INT NOT NULL,
    CONSTRAINT pk_produto PRIMARY KEY(prod_codigo),
    CONSTRAINT fk_categoria_produto FOREIGN KEY(cat_codigo) REFERENCES categoria(cat_codigo)
);


CREATE DATABASE sistema;

USE sistema;

CREATE TABLE categoria (
    cat_codigo INT NOT NULL AUTO_INCREMENT,
    cat_descricao VARCHAR(100) NOT NULL,
    CONSTRAINT pk_categoria PRIMARY KEY(cat_codigo)
);

CREATE TABLE produto (
    prod_codigo INT NOT NULL AUTO_INCREMENT,
    prod_descricao VARCHAR(100) NOT NULL,
    prod_precoCusto DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_precoVenda DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_dataValidade DATE,
    prod_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
    cat_codigo INT NOT NULL,
    CONSTRAINT pk_produto PRIMARY KEY(prod_codigo),
    CONSTRAINT fk_categoria_produto FOREIGN KEY(cat_codigo) REFERENCES categoria(cat_codigo)
);

CREATE TABLE cliente (
	cli_cpf VARCHAR(11) NOT NULL,
    cli_nome VARCHAR(100) NOT NULL,
    cli_endereco VARCHAR(100) NOT NULL, 
    cli_numero VARCHAR(5), 
    cli_bairro VARCHAR(100) NOT NULL,
    cli_cidade VARCHAR(100) NOT NULL,
    cli_uf VARCHAR(2) NOT NULL,
    cli_cep VARCHAR(8) NOT NULL, 
    cli_telefone VARCHAR(11) NOT NULL,
    cli_genero VARCHAR(1) NOT NULL
);