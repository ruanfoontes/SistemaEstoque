import static spark.Spark.*;
import com.google.gson.Gson;
public class Main {
    public static void main(String[] args) {

        System.out.println("INICIANDO SERVIDOR...");

        port(8080);

        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }
            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }
            return "OK";
        });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));

        Gson gson = new Gson();

        // ROTA TESTE
        get("/", (req, res) -> "Servidor rodando");

        // REGISTER
        post("/register", (req, res) -> {
            User user = gson.fromJson(req.body(), User.class);

            System.out.println("Dados recebidos no Java: " + req.body());

            if (Database.users.containsKey(user.email)) {
                return "Usuário já existe";
            }

            Database.users.put(user.email, user.password);
            return "Usuário registrado com sucesso";
        });

        // LOGIN
        post("/login", (req, res) -> {
            User user = gson.fromJson(req.body(), User.class);

            String senha = Database.users.get(user.email);

            if (senha != null && senha.equals(user.password)) {
                return "Login OK";
            }

            return "Email ou senha inválidos";
        });

        System.out.println("SERVIDOR PRONTO");
    }
}