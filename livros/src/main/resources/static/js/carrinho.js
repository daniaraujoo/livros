document.addEventListener("DOMContentLoaded", () => {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const tabela = document.getElementById("tabela-carrinho");
  const totalSpan = document.getElementById("total");

  function atualizarTabela() {
    tabela.innerHTML = "";
    let total = 0;

    if (carrinho.length === 0) {
      tabela.innerHTML = `<tr><td colspan="6">Carrinho vazio.</td></tr>`;
      totalSpan.textContent = "0.00";
      return;
    }

    carrinho.forEach((item, index) => {
      const subtotal = item.preco * item.quantidade;
      total += subtotal;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="/img/${item.capa}" alt="${item.titulo}" width="60" /></td>
        <td>${item.titulo}</td>
        <td>R$ ${item.preco.toFixed(2)}</td>
        <td>
          <div class="d-flex justify-content-center align-items-center gap-2">
            <button class="btn btn-sm btn-outline-secondary" data-action="diminuir" data-index="${index}">-</button>
            <span>${item.quantidade}</span>
            <button class="btn btn-sm btn-outline-secondary" data-action="aumentar" data-index="${index}">+</button>
          </div>
        </td>
        <td>R$ ${subtotal.toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-danger" data-action="remover" data-index="${index}">Remover️</button>
        </td>
      `;
      tabela.appendChild(row);
    });

    totalSpan.textContent = total.toFixed(2);

    document.querySelectorAll("button[data-action]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.index);
        const action = btn.dataset.action;

        if (action === "aumentar") {
          carrinho[index].quantidade++;
        } else if (action === "diminuir") {
          carrinho[index].quantidade--;
          if (carrinho[index].quantidade <= 0) carrinho.splice(index, 1);
        } else if (action === "remover") {
          carrinho.splice(index, 1);
        }

        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        atualizarTabela();
      });
    });
  }

  atualizarTabela();
});
