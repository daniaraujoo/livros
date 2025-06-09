document.addEventListener("DOMContentLoaded", () => {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const tabela = document.getElementById("tabela-carrinho");
  const totalSpan = document.getElementById("total");
  let total = 0;

  if (carrinho.length === 0) {
    tabela.innerHTML = `<tr><td colspan="5">Carrinho vazio.</td></tr>`;
    totalSpan.textContent = "0.00";
    return;
  }

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><img src="${item.capa}" alt="${item.titulo}" width="60" /></td>
      <td>${item.titulo}</td>
      <td>R$ ${item.preco.toFixed(2)}</td>
      <td>${item.quantidade}</td>
      <td>R$ ${subtotal.toFixed(2)}</td>
    `;
    tabela.appendChild(row);
  });

  totalSpan.textContent = total.toFixed(2);
});
