import static spark.Spark.*;
import com.google.gson.Gson;
import java.sql.*;

public class Main {
    // Conf do Banco de dados H2 (cria um arquivo chamado dados_estoque.mv.db)
    private static final String URL = "jdbc:h2:./dados_estoque";
    private static final String USER = "sa";
    private static final String PASS = "";

    public static void main(String[] args) {
        System.out.println("INICIANDO O SERVIDOR E BANCO DE DADOS...");

        // inicializa o banco de dados (cria tabela se não existir)
        try (Connection conn = DriverManager.getConnection(URL, USER, PASS);
             Statement stmt = conn.createStatement()) {

            stmt.execute("CREATE TABLE IF NOT EXISTS usuarios (" +
                    "email VARCHAR(255) PRIMARY KEY, " +
                    "password VARCHAR(255))");
            System.out.println("Banco de Dados Ok!");

        } catch (SQLException e) {
            System.err.println("ERRO AO INICIAR BANCO: " + e.getMessage()); // Corrigido getMessage
        }

        port(8080);

        // CONFIGURAÇÃO CORS
        options("/*", (request, response) -> {
            String headers = request.headers("Access-Control-Request-Headers");
            if (headers != null) response.header("Access-Control-Allow-Headers", headers);
            return "OK";
        });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

        Gson gson = new Gson();

        // ROTA TESTE
        get("/", (req, res) -> "Servidor rodando com Banco de Dados H2!");

        // REGISTER (SALVA NO BANCO DE DADOS)
        post("/register", (req, res) -> {
            User user = gson.fromJson(req.body(), User.class);
            System.out.println("Tentando registrar: " + user.email);

            try (Connection conn = DriverManager.getConnection(URL, USER, PASS)) {
                String sql = "INSERT INTO usuarios (email, password) VALUES (?, ?)";
                PreparedStatement pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, user.email);
                pstmt.setString(2, user.password);
                pstmt.executeUpdate();
                return "Usuário registrado com sucesso!";
            } catch (SQLException e) {
                res.status(400);
                return "Erro: Usuário já existe ou erro no banco.";
            }
        });

        // LOGIN (CONSULTA NO BANCO DE DADOS)
        post("/login", (req, res) -> {
            User user = gson.fromJson(req.body(), User.class);
            System.out.println("Tentando login: " + user.email);

            try (Connection conn = DriverManager.getConnection(URL, USER, PASS)) {
                String sql = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
                PreparedStatement pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, user.email);
                pstmt.setString(2, user.password);

                ResultSet rs = pstmt.executeQuery();
                if (rs.next()) {
                    return "Login OK";
                } else {
                    res.status(401);
                    return "Email ou senha inválidos";
                }
            } catch (SQLException e) {
                res.status(500);
                return "Erro interno no servidor de banco.";
            }
        });

        System.out.println("SERVIDOR PRONTO NA PORTA 8080");
    }
}