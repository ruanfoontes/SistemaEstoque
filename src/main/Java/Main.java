import static spark.Spark.*;
import com.google.gson.Gson;

public class Main {
    public static void main(String[] args) {

        port(8080);

        Gson gson = new Gson();

        // REGISTRO
        post("/register", (req, res) -> {
            User user = gson.fromJson(req.body(), User.class);

            Database.users.put(user.email, user.password);

            return "Usuário registrado!";
        });

        // LOGIN
        post("/login", (req, res) -> {
            User user = gson.fromJson(req.body(), User.class);

            String senha = Database.users.get(user.email);

            if (senha != null && senha.equals(user.password)) {
                return "Login OK";
            }

            return "Erro no login";
        });
    }
}