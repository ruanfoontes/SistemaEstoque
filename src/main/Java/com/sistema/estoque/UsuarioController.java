package com.sistema.estoque;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*") // Essencial para o script.js não ser bloqueado
public class UsuarioController {

    @PostMapping("/register") // Mapeia exatamente o que o console sugeriu
    public String registerUser(@RequestBody Map<String, String> payload) {
        
        // No seu JS, você envia 'name', 'email' e 'password'
        String nome = payload.get("name");
        String email = payload.get("email");

        System.out.println("--- Cadastrado com Sucesso! ---");
        System.out.println("Usuário: " + nome);
        System.out.println("E-mail: " + email);
        
        return "sucesso"; // Retorna 'sucesso' para o seu script.js redirecionar
    }
}