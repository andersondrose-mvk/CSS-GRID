// 1. MAPEAMENTO: Elementos do Formulário
const formulario = document.querySelector("form");
const areaFeedback = document.querySelector(".coluna-esquerda");

// OUVINTE: Envio do Formulário (Apenas UM evento de submit)
formulario.addEventListener("submit", async function (event) {
  event.preventDefault();

  // 1. CAPTURA DE ELEMENTOS E VALORES
  const botaoEnvio = event.submitter;
  const nomeRaw = document.getElementById("nome").value;
  const sobreRaw = document.querySelector('textarea[name="sobre"]').value;

  // Seleciona checkboxes de turno marcados (HTML não valida isso sozinho)
  const turnosMarcados = document.querySelectorAll(
    'input[name^="turno"]:checked'
  );

  // 2. SANITIZAÇÃO (Segurança contra XSS - remove tags HTML)
  const nomeUsuario = nomeRaw.replace(/<[^>]*>?/gm, "").trim();
  const sobreSanitizado = sobreRaw.replace(/<[^>]*>?/gm, "").trim();

  // 3. VALIDAÇÕES MANUAIS

  // Valida Turnos: Se a lista de marcados estiver vazia, interrompe
  if (turnosMarcados.length === 0) {
    alert("Por favor, selecione ao menos um turno disponível.");
    return;
  }

  // Valida Sobre Si: Mínimo de 10 caracteres reais
  if (sobreSanitizado.length < 10) {
    alert(
      "Por favor, descreva a sua experiência com pelo menos 10 caracteres."
    );
    return;
  }

  // 4. PREPARAÇÃO PARA ENVIO
  botaoEnvio.disabled = true;
  botaoEnvio.value = "A enviar...";

  const formData = new FormData(event.target);

  try {
    // 5. ENVIO REAL PARA O FORMSPREE
    const response = await fetch(event.target.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      // 6. FEEDBACK DE SUCESSO
      areaFeedback.innerHTML = `
        <div style="background-color: #d4edda; color: #155724; padding: 20px; border-radius: 8px; border: 1px solid #c3e6cb;">
            <h2>✅ Inscrição Enviada!</h2>
            <p>Olá, <strong>${nomeUsuario}</strong>. Os seus dados foram enviados com sucesso.</p>
            <p>Verifique o seu e-mail para confirmações futuras.</p>
            <hr>
            <button onclick="window.location.reload()" style="margin-top:10px; cursor:pointer; padding: 5px 10px;">Fazer outra inscrição</button>
        </div>
      `;
      formulario.reset();
    } else {
      throw new Error("Erro no servidor");
    }
  } catch (error) {
    alert("Ops! Houve um erro de ligação. Tente novamente.");
    botaoEnvio.disabled = false;
    botaoEnvio.value = "Enviar Inscrição";
  }
});

// --- LÓGICA DO MODO ESCURO ---
document.addEventListener("DOMContentLoaded", function () {
  const btnTheme = document.getElementById("theme-toggle");
  const body = document.body;

  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-mode");
    if (btnTheme) {
      btnTheme.textContent = "Modo Claro";
      btnTheme.setAttribute("aria-pressed", "true");
    }
  }

  if (btnTheme) {
    btnTheme.addEventListener("click", () => {
      const isDark = body.classList.toggle("dark-mode");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      btnTheme.textContent = isDark ? "Modo Claro" : "Modo Escuro";
      btnTheme.setAttribute("aria-pressed", isDark ? "true" : "false");
    });
  }
});
// <!-- att layout 16/06/2023 14:00 -->