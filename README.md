# Sistema de Estoque

Um sistema simples de gerenciamento de estoque com funcionalidades básicas de login e registro de usuários. O projeto inclui um backend em Java usando o framework Spark e um frontend em HTML, CSS e JavaScript para autenticação e uma página inicial de dashboard.

## Descrição

Este projeto é um protótipo de sistema de estoque que permite aos usuários se registrarem, fazerem login e acessar um dashboard básico. O backend armazena usuários em memória (não persistente) e o frontend valida formulários localmente antes de enviar dados para o servidor. É ideal para aprendizado ou como base para um sistema mais completo.

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

## Instalação

1. Clone o repositório:
   ```
   git clone <url-do-repositorio>
   cd SistemaEstoque
   ```

2. Compile o projeto com Maven:
   ```
   mvn clean compile
   ```

3. Execute o servidor:
   ```
   mvn exec:java -Dexec.mainClass="Main"
   ```
   O servidor iniciará na porta 8080.

4. Abra o navegador e acesse:
   - Página de login: `http://localhost:8080/index.html`
   - Página de registro: `http://localhost:8080/register.html`
   - Dashboard: `http://localhost:8080/homepage.html`

## Uso

1. **Registro**: Acesse register.html, preencha os campos e clique em "Cadastrar". Aceite os termos de serviço.
2. **Login**: Acesse index.html, insira email e senha válidos. Após sucesso, será redirecionado para o dashboard.
3. **Dashboard**: Navegue pelas categorias e use os botões (atualmente estáticos).

### Endpoints da API

- `GET /`: Teste se o servidor está rodando (retorna "Servidor rodando").
- `POST /register`: Registra um novo usuário.
  - Corpo: `{"email": "exemplo@email.com", "password": "senha", "name": "Nome"}`
  - Respostas: "Usuário registrado com sucesso" ou "Usuário já existe".
- `POST /login`: Faz login.
  - Corpo: `{"email": "exemplo@email.com", "password": "senha"}`
  - Respostas: "Login OK" ou "Email ou senha inválidos".

## Estrutura do Projeto

```
SistemaEstoque/
├── pom.xml                          # Configuração Maven
├── src/
│   └── main/
│       ├── java/
│       │   ├── Database.java        # Armazenamento em memória
│       │   ├── Main.java            # Servidor Spark e rotas
│       │   └── User.java            # Classe de usuário
│       └── resources/
│           └── static/
│               ├── css/
│               │   ├── dashbord.css # Estilos do dashboard
│               │   └── style.css    # Estilos gerais
│               ├── image/           # Imagens (ex.: fundo, ícone)
│               ├── javascript/
│               │   └── script.js    # Validação e submissão
│               ├── homepage.html    # Dashboard
│               ├── index.html       # Página de login
│               └── register.html    # Página de registro
└── target/                          # Arquivos compilados (gerados por Maven)
```

## Melhorias Futuras

- Implementar persistência de dados (banco de dados real).
- Adicionar hashing de senhas para segurança.
- Expandir o dashboard com CRUD de produtos.
- Incluir autenticação baseada em sessões ou tokens.
- Adicionar testes unitários e de integração.

## Contribuição

Contribuições são bem-vindas! Para contribuir:
1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`).
3. Commit suas mudanças (`git commit -am 'Adiciona nova funcionalidade'`).
4. Push para a branch (`git push origin feature/nova-funcionalidade`).
5. Abra um Pull Request.

## Licença

Este projeto é distribuído sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Autor

Desenvolvido por [Seu Nome]. Para dúvidas, entre em contato via [email ou issue no repositório].
