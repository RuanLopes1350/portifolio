# **Meu Portfólio \- Ruan Lopes**

Bem-vindo ao repositório do meu portfólio pessoal\! Este projeto é uma aplicação full-stack que apresenta minhas habilidades, projetos e informações de contato de uma forma interativa e criativa, simulando uma interface de terminal.  
O projeto está online e pode ser acessado [aqui](https://portifolio-lilac-one-71.vercel.app/).

## **❯ Visão Geral**

Este portfólio foi desenvolvido para ser mais do que apenas uma lista de projetos. A interface de terminal oferece uma experiência de usuário única, onde os visitantes podem "executar" comandos para saber mais sobre mim. O frontend é construído com Next.js e Tailwind CSS, e consome uma API RESTful própria, desenvolvida com Node.js, Express e MongoDB, ambos hospedados na Vercel em uma arquitetura monorepo.

### **Comandos Disponíveis**

Os seguintes comandos estão disponíveis no terminal:

* `help`: Exibe a lista de todos os comandos disponíveis.  
* `about`: Mostra um resumo profissional sobre mim.  
* `skills`: Lista minhas habilidades técnicas.  
* `contact`: Apresenta minhas informações de contato e redes sociais.  
* `projects`: Exibe os projetos relevantes que desenvolvi.  
* `clear`: Limpa o histórico do terminal.

## **🚀 Tecnologias Utilizadas**

O projeto é um monorepo dividido em duas partes principais: frontend e backend.

### **Frontend**

* **Framework:** Next.js 15 (App Router)  
* **Linguagem:** TypeScript  
* **Estilização:** Tailwind CSS  
* **HTTP Client:** Axios  
* **Fonte:** Geist Sans & Geist Mono

### **Backend**

* **Ambiente de Execução:** Node.js  
* **Framework:** Express.js  
* **Linguagem:** TypeScript  
* **Banco de Dados:** MongoDB com Mongoose  
* **Validação:** Mongoose Schema  
* **Variáveis de Ambiente:** Dotenv

### **Deploy e Infraestrutura**

* **Plataforma:** Vercel  
* **Arquitetura:** Serverless Functions para o backend e Next.js para o frontend, configurados através do vercel.json.

## **🛠️ Estrutura do Projeto**

A API do backend segue uma arquitetura em camadas para garantir a separação de responsabilidades e facilitar a manutenção:

* **routes**: Define os endpoints da API e os associa aos seus respectivos controllers.  
* **controller**: Recebe as requisições HTTP, trata os parâmetros e direciona para a camada de serviço.  
* **services**: Contém a lógica de negócio da aplicação.  
* **repository**: É responsável pela comunicação direta com o banco de dados.  
* **model**: Define os schemas do Mongoose para o banco de dados.  
* **types**: Contém as definições de tipos do TypeScript para as entidades.