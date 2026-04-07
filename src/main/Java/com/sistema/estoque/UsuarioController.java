package com.sistema.estoque;

import com.sistema.estoque.model.Usuario; 
import com.sistema.estoque.repository.UsuarioRepository; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios") 
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/register") 
    public String registerUser (@RequestBody Usuario usuario) {
        if (usuario == null) {
            return "Erro: Dados do usuário não fornecidos.";
        }
        usuarioRepository.save(usuario);
        return "Usuário Registrado com sucesso no banco!";  
    }

    @PostMapping("/login") 
    
    public ResponseEntity<String> login(@RequestBody Usuario loginDados) {
        return usuarioRepository.findByEmail(loginDados.getEmail())
            .filter(u -> u.getSenha().equals(loginDados.getSenha()))
            .map(u -> ResponseEntity.ok("login realizado!"))
            .orElse(ResponseEntity.status(401).body("E-mail ou senha incorretos"));
            
    }
}