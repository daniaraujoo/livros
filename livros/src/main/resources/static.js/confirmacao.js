document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("detalhes-pedido");

  const pedidoFinalizado = JSON.parse(localStorage.getItem("pedidoFinalizado"));

  if (!pedidoFinalizado || !pedidoFinalizado.id) {
    container.innerHTML = "<p>Não foi possível carregar os detalhes do pedido.</p>";
    return;
  }

  fetch(`http://localhost:8080/api/pedidos/${pedidoFinalizado.id}`)
    .then(res => {
      if (!res.ok) throw new Error("Pedido não encontrado");
      return res.json();
    })
    .then(pedido => {
      let html = `<p><strong>Nome do cliente:</strong> ${pedido.nome}</p>`;
      html += `<p><strong>Data do pedido:</strong> ${new Date(pedido.data).toLocaleString()}</p>`;
      html += `<p><strong>Total:</strong> R$ ${Number(pedido.total).toFixed(2)}</p>`;
      html += `<h5 class="mt-4">Itens do pedido:</h5><ul>`;

      pedido.itens.forEach(item => {
        html += `<li>${item.titulo} — Quantidade: ${item.quantidade}</li>`;
      });

      html += "</ul>";
      container.innerHTML = html;
    })
    .catch(() => {
      container.innerHTML = "<p>Erro ao buscar os dados do pedido.</p>";
    });
});
