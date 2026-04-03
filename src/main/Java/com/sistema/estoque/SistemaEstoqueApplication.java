package com.sistema.estoque;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SistemaEstoqueApplication {

	public static void main(String[] args) {
		SpringApplication.run(SistemaEstoqueApplication.class, args);
		System.out.println("Sistema Estoque Rodando com SpringBoot!");
	}

}