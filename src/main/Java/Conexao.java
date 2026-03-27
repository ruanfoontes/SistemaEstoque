import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;

public class Conexao {
    // O banco vai se chamar "dados_sistema" e ficará na pasta do projeto
    private static final String URL = "jdbc:h2:./dados_sistema";

    public static Connection abrir() throws Exception {
        return DriverManager.getConnection(URL, "sa", "");
    }

    public static void criarTabelas() {
        try (Connection conn = abrir(); Statement stmt = conn.createStatement()) {
            // tabela usuários para Login/Cadastro
            stmt.execute("CREATE TABLE IF NOT EXISTS usuarios (" +
                    "id INT AUTO_INCREMENT PRIMARY KEY, " +
                    "email VARCHAR(255) UNIQUE, " +
                    "password VARCHAR(255))");
            System.out.println("Banco de dados pronto para uso!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}