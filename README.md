# 📋 ToDo_Express

Este é um projeto de To-Do List (lista de tarefas) com autenticação desenvolvido utilizando o framework Express em Node.js. O objetivo deste projeto é criar uma aplicação web que permite aos usuários gerenciar suas tarefas pessoais. Além disso, o projeto também inclui recursos adicionais, como geração de números aleatórios, contadores de acesso e autenticação de usuários.

## 🚀 Funcionalidades:

- **Página Inicial (/):** Gera uma página HTML utilizando templates Mustache, que contém um formulário para o usuário digitar seu nome.

- **Rota /salvauser:** Recebe o nome do usuário e o adiciona na sessão, em seguida redireciona para a página inicial.

- **Gestão de Tarefas (/tarefas):** Permite ao usuário adicionar, editar, marcar como concluída e excluir tarefas. As tarefas são armazenadas na sessão do usuário.

- **Rota /random:** Gera um número aleatório e o salva em um Cookie no navegador do usuário. Se o cookie já existir, mostra o número gerado anteriormente.

- **Rota /contador:** Mantém dois contadores de acesso diferentes: um para todas as requisições recebidas pela aplicação e outro específico para cada usuário.

- **Autenticação (/auth):** Implementa um mecanismo de autenticação para permitir que os usuários se autentiquem antes de adicionar tarefas. Apenas usuários autenticados podem cadastrar novas tarefas.

- **Gestão de Eventos (/eventos):** Modifica o projeto de exemplo para inserir novos eventos na lista de Eventos. Cada tipo de usuário pode inserir eventos apenas no grupo ao qual pertence.

## 🛠️ Tecnologias Utilizadas:

- **Node.js:** Plataforma de execução de JavaScript.
- **Express:** Framework web para Node.js.
- **Mustache:** Motor de templates para gerar páginas HTML dinamicamente.
- **Cookies:** Para armazenar informações no navegador do usuário.
- **Autenticação:** Mecanismo de autenticação simples para proteger rotas sensíveis.
