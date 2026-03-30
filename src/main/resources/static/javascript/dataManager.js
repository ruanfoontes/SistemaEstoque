/**
 * GERENCIADOR CENTRALIZADO DE INVENTÁRIO
 * Responsável por todas as operações de manipulação de produtos
 * Compartilhado entre produtos.html e homepage.html
 * Este arquivo centraliza os dados para evitar duplicações e inconsistências
 */

// Array global que armazena todos os produtos cadastrados
// Cada produto tem: id, name, category, stock, price, status
let inventory = [];

// Contador para gerar IDs únicos para cada novo produto
// Incrementa automaticamente a cada novo produto adicionado
let nextId = 0;

/**
 * FUNÇÃO: addProduct()
 * Descrição: Cria um novo produto e adiciona ao inventário
 * 
 * Parâmetros:
 *   - name (string): Nome do produto (ex: "Parafuso")
 *   - category (string): Categoria (ex: "Eletrônicos")
 *   - stock (number): Quantidade em estoque
 *   - price (number): Preço unitário em reais
 * 
 * Retorno: Objeto do produto criado (com id, status, etc)
 * 
 * Lógica:
 *   1. Cria um objeto com ID único (nextId)
 *   2. Converte stock para número inteiro e price para decimal
 *   3. Define status baseado na quantidade (Disponível se > 10, Estoque Baixo se <= 10)
 *   4. Adiciona o novo produto ao array inventory
 *   5. Incrementa nextId para o próximo produto
 * 
 * Exemplo de uso:
 *   addProduct("Teclado", "Eletrônicos", 50, 99.90)
 *   // Retorna: {id: 0, name: "Teclado", category: "Eletrônicos", stock: 50, price: 99.90, status: "Disponível"}
 */
function addProduct(name, category, stock, price) {
    const newProduct = {
        id: nextId++,                                    // Atribui ID único e incrementa para próximo
        name: name,                                      // Nome do produto
        category: category,                              // Categoria do produto
        stock: parseInt(stock),                          // Converte para número inteiro
        price: parseFloat(price),                        // Converte para número decimal (com centavos)
        status: parseInt(stock) > 10 ? 'Disponível' : 'Estoque Baixo'  // Define status baseado na quantidade
    };
    
    inventory.push(newProduct);  // Adiciona o novo produto à lista global
    return newProduct;           // Retorna o produto criado para confirmação
}

/**
 * FUNÇÃO: deleteProduct()
 * Descrição: Remove um produto do inventário pelo ID
 * 
 * Parâmetro:
 *   - id (number): ID do produto a remover
 * 
 * Retorno: true se removido com sucesso, false se não encontrado
 * 
 * Lógica:
 *   1. Salva o tamanho atual do array
 *   2. Filtra o array removendo o produto com ID especificado
 *   3. Compara o novo tamanho com o anterior
 *   4. Retorna true se algo foi realmente removido
 * 
 * Exemplo de uso:
 *   deleteProduct(5)
 *   // Remove o produto com id=5 e retorna true se existia
 */
function deleteProduct(id) {
    const length = inventory.length;  // Salva tamanho antes da remoção
    inventory = inventory.filter(produto => produto.id !== id);  // Remove o produto com ID especificado
    return inventory.length < length;  // Retorna true se realmente removeu algo
}

/**
 * FUNÇÃO: getAllProducts()
 * Descrição: Retorna todos os produtos do inventário
 * 
 * Retorno: Array com todos os produtos cadastrados
 * 
 * Lógica:
 *   Simplesmente retorna a referência ao array inventory completo
 * 
 * Exemplo de uso:
 *   const todos = getAllProducts()
 *   // Retorna: [{id: 0, name: "Teclado", ...}, {id: 1, name: "Mouse", ...}, ...]
 */
function getAllProducts() {
    return inventory;  // Retorna a lista completa de produtos
}

/**
 * FUNÇÃO: getRecentProducts()
 * Descrição: Retorna os últimos N produtos adicionados (mais novos primeiro)
 * 
 * Parâmetro:
 *   - limit (number): Quantos produtos retornar (padrão: 10)
 *                     Se limit = 10 e tem 20 produtos, retorna os 10 últimos
 * 
 * Retorno: Array com os últimos produtos em ordem reversa (novo → velho)
 * 
 * Lógica:
 *   1. .slice(-limit) pega os últimos N elementos do array
 *      Exemplo: [1,2,3,4,5].slice(-3) = [3,4,5]
 *   2. .reverse() inverte a ordem para mostrar o mais novo primeiro
 *      Exemplo: [3,4,5].reverse() = [5,4,3]
 *   3. Resultado: últimos N produtos em ordem reversa (mais novo primeiro)
 * 
 * Exemplo de uso:
 *   const recentes = getRecentProducts(5)
 *   // Se tem 20 produtos, retorna os 5 últimos na ordem: [20, 19, 18, 17, 16]
 *   // Se tem apenas 3 produtos, retorna: [3, 2, 1]
 *   // Se tem 0 produtos, retorna: []
 */
function getRecentProducts(limit = 10) {
    return inventory.slice(-limit).reverse();  // Pega últimos N e inverte para mostrar novo primeiro
}
