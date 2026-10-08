const botao = document.querySelector(".caixa-entrada button");
const temaEscuro = document.querySelector(".cabecalho-aplicacao button"); 
const campoTarefa = document.getElementById("campo-tarefa");
const lista = document.getElementById("lista-tarefas");
const contador = document.getElementById("contador-tarefas");
const horario = document.getElementById("horario");
const campoData = document.getElementById("data");

// 🆕 FASE 2: Gerenciamento de Estado e Persistência
let listaDeTarefas = [];
const CHAVE_STORAGE = "sistema_tarefas_usuarios";

// 1. Função para SALVAR as tarefas e o Modo Escuro no navegador
function salvarNoLocalStorage() {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(listaDeTarefas));
    
    // Aproveita para salvar se o modo escuro está ativo
    const modoEscuroAtivo = document.body.classList.contains("modo-escuro");
    localStorage.setItem("modo_escuro_ativo", modoEscuroAtivo);
}

// 2. Função para CARREGAR os dados salvos quando a página abrir
function carregarDoLocalStorage() {
    const dadosSalvos = localStorage.getItem(CHAVE_STORAGE);
    if (dadosSalvos) {
        listaDeTarefas = JSON.parse(dadosSalvos);
    }

    // Restaura o Modo Escuro se ele estava ativo
    const modoEscuroSalvo = localStorage.getItem("modo_escuro_ativo") === "true";
    if (modoEscuroSalvo) {
        document.body.classList.add("modo-escuro");
        const icone = temaEscuro.querySelector("i");
        if (icone) icone.className = "fa-solid fa-sun";
    }
}

function adicionarTarefas(){
    const texto = campoTarefa.value;

    if (texto === ""){
        alert("Digite uma tarefa primeiro!");
        return;
    }
    adicionarTempo(texto);
}

function adicionarTempo(texto){
    if (horario.value === ""){
        alert("Digite o horário primeiro!");
        return;
    }
    if (campoData.value ===""){
        alert("coloque a data primeiro");
        return;
    }

    // 🆕 Cria o objeto da tarefa e adiciona na lista
    const novaTarefa = {
        texto: texto,
        data: campoData.value,
        horario: horario.value,
        concluida: false
    };
    listaDeTarefas.push(novaTarefa);

    // 🆕 Salva no localStorage e atualiza a tela
    salvarNoLocalStorage();
    atualizarInterface();

    // Limpa o campo de entrada
    campoTarefa.value = "";
    campoData.value = "";
    horario.value = "";
}

// 🆕 RE-RENDERIZA TODA A TELA BASEADO NOS DADOS DO ARRAY
function atualizarInterface() {
    lista.innerHTML = ""; // Limpa a lista visual antes de recriar

    listaDeTarefas.forEach((tarefa, index) => {
        const dataFormatada = tarefa.data.split('-').reverse().join('/');

        const novaLi = document.createElement('li');
        novaLi.className = "item-tarefa";
        
        // Se a tarefa já estava concluída, mantém a classe visual
        if (tarefa.concluida) {
            novaLi.classList.add("concluida");
        }

        novaLi.innerHTML = `
        <div class="conteudo-tarefa">
            <div class="linha-principal-tarefa">
                <span class="icone-check">
                    <i class="${tarefa.concluida ? 'fa-solid fa-circle-check' : 'fa-regular fa-circle'}"></i>
                </span>
                <span class="texto-tarefa">${tarefa.texto}</span>
            </div>
            <div class="linha-horario-tarefa">
                <span class="data-tarefa"><i class="fa-regular fa-calendar"></i> ${dataFormatada}</span>
                <span class="horario-tarefa"><i class="fa-regular fa-clock"></i> ${tarefa.horario}</span>
            </div>
        </div>
        <button class="botao-acao excluir">
            <i class="fa-solid fa-trash"></i>
        </button>
    `;

        // --- MARCAR COMO CONCLUÍDA  ---
        const conteudoTarefa = novaLi.querySelector(".conteudo-tarefa");
        conteudoTarefa.addEventListener("click", function() {
            // Inverte o estado da tarefa no array original
            tarefa.concluida = !tarefa.concluida;
            
            salvarNoLocalStorage();
            atualizarInterface();
        });
            
        // --- EXCLUIR TAREFA  ---
        const botaoApagar = novaLi.querySelector(".excluir");
        botaoApagar.addEventListener("click", function() {
            // Remove do array usando o índice atual do loop
            listaDeTarefas.splice(index, 1);
            
            salvarNoLocalStorage();
            atualizarInterface();
        }); 

        // Adiciona o item pronto na lista do HTML
        lista.appendChild(novaLi);
    });

    // Atualiza o contador de acordo com o tamanho do array de dados
    contador.textContent = `${listaDeTarefas.length} tarefas na lista`;
}

// Ativa o botão de adicionar tarefa
botao.addEventListener("click", adicionarTarefas);

//modo escuro
temaEscuro.addEventListener("click", function() {
    document.body.classList.toggle("modo-escuro");
    
    const icone = temaEscuro.querySelector("i");
    if (document.body.classList.contains("modo-escuro")) {
        icone.className = "fa-solid fa-sun";
    } else {
        icone.className = "fa-solid fa-moon";
    }
    
    // 🆕 Salva a preferência de tema atualizada do usuário
    salvarNoLocalStorage();
});

// 🆕 INICIALIZAÇÃO DA APLICAÇÃO
carregarDoLocalStorage();
atualizarInterface();



