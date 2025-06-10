document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("detalhes-pedido");

  const pedidoFinalizado = JSON.parse(localStorage.getItem("pedidoFinalizado"));

  if (!pedidoFinalizado || !pedidoFinalizado.id) {
    container.innerHTML = "<p>Não foi possível carregar os detalhes do pedido.</p>";
    return;
  }

  fetch(`http://localhost:8082/api/pedidos/${pedidoFinalizado.id}`)
    .then(res => {
      if (!res.ok) throw new Error("Pedido não encontrado");
      return res.json();
    })
    .then(pedido => {
      const dataFormatada = new Date(pedido.data).toLocaleString("pt-BR");

      let html = `
        <div class="card p-4 text-start">
          <p><strong>Nome do cliente:</strong> ${pedido.nome}</p>
          <p><strong>Endereço:</strong> ${pedido.endereco}, ${pedido.cidade} - ${pedido.estado}</p>
          <p><strong>Telefone:</strong> ${pedido.telefone}</p>
          <p><strong>Forma de pagamento:</strong> ${pedido.formaPagamento.toUpperCase()}</p>
          <p><strong>Data do pedido:</strong> ${dataFormatada}</p>
          <p><strong>Total:</strong> R$ ${Number(pedido.total).toFixed(2)}</p>
          <h5 class="mt-4">Itens do pedido:</h5>
          <ul class="list-group">`;

      pedido.itens.forEach(item => {
        html += `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            ${item.titulo}
            <span class="badge bg-primary rounded-pill">Qtd: ${item.quantidade}</span>
          </li>`;
      });

      html += `</ul></div>`;
      container.innerHTML = html;
    })
    .catch(() => {
      container.innerHTML = "<p class='text-danger'>Erro ao buscar os dados do pedido.</p>";
    });
});
