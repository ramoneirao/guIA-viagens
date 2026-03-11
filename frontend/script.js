// Carregar chaves salvas ao iniciar
window.addEventListener('DOMContentLoaded', () => {
    loadApiKeys();
});

// Toggle da sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Salvar chaves no localStorage
function saveApiKeys() {
    const groq = document.getElementById("groq").value;
    const tavily = document.getElementById("tavily").value;
    
    if (!groq || !tavily) {
        showSaveMessage('Por favor, preencha todas as chaves.', 'error');
        return;
    }
    
    localStorage.setItem('groq_key', groq);
    localStorage.setItem('tavily_key', tavily);
    
    showSaveMessage('Chaves salvas com sucesso.', 'success');
    
    // Fechar sidebar após 1.5 segundos
    setTimeout(() => {
        toggleSidebar();
    }, 1500);
}

// Carregar chaves do localStorage
function loadApiKeys() {
    const groq = localStorage.getItem('groq_key');
    const tavily = localStorage.getItem('tavily_key');
    
    if (groq) document.getElementById("groq").value = groq;
    if (tavily) document.getElementById("tavily").value = tavily;
}

// Mostrar mensagem de salvamento
function showSaveMessage(message, type) {
    const msgElement = document.getElementById('save-message');
    msgElement.textContent = message;
    msgElement.className = `save-message ${type}`;
    msgElement.classList.remove('hidden');
    
    setTimeout(() => {
        msgElement.classList.add('hidden');
    }, 3000);
}

async function generateTrip(){

const city = document.getElementById("city").value
const days = document.getElementById("days").value
const interests = document.getElementById("interests").value
const groq = document.getElementById("groq").value
const tavily = document.getElementById("tavily").value

if (!groq || !tavily) {
    alert('Por favor, configure suas chaves de API nas Configurações.');
    return;
}

if (!city) {
    alert('Por favor, informe a cidade de destino.');
    return;
}

document.getElementById("loading").classList.remove("hidden")
document.getElementById("result").innerHTML = ""

try {
    
    const response = await fetch("http://localhost:8000/generate",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            city,
            days,
            interests,
            groq_key:groq,
            tavily_key:tavily
        })
    })

    console.log('Resposta recebida:', response.status);

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro do servidor:', errorData);
        throw new Error(errorData.detail || 'Erro no servidor');
    }

    const data = await response.json()
    console.log('Dados recebidos:', data);

    document.getElementById("loading").classList.add("hidden")

    // Verificar se há erro na resposta
    if (data.error) {
        document.getElementById("result").innerHTML = `
            <h2>Erro</h2>
            <p><strong>Detalhes:</strong> ${data.error}</p>
            <p>${data.detail}</p>
        `
        return;
    }

    document.getElementById("result").innerHTML = `
    <h2>Seu roteiro</h2>
    <div class="markdown">${marked.parse(data.result)}</div>
    `
} catch (error) {
    console.error('Erro completo:', error);
    document.getElementById("loading").classList.add("hidden")
    document.getElementById("result").innerHTML = `
        <h2>Erro</h2>
        <p><strong>Detalhes:</strong> ${error.message}</p>
        <p>Verifique o console do navegador (F12) para mais informações.</p>
    `
}
}