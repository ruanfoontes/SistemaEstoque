
O SistemaEstoque é uma solução inteligente desenvolvida pelo grupo TriDevs para facilitar o controle de mercadorias e a gestão de fluxo de caixa em pequenas lojas e comércios. O sistema permite o monitoramento em tempo real de entradas e saídas, garantindo que o lojista nunca perca a noção do seu inventário.

O que mudou? (Update)
O sistema evoluiu de uma estrutura básica para o Spring Boot 3.x, trazendo maior estabilidade, tratamento de erros automático e uma arquitetura baseada em RestControllers.

Funcionalidades
Autenticação Completa: Sistema de Registro e Login integrado entre Front-end (JS) e Back-end (Java).

Validação Inteligente: Otimização de formulários no cliente (Regex para e-mail e regras de tamanho) e no servidor.

Gestão de Inventário: Cadastro de produtos com validação de quantidades positivas.

Movimentações: Registro detalhado de Entradas e Saídas para relatórios precisos.

Dashboard Responsivo: Interface adaptável para PCs e Tablets, facilitando o uso no balcão da loja.

Comunicação Assíncrona: Uso de Fetch API para operações sem recarregar a página (SPA style).

Tecnologias Utilizadas
Back-end
Java 17+

Spring Boot 3.x (Web Starter)

Maven (Gerenciamento de dependências e Build)

Jackson (Serialização de JSON nativa do Spring)

Front-end
HTML5 & CSS3 (Design moderno com Google Fonts)

JavaScript (ES6+) (Manipulação de DOM e Fetch API)

Estrutura do Projeto
/src/main/java: Contém a lógica de negócio, Controllers e modelos.

/src/main/resources/static: Hospeda os arquivos de interface (HTML, CSS, JS).

pom.xml: Configurações de dependências e versões do projeto.

Pré-requisitos
Java JDK 17 ou superior.

Maven instalado e configurado no PATH.

VS Code com a extensão Spring Boot Dashboard (recomendado).

Como Rodar o Projeto
Clone o repositório do TriDevs.

Abra a pasta raiz no seu VS Code.

No terminal, execute:

Bash
mvn spring-boot:run
O sistema estará disponível em: http://localhost:8080/index.html.

Desenvolvedores (TriDevs)
Ruan Fontes - Back-End Developer & Integração.

Colaboradores do grupo TriDevs.
