document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("form-finalizar").addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const cidade = document.getElementById("cidade").value.trim();
    const estado = document.getElementById("estado").value.trim();
    const formaPagamento = document.querySelector('input[name="pagamento"]:checked')?.value;

    if (!nome || !endereco || !telefone || !cidade || !estado || !formaPagamento) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    if (carrinho.length === 0) {
      alert("Seu carrinho está vazio.");
      return;
    }

    const itensPedido = carrinho.map(item => ({
      livroId: item.id,
      titulo: item.titulo,
      preco: item.preco,
      quantidade: item.quantidade
    }));

    const total = itensPedido.reduce((sum, item) => sum + item.preco * item.quantidade, 0);

    const pedido = {
      nome,
      telefone,
      endereco,
      cidade,
      estado,
      formaPagamento,
      data: new Date().toISOString(),
      itens: itensPedido,
      total: total.toFixed(2)
    };

    fetch("http://localhost:8082/api/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pedido)
    })
      .then(response => {
        if (!response.ok) throw new Error("Erro ao salvar pedido");
        return response.json();
      })
      .then(pedidoSalvo => {
        localStorage.removeItem("carrinho");
        localStorage.setItem("pedidoFinalizado", JSON.stringify(pedidoSalvo));
        window.location.href = "confirmacao.html";
      })
      .catch(() => {
        alert("Erro ao finalizar o pedido. Tente novamente.");
      });
  });
});
