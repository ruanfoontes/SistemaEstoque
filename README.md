# Sistema de Estoque

Um sistema de gerenciamento de estoque que facilita o manuseamento e a noção de quantidades de produtos no caixa da loja. O projeto inclui um backend em Java e um frontend em HTML, CSS e JavaScript para autenticação, gerenciamento de produtos e relatórios de entradas e saídas.

## Descrição

Este projeto é um sistema de estoque projetado para auxiliar no controle de quantidades de produtos em um ambiente de loja, especialmente no caixa. Permite aos usuários se registrarem, fazerem login e gerenciar produtos, incluindo adição, visualização e registro de entradas e saídas. O backend armazena dados em memória (não persistente) e o frontend oferece uma interface intuitiva para operações diárias. É ideal para pequenos negócios ou como protótipo para sistemas mais avançados.

## Funcionalidades

- **Registro de Usuário**: Cadastro com nome, email e senha, incluindo validação de termos de serviço.
- **Login**: Autenticação com email e senha.
- **Validação de Formulários**: Verificação de campos obrigatórios, formato de email e comprimento mínimo de senha no frontend.
- **Gerenciamento de Produtos**: Adição de novos produtos com validação de quantidade (positiva e inteira), visualização de produtos existentes.
- **Relatórios de Entradas/Saídas**: Registro e visualização de movimentações de estoque (entradas e saídas de produtos).
- **Dashboard**: Página inicial com navegação para produtos, relatórios e configurações, incluindo categorias de produtos.
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
  - JavaScript (ES6, validação, submissão assíncrona e manipulação de DOM)

- **Outros**:
  - In-memory storage (HashMap para usuários e produtos)

## Pré-requisitos

- Java 17 ou superior instalado.
- Maven instalado.
- Navegador web moderno (para frontend).

## Como Executar

1. Clone o repositório:
   ```
   git clone <url-do-repositorio>
   cd SistemaEstoque
   ```

2. Compile o projeto com Maven:
   ```
   mvn clean compile
   ```

3. Execute a aplicação:
   ```
   mvn exec:java -Dexec.mainClass="Main"
   ```
   Ou diretamente com Java:
   ```
   java -cp target/classes Main
   ```

4. Abra o navegador e acesse `http://localhost:8080` para a página inicial.

## Melhorias Futuras

- Implementar persistência de dados (banco de dados real como MySQL ou PostgreSQL).
- Adicionar hashing de senhas para segurança.
- Expandir funcionalidades com edição e exclusão de produtos.
- Incluir autenticação baseada em sessões ou tokens JWT.
- Adicionar testes unitários e de integração.
- Implementar notificações para baixos estoques.

## Autores

Desenvolvido por crzin2512-2025, ruanfontes e Zezim69.
