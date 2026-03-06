// 1. MAPEAMENTO: Elementos do Formulário
const formulario = document.querySelector("form");
const areaFeedback = document.querySelector(".coluna-esquerda");

// OUVINTE: Envio do Formulário
formulario.addEventListener("submit", async function (event) {
  // Impede o recarregamento padrão para processarmos via Fetch (envio em segundo plano)
  event.preventDefault();

  // Captura todos os dados do formulário de uma vez
  const formData = new FormData(event.target);

  // Pegamos o nome apenas para personalizar a mensagem de sucesso na tela
  const nomeUsuario = document.getElementById("nome").value;

  try {
    // 2. ENVIO REAL: Envia para a URL do Formspree definida no 'action' do seu HTML
    const response = await fetch(event.target.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      // 3. FEEDBACK: Se o envio foi sucesso, mostra a mensagem verde na tela
      areaFeedback.innerHTML = `
        <div style="background-color: #d4edda; color: #155724; padding: 20px; border-radius: 8px; border: 1px solid #c3e6cb;">
            <h2>✅ Inscrição Enviada!</h2>
            <p>Olá, <strong>${nomeUsuario}</strong>. Seus dados foram enviados com sucesso.</p>
            <p>Verifique seu e-mail para confirmações futuras.</p>
            <hr>
            <button onclick="window.location.reload()" style="margin-top:10px; cursor:pointer; padding: 5px 10px;">Fazer outra inscrição</button>
        </div>
      `;
      formulario.reset(); // Limpa o formulário
    } else {
      alert("Erro ao enviar: Problema com o servidor do Formspree.");
    }
  } catch (error) {
    alert("Erro de conexão: Verifique se você está conectado à internet.");
  }
});

// --- LÓGICA DO MODO ESCURO ---
document.addEventListener("DOMContentLoaded", function () {
  const btnTheme = document.getElementById("theme-toggle");
  const body = document.body;

  // 1. Aplica o tema salvo logo no início (se existir)
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    if (btnTheme) {
      btnTheme.textContent = "Modo Claro";
      btnTheme.setAttribute("aria-pressed", "true");
    }
  }

  // 2. Lógica de clique para alternar o tema
  if (btnTheme) {
    btnTheme.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark-mode");

      // Salva a escolha do usuário no navegador
      localStorage.setItem("theme", isDark ? "dark" : "light");

      // Atualiza o texto do botão e a acessibilidade
      btnTheme.textContent = isDark ? "Modo Claro" : "Modo Escuro";
      btnTheme.setAttribute("aria-pressed", isDark ? "true" : "false");
    });
  }
});
