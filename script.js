// 1. MAPEAMENTO: Pega os elementos do HTML pelo ID
const formulario = document.querySelector('form');
const inputNome = document.getElementById('nome');
const inputEmail = document.getElementById('email');
const inputIdade = document.getElementById('idade');
const selectEscolaridade = document.getElementById('escolaridade');
const selectMateria = document.getElementById('materia');
const campoSobre = document.querySelector('textarea[name="sobre"]');
const areaFeedback = document.querySelector('.coluna-esquerda');

// OUVINTE: Espera o usuário clicar no botão de enviar
formulario.addEventListener('submit', function(event) {
    
    // Impede a página de recarregar (comportamento padrão de formulários)
    event.preventDefault();

    // COLETA: objeto para organizar todas as informações
    //  "montar o payload"
    const dadosInscricao = {
        nome: inputNome.value,
        email: inputEmail.value,
        idade: inputIdade.value,
        escolaridade: selectEscolaridade.value,
        materia: selectMateria.options[selectMateria.selectedIndex].text,
        experiencia: campoSobre.value,
        turnos: [] // lista para os turnos (checkboxes)
    };

    //  Verifica quais turnos foram marcados
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    checkboxes.forEach((item) => {
        // Se o checkbox não for o de "novidades", adicionamos à lista
        if (item.id !== 'check-novidades') {
            dadosInscricao.turnos.push(item.nextElementSibling.innerText);
        }
    });

    
    // feedback na tela para o usuário
    console.log("Dados coletados com sucesso:", dadosInscricao);

    areaFeedback.innerHTML = `
        <div style="background-color: #d4edda; color: #155724; padding: 20px; border-radius: 8px; border: 1px solid #c3e6cb;">
            <h2>Inscrição Enviada!</h2>
            <p>Olá, <strong>${dadosInscricao.nome}</strong>. Seus dados foram coletados.</p>
            <p><strong>Matéria:</strong> ${dadosInscricao.materia}</p>
            <p><strong>Turnos:</strong> ${dadosInscricao.turnos.join(', ')}</p>
            <button onclick="window.location.reload()" style="margin-top:10px; cursor:pointer;">Voltar</button>
        </div>
    `;
});