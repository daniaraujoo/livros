document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/livros")
    .then((resp) => resp.json())
    .then((livros) => exibirLivros(livros))
    .catch((erro) => console.error("Erro ao buscar livros:", erro));
});

function exibirLivros(livros) {
  const container = document.getElementById("livros");
  container.innerHTML = "";

  livros.forEach((livro) => {
    const col = document.createElement("div");
    col.className = "col-md-3 mb-4";

    col.innerHTML = `
      <div class="card h-100">
        <img src="/img/${livro.capa}" class="card-img-top" alt="${livro.titulo}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${livro.titulo}</h5>
          <p class="card-text">Estoque: ${livro.estoque}</p>
          <p class="card-text">R$ ${livro.preco.toFixed(2)}</p>
          <button class="btn btn-primary mt-auto adicionar-btn" data-livro='${JSON.stringify(livro)}'>
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    `;

    container.appendChild(col);
  });

  // Ativar todos os botões após renderizar
  document.querySelectorAll(".adicionar-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const livro = JSON.parse(btn.dataset.livro);
      adicionarAoCarrinho(livro);
    });
  });
}

function adicionarAoCarrinho(livro) {
  let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  const index = carrinho.findIndex((item) => item.id === livro.id);
  if (index !== -1) {
    carrinho[index].quantidade++;
  } else {
    carrinho.push({ ...livro, quantidade: 1 });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  alert("Livro adicionado ao carrinho!");
}
