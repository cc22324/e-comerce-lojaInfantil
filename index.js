// Carrinho com localStorage
function getCarrinho() {
  return JSON.parse(localStorage.getItem("carrinho")) || [];
}

function saveCarrinho(carrinho) {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function adicionarAoCarrinho(produto) {
  // validação do tamanho
  if (!produto.tamanho || produto.tamanho === "") {
    alert("Por favor, selecione um tamanho antes de adicionar ao carrinho.");
    return;
  }

  let carrinho = getCarrinho();
  carrinho.push(produto);
  saveCarrinho(carrinho);
  alert("Produto adicionado ao carrinho!");
}

function renderCarrinho() {
  const container = document.getElementById("carrinho-lista");
  if (!container) return;

  let carrinho = getCarrinho();
  container.innerHTML = "";

  if (carrinho.length === 0) {
    container.innerHTML = "<p>Seu carrinho está vazio.</p>";
    return;
  }

  carrinho.forEach((item, index) => {
    let div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${item.nome}</h3>
      <p>Categoria: ${item.categoria}</p>
      <p>Gênero: ${item.genero}</p>
      <p>Tamanho: ${item.tamanho}</p>
      <p>Preço: R$ ${parseFloat(item.preco).toFixed(2)}</p>
      <button class="btn" onclick="removerItem(${index})">Remover</button>
    `;
    container.appendChild(div);
  });

  let total = carrinho.reduce((soma, p) => soma + parseFloat(p.preco), 0);
  let totalDiv = document.createElement("p");
  totalDiv.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
  container.appendChild(totalDiv);
}

function removerItem(index) {
  let carrinho = getCarrinho();
  carrinho.splice(index, 1);
  saveCarrinho(carrinho);
  renderCarrinho();
}

// Lista de produtos
const produtos = [
  { //alterar td
    id: 1,
    nome: "Camiseta Infantil Feminina",
    descricao: "Camiseta 100% algodão, confortável e resistente. Estampa divertida, ideal para o dia a dia.",
    preco: 59.90,
    tamanhos: ["2 anos", "4 anos", "6 anos", "8 anos", "10 anos"],
    imagem: "fotos projeto- meninas/2 body regata.png",
    categoria: "roupa",
    genero: "feminino",
    pagamento: ["Pix (5% de desconto)", "Cartão de crédito até 3x sem juros", "Boleto bancário"],
    entrega: "5 a 7 dias úteis",
    expressa: "até 2 dias úteis (taxa adicional de R$ 20,00)"
  },
  {
    id: 2,
    nome: "Bermuda Infantil Masculina",
    descricao: "Bermuda jeans com ajuste na cintura, ideal para brincar e passear.",
    preco: 79.90,
    tamanhos: ["2 anos", "4 anos", "6 anos", "8 anos"],
    imagem: "img/bermuda-menino.jpg",
    categoria: "roupa",
    genero: "masculino",
    pagamento: ["Pix (10% de desconto)", "Cartão de crédito até 2x sem juros", "Boleto bancário"],
    entrega: "7 a 10 dias úteis",
    expressa: "até 3 dias úteis (taxa adicional de R$ 25,00)"
  }
];


// Carregar produto dinamicamente
function carregarProduto() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  const produto = produtos.find(p => p.id === id);

  if (!produto) {
    document.querySelector(".produto-detalhe").innerHTML = "<p>Produto não encontrado.</p>";
    return;
  }

  // Preenche os campos
  document.getElementById("produto-img").src = produto.imagem;
  document.getElementById("produto-nome").textContent = produto.nome;
  document.getElementById("produto-descricao").textContent = produto.descricao;
  document.getElementById("produto-preco").textContent = "R$ " + produto.preco.toFixed(2);

  // Tamanhos
  const tamanhoSelect = document.getElementById("tamanho");
  tamanhoSelect.innerHTML = "<option value=''>Selecione um tamanho</option>";
  produto.tamanhos.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    tamanhoSelect.appendChild(opt);
  });

  // Formas de pagamento
  const pagamentoUl = document.getElementById("produto-pagamento");
  pagamentoUl.innerHTML = "";
  produto.pagamento.forEach(p => {
    const li = document.createElement("li");
    li.textContent = p;
    pagamentoUl.appendChild(li);
  });

  document.getElementById("produto-entrega").textContent = produto.entrega;
  document.getElementById("produto-expressa").textContent = produto.expressa;

  // Botão de adicionar ao carrinho com validação
  document.getElementById("btn-adicionar").onclick = function () {
    const tamanho = document.getElementById("tamanho").value;
    if (!tamanho) {
      alert("Por favor, selecione um tamanho antes de adicionar ao carrinho.");
      return;
    }

    const produtoCarrinho = {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      tamanho: tamanho,
      categoria: produto.categoria,
      genero: produto.genero
    };

    adicionarAoCarrinho(produtoCarrinho);
  };
}


// Validação de Login
function validarLogin(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const senha = document.getElementById("login-senha").value.trim();

  if (email === "" || senha === "") {
    alert("Preencha todos os campos.");
    return;
  }
  if (!email.includes("@") || !email.includes(".")) {
    alert("Digite um e-mail válido.");
    return;
  }
  if (senha.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres.");
    return;
  }

  alert("Login realizado com sucesso!");
  window.location.href = "index.html";
}


// Validação de Cadastro
function validarCadastro(event) {
  event.preventDefault();
  const nome = document.getElementById("cadastro-nome").value.trim();
  const email = document.getElementById("cadastro-email").value.trim();
  const senha = document.getElementById("cadastro-senha").value.trim();

  if (nome === "" || email === "" || senha === "") {
    alert("Preencha todos os campos.");
    return;
  }
  if (nome.length < 3) {
    alert("O nome deve ter pelo menos 3 caracteres.");
    return;
  }
  if (!email.includes("@") || !email.includes(".")) {
    alert("Digite um e-mail válido.");
    return;
  }
  if (senha.length < 6) {
    alert("A senha deve ter pelo menos 6 caracteres.");
    return;
  }

  alert("Cadastro realizado com sucesso!");
  window.location.href = "login.html";
}


// Filtro de Produtos
function filtrarProdutos() {
  const categoria = document.getElementById("filtro-categoria").value;
  const genero = document.getElementById("filtro-genero").value;

  const produtosDOM = document.querySelectorAll(".product");

  produtosDOM.forEach(prod => {
    const cat = prod.getAttribute("data-categoria");
    const gen = prod.getAttribute("data-genero");

    let mostrar = true;
    if (categoria !== "todos" && categoria !== cat) mostrar = false;
    if (genero !== "todos" && genero !== gen) mostrar = false;

    prod.style.display = mostrar ? "block" : "none";
  });
}


// Inicializações automáticas
if (window.location.pathname.includes("produto.html")) {
  carregarProduto();
}
if (window.location.pathname.includes("carrinho.html")) {
  renderCarrinho();
}
