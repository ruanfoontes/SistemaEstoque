/**
 * RENDERIZAÇÃO DE PRODUTOS RECENTES
 * Script responsável por atualizar a tabela de "Produtos Recentes" na homepage
 * Integra-se com dataManager.js para obter os dados do inventário
 * 
 * Este arquivo é importado em homepage.html e executa automaticamente ao carregamento da página
 */

/**
 * FUNÇÃO: renderRecentProducts()
 * Descrição: Busca os últimos 10 produtos do inventário e desenha a tabela na homepage
 * 
 * Processo:
 *   1. Localiza o elemento HTML com id="product-recent" (tbody da tabela de recentes)
 *   2. Obtém os 10 últimos produtos do dataManager via getRecentProducts(10)
 *   3. Se não houver produtos, mostra mensagem "Nenhum produto adicionado ainda"
 *   4. Se houver, cria linhas da tabela (<tr>) com formatação especial
 * 
 * Dados mostrados por produto:
 *   - Nome (em negrito)
 *   - ID (com símbolo #)
 *   - Quantidade em estoque (com unidade "un")
 *   - Preço (formatado com R$ e 2 casas decimais)
 *   - Status (Disponível ou Estoque Baixo) com classe CSS dinâmica
 * 
 * Sincronização:
 *   Como usa getRecentProducts() do dataManager (que referencia o array global inventory),
 *   dados aparecem sempre sincronizados com o que foi adicionado em produtos.html
 * 
 * Usada em: 
 *   - Evento DOMContentLoaded (ao abrir homepage.html)
 *   - Pode ser chamada manualmente após mudanças (caso necessário para atualizar)
 */
function renderRecentProducts() {
    // Tenta localizar o elemento <tbody> onde os produtos serão mostrados
    // Este elemento deve ter id="product-recent" em homepage.html
    const recentContainer = document.getElementById('product-recent');
    
    // VALIDAÇÃO: Se o elemento não existir, avisa no console e sai da função
    // Isso evita erros se a página HTML não tiver a estrutura esperada
    if (!recentContainer) {
        console.warn('Elemento #product-recent não encontrado');
        return;
    }
    
    // Chama a função do dataManager para obter os 10 últimos produtos
    // getRecentProducts(10) retorna array com os 10 últimos produtos
    // em ordem reversa: [mais novo, ..., mais velho]
    const recentProducts = getRecentProducts(10);
    
    // VALIDAÇÃO: Se não houver nenhum produto, mostra mensagem vazia
    // Isso melhora a UX - em vez de tabela vazia, há uma mensagem clara
    if (recentProducts.length === 0) {
        recentContainer.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #999;">Nenhum produto adicionado ainda.</td></tr>';
        return;
    }
    
    // Transforma cada produto em uma linha HTML (<tr>) da tabela
    // Usa Array.map() para iterar sobre produtos
    // Usa Template Literals (${}) para inserir os dados dinamicamente
    recentContainer.innerHTML = recentProducts.map(p => `
        <tr>
            <td><strong>${p.name}</strong></td>                                    <!-- Nome do produto em negrito -->
            <td>#${p.id}</td>                                                      <!-- ID com # na frente (ex: #0, #1, #2) -->
            <td>${p.stock} un</td>                                                 <!-- Quantidade + unidade "un" -->
            <td>R$ ${p.price.toFixed(2)}</td>                                      <!-- Preço formatado: R$ 99.90 -->
            <td><span class="status-${p.stock > 10 ? 'ativo' : 'baixo'}">${p.status}</span></td>  <!-- Status com classe CSS para cor -->
        </tr>
    `).join('');  // .join('') converte o array de strings HTML em uma string única
}

/**
 * EVENT LISTENER: DOMContentLoaded
 * Descrição: Executa renderRecentProducts() assim que a página HTML termina de carregar
 * 
 * Por que usar isto?
 *   Garante que:
 *   1. dataManager.js já foi carregado (contém dataManager e getRecentProducts)
 *   2. O elemento HTML #product-recent existe no DOM
 *   3. Todos os recursos foram carregados
 * 
 * Timing de execução:
 *   Executado LOGO APÓS o HTML ser parseado completamente
 *   MAS ANTES de imagens e outros recursos finalizarem
 *   Esto é mais rápido que usar "onload" do body
 * 
 * Comportamento:
 *   Preenche a tabela automaticamente sem que o usuário clique em nada
 */
document.addEventListener('DOMContentLoaded', renderRecentProducts);
