# Sistema de Estoque

Um sistema simples de gerenciamento de estoque com funcionalidades básicas de login e registro de usuários. O projeto inclui um backend em Java usando o framework Spark e um frontend em HTML, CSS e JavaScript para autenticação e uma página inicial de dashboard para o gerenciamento do estoque de produtos.

## Descrição

Este projeto é um protótipo de sistema de estoque que permite aos usuários se registrarem, fazerem login e acessar um dashboard. O backend armazena usuários em memória (não persistente) e o frontend valida formulários localmente antes de enviar dados para o servidor. É ideal para aprendizado ou como base para um sistema mais completo.

## Funcionalidades

- **Registro de Usuário**: Cadastro com nome, email e senha, incluindo validação de termos de serviço.
- **Login**: Autenticação com email e senha.
- **Validação de Formulários**: Verificação de campos obrigatórios, formato de email e comprimento mínimo de senha no frontend.
- **Dashboard Básico**: Página inicial com navegação para categorias de produtos (estática, sem funcionalidades backend).
- **Interface Responsiva**: Design adaptável para diferentes dispositivos.

## Tecnologias Utilizadas

- **Backend**:
  - Java 17
  - Spark Framework (para API REST)
  - Gson (para manipulação de JSON)
  - Maven (gerenciamento de dependências)

- **Frontend**:
  - HTML5
  - CSS3 (com Google Fonts)
  - JavaScript (ES6, validação e submissão assíncrona)

- **Outros**:
  - In-memory storage (HashMap para usuários)

## Pré-requisitos

- Java 17 ou superior instalado.
- Maven instalado.
- Navegador web moderno (para frontend).

## Melhorias Futuras

- Implementar persistência de dados (banco de dados real).
- Adicionar hashing de senhas para segurança.
- Expandir o dashboard com CRUD de produtos.
- Incluir autenticação baseada em sessões ou tokens.
- Adicionar testes unitários e de integração.


## Autor

Desenvolvido por crzin2512-2025, ruanfontes e Zezim69.
