package com.loja.livros.service;

import com.loja.livros.model.ItemPedido;
import com.loja.livros.model.Livro;
import com.loja.livros.model.Pedido;
import com.loja.livros.repository.LivroRepository;
import com.loja.livros.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private LivroRepository livroRepository;

    public Pedido processarPedido(Pedido pedido) {
        for (ItemPedido item : pedido.getItens()) {

            Livro livro = livroRepository.findById(item.getLivroId())
                .orElseThrow(() -> new RuntimeException("Livro não encontrado com ID: " + item.getLivroId()));

            int novoEstoque = livro.getEstoque() - item.getQuantidade();
            if (novoEstoque < 0) {
                throw new RuntimeException("Estoque insuficiente para o livro: " + livro.getTitulo());
            }

            livro.setEstoque(novoEstoque);
            livroRepository.save(livro);

            item.setTitulo(livro.getTitulo());
            item.setPreco(livro.getPreco());

            item.setPedido(pedido);
        }

        return pedidoRepository.save(pedido);
    }

    public List<Pedido> listarTodos() {
        return pedidoRepository.findAll();
    }

    public Pedido buscarPorId(int id) {
        return pedidoRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Pedido não encontrado com id: " + id));
    }
}
