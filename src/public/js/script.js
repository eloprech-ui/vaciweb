// =======================
// 🧭 NAVEGAÇÃO ENTRE TELAS
// =======================
const navegacao = {
  irParaLogin: () => window.location.href = "../login/login.html",
  goHome: () => window.location.href = "../index.html",
  irParaPrincipal: () => window.location.href = "../principal/principal.html",
  irParaCadastro: () => window.location.href = "../tela_cadastro/cadastro.html",
  irBebe: () => window.location.href = "../vacinas/bebe.html",
  irJogo: () => window.location.href = "../jogo/jogo.html",
  irParaCadastro: () => window.location.href = "../tela_cadastro/cadastro.html",
  irAdolescente: () => window.location.href = "../vacinas/adolecente.html",
  irAdulto: () => window.location.href = "../vacinas/adultoidoso.html",
  irGestante: () => window.location.href = "../vacinas/gestante.html",
};

// =======================
// 📚 BOTÃO "SAIBA MAIS"
// =======================
const saibaMaisBtn = document.getElementById("saibaMais");
if (saibaMaisBtn) {
  saibaMaisBtn.addEventListener("click", () => {
    alert("Em breve você será redirecionado para mais informações sobre vacinação!");
  });
}

// =======================
// 🧍 CADASTRO DE USUÁRIO
// =======================
const cadastroForm = document.getElementById("cadastroForm");
if (cadastroForm) {
  const senhaInput = document.getElementById("senha");
  const mostrarSenha = document.getElementById("mostrarSenha");

  if (senhaInput && mostrarSenha) {
    mostrarSenha.addEventListener("change", () => {
      senhaInput.type = mostrarSenha.checked ? "text" : "password";
    });
  }

  cadastroForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const senha = senhaInput?.value.trim();

    if (!nome || !email || !senha) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/usuarios/cadastrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await res.json();

      if (res.ok && data.usuario) {
        alert(data.message || "Usuário cadastrado com sucesso!");

        // Salva usuário e id_cliente no localStorage
        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        localStorage.setItem("id_cliente", data.usuario.id_cliente);

        cadastroForm.reset();
        navegacao.irParaPrincipal();
      } else {
        alert(data.error || "Erro ao cadastrar usuário.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro de conexão com o servidor.");
    }
  });
}

// =======================
// 🔄 LOGIN
// =======================
console.log("Script de login carregado.");

const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById("username");
    const senhaInput = document.getElementById("senhaLogin");
    const msg = document.getElementById("msg");

    if (!usernameInput || !senhaInput || !msg) {
      console.error("Campos de login não encontrados no HTML!");
      return;
    }

    const username = usernameInput.value.trim();
    const senha = senhaInput.value.trim();

    if (!username || !senha) {
      msg.innerText = "⚠️ Preencha todos os campos!";
      msg.style.color = "red";
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, senha }),
      });

      const data = await res.json();

      if (res.ok && data.success && data.usuario) {
        msg.innerText = "✅ Login realizado com sucesso!";
        msg.style.color = "green";

        localStorage.setItem("usuario", JSON.stringify(data.usuario));
        localStorage.setItem("id_cliente", data.usuario.id_cliente);

        setTimeout(() => {
          navegacao.irParaPrincipal();
        }, 1000);
      } else {
        msg.innerText = data.error || data.message || "❌ Usuário ou senha incorretos.";
        msg.style.color = "red";
      }
    } catch (error) {
      console.error("Erro:", error);
      msg.innerText = "🚫 Erro ao conectar ao servidor.";
      msg.style.color = "red";
    }
  });
}

// =======================
// 🔄 CARROSSEL DE IMAGENS
// =======================
const slides = document.querySelectorAll('.carousel-image');
let currentIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

// Muda a cada 4 segundos
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}, 4000);

// Inicializa o primeiro slide
showSlide(currentIndex);
