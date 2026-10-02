const botao = document.querySelector(".caixa-entrada button");
const temaEscuro = document.querySelector(".cabecalho-aplicacao button"); 
const campoTarefa = document.getElementById("campo-tarefa");
const lista = document.getElementById("lista-tarefas");
const contador = document.getElementById("contador-tarefas");
const horario = document.getElementById("horario")
const campoData = document.getElementById("data");

let horarios = [];
let totalTarefas = 0;
let datas = [];

function adicionarTarefas(){
    const texto = campoTarefa.value;

    if (texto === ""){
        alert("Digite uma tarefa primeiro!");
        return;
    }
adicionarTempo(texto)
}

    function adicionarTempo(texto){
       
    
        if (horario.value === ""){
            alert("Digite o horário primeiro!");
            return;
        }
        if (campoData.value ===""){
            alert("coloque a data primeiro")
            return;
        }

         horarios.push(horario.value);
         datas.push(campoData.value);
    const indiceAtual = horarios.length - 1;

    const dataFormatada = datas[indiceAtual].split('-').reverse().join('/');

    const novaLi = document.createElement('li');
    novaLi.className = "item-tarefa";

    // Define o HTML apenas UMA vez com a estrutura nova
    novaLi.innerHTML = `
    <div class="conteudo-tarefa">
        <div class="linha-principal-tarefa">
            <span class="icone-check"><i class="fa-regular fa-circle"></i></span>
            <span class="texto-tarefa">${texto}</span>
        </div>
        <div class="linha-horario-tarefa">
            <span class="data-tarefa"><i class="fa-regular fa-calendar"></i> ${dataFormatada}</span>
            <span class="horario-tarefa"><i class="fa-regular fa-clock"></i> ${horarios[indiceAtual]}</span>
        </div>
    </div>
    <button class="botao-acao excluir">
        <i class="fa-solid fa-trash"></i>
    </button>
`;
    // --- MARCAR COMO CONCLUÍDA  ---
    const conteudoTarefa = novaLi.querySelector(".conteudo-tarefa");
    conteudoTarefa.addEventListener("click", function() {
        novaLi.classList.toggle("concluida");
        
        
        const iconeCheck = novaLi.querySelector(".icone-check i");
        if (novaLi.classList.contains("concluida")) {
            iconeCheck.className = "fa-solid fa-circle-check";
        } else {
            iconeCheck.className = "fa-regular fa-circle";
        }
    });
        
    // --- EXCLUIR TAREFA  ---
    const botaoApagar = novaLi.querySelector(".excluir");
    botaoApagar.addEventListener("click", function() {
        novaLi.remove();
        
        // Diminui o contador
        if (totalTarefas > 0) {
            totalTarefas = totalTarefas - 1;
        }
        contador.textContent = `${totalTarefas} tarefas na lista`;
    }); 

    // Adiciona o item pronto na lista do HTML
    lista.appendChild(novaLi);

    // --- ATUALIZAR CONTADOR AO ADICIONAR ---
    totalTarefas = totalTarefas + 1;
    contador.textContent = `${totalTarefas} tarefas na lista`;


    // Limpa o campo de entrada
    campoTarefa.value = "";
     campoData.value = "";
     horario.value = "";
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
});




