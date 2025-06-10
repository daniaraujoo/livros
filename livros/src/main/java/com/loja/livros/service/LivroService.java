package com.loja.livros.service;

import com.loja.livros.model.Livro;
import com.loja.livros.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 
 * @author Danielle
 */
@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    public List<Livro> listarTodos() {
        return livroRepository.findAll();
    }

    public Livro buscarPorId(int id) {
        return livroRepository.findById(id).orElse(null);
    }
}
