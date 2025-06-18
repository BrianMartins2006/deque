const minhaLista = new LinkedList();

let tarefaSelecionadaIndex = null;

//---------------------------------------------
function limpaInputs() {
    document.getElementById("txtnovaTarefa").value = "";
    document.getElementById("txtnovaPrioridade").value = "";
    document.getElementById("txtnovaTarefa").focus();
}

//---------------------------------------------
function leiaDadosTarefa() {
    const descricao = document.getElementById("txtnovaTarefa").value.trim();
    const prioridade = document.getElementById("txtnovaPrioridade").value.trim();
    if (descricao === "" || prioridade === "") {
        alert("Preencha os campos de descrição e prioridade!");
        return null;
    }
    return new Tarefa(descricao, prioridade, obterDataAtual(), obterHoraAtual());
}

//---------------------------------------------
function adicionarElementoInicio() {
    const novaTarefa = leiaDadosTarefa();  
    if(novaTarefa!=null)
        minhaLista.addFirst(novaTarefa);
    console.log(minhaLista.toString());
    limpaInputs();
    atualizarLista();
}

//---------------------------------------------
function adicionarElementoFinal() {
    const novaTarefa = leiaDadosTarefa();  
    if(novaTarefa!=null)
        minhaLista.addLast(novaTarefa);
    console.log(minhaLista.toString());
    limpaInputs();
    atualizarLista();
}

//---------------------------------------------
function adicionarOrdenado() {
    const novaTarefa = leiaDadosTarefa();
    if (novaTarefa != null){
        const novaPrioridade = parseInt(document.getElementById("txtnovaPrioridade").value.trim());

        let indice = 0;
        let resposta = false;

        if(minhaLista.isEmpty() ){
            console.log(novaTarefa.toString() + " - Entrou: " + novaPrioridade); 
            resposta = minhaLista.addFirst(novaTarefa); 
        }

        else if(novaPrioridade >= minhaLista.getLast().prioridade){
            resposta = minhaLista.addLast(novaTarefa);
        }
        else if(novaPrioridade < minhaLista.getFirst().prioridade ){
            resposta = minhaLista.addFirst(novaTarefa);
        } else { 
            for (const tarefa of minhaLista) {
                const prioridadeAtual = parseInt(tarefa.prioridade);
                if (novaPrioridade < prioridadeAtual) {
                    break;
                }
                indice++;
            }
            minhaLista.addAtIndex(indice, novaTarefa); 
            resposta = true; 
        }
        console.log(minhaLista.toString());
        limpaInputs();
        atualizarLista();
    }
}

function removeTarefas() {
    if(minhaLista.isEmpty()) {
        alert("Lista de Tarefas Vazia");
        return;
    }

    if(tarefaSelecionadaIndex === null){
        const tarefaRemovida = minhaLista.removeFirst();
        mostrarMensagemRemocao(tarefaRemovida);
    } else {
        const tarefaRemovida = minhaLista.removeAtIndex(tarefaSelecionadaIndex);
        mostrarMensagemRemocao(tarefaRemovida);
        tarefaSelecionadaIndex = null; // limpa seleção
    }

    atualizarLista();
}

//---------------------------------------------
function mostrarMensagemRemocao(tarefaRealizada) {
    const dataAtual = obterDataAtual();
    const horaAtual = obterHoraAtual();
    const dias = calcularDiferencaDias(tarefaRealizada.data, dataAtual);
    const horasMin = calcularDiferencaHoras(tarefaRealizada.hora, horaAtual);

    const mensagem = document.getElementById("mensagem-remocao");
    mensagem.innerHTML = `Tarefa realizada: ${tarefaRealizada.descricao}<br>Tempo: ${dias} dias e ${horasMin}`;
    mensagem.style.display = "block";
}

//---------------------------------------------
function atualizarLista() {
    const listaTarefas = document.getElementById("list_listadeTarefas");
    const lblTarefas = document.getElementById("lblmostraTarefas");
    listaTarefas.innerHTML = ""; // limpar

    if(!minhaLista.isEmpty()){
        lblTarefas.innerHTML = "Lista de Tarefas";
        let index = 0;
        for(const tarefa of minhaLista){
            const idx = index; // cópia local do índice para o closure
            const novaLinha = document.createElement("li");
            novaLinha.innerHTML = tarefa.toString();
            novaLinha.style.cursor = "pointer";

            // Destacar se for selecionada
            if(index === tarefaSelecionadaIndex){
                novaLinha.style.backgroundColor = "#cce5ff"; // cor de destaque
            } else {
                novaLinha.style.backgroundColor = "";
            }

            // Clique seleciona/deseleciona tarefa
            novaLinha.onclick = () => {
                if(tarefaSelecionadaIndex === idx){
                    tarefaSelecionadaIndex = null; // desmarca se clicar de novo
                } else {
                    tarefaSelecionadaIndex = idx;
                }
                atualizarLista();
            }

            listaTarefas.appendChild(novaLinha);
            index++;
        }
    } else {
        lblTarefas.innerHTML = "Lista de Tarefas Vazia";
        tarefaSelecionadaIndex = null; // limpa seleção
    }
}


//---------------------------------------------
function obterDataAtual() {
    let dataAtual = new Date();
    let dia = dataAtual.getDate();
    let mes = dataAtual.getMonth() + 1;
    let ano = dataAtual.getFullYear();
    return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
}

//---------------------------------------------
function obterHoraAtual() {
    const data = new Date();
    const hora = data.getHours().toString().padStart(2, '0');
    const minuto = data.getMinutes().toString().padStart(2, '0');
    const segundo = data.getSeconds().toString().padStart(2, '0');
    return `${hora}:${minuto}:${segundo}`;
}

//---------------------------------------------
function calcularDiferencaHoras(hora1, hora2) {
    const [h1, m1, s1] = hora1.split(':').map(Number);
    const [h2, m2, s2] = hora2.split(':').map(Number);
    const diferencaSegundos = (h2 * 3600 + m2 * 60 + s2) - (h1 * 3600 + m1 * 60 + s1);
    const horas = Math.floor(diferencaSegundos / 3600);
    const minutos = Math.floor((diferencaSegundos % 3600) / 60);
    const segundos = diferencaSegundos % 60;
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}

//---------------------------------------------
function calcularDiferencaDias(dataInicial, dataFinal) {
    const msPorDia = 24 * 60 * 60 * 1000;
    const [diaIni, mesIni, anoIni] = dataInicial.split('/').map(Number);
    const [diaFim, mesFim, anoFim] = dataFinal.split('/').map(Number);
    const dataIni = new Date(anoIni, mesIni - 1, diaIni);
    const dataFim = new Date(anoFim, mesFim - 1, diaFim);
    return Math.floor((dataFim - dataIni) / msPorDia);
}

//---------------------------------------------
function converterDataFormatoISO8601(data) {
    const partes = data.split('/');
    return `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
}

//---------------------------------------------
function comparaTarefasDataHora(tarefa1, tarefa2) {
    const dataHora1 = new Date(`${converterDataFormatoISO8601(tarefa1.data)}T${tarefa1.hora}`);
    const dataHora2 = new Date(`${converterDataFormatoISO8601(tarefa2.data)}T${tarefa2.hora}`);
    return dataHora1 < dataHora2 ? tarefa1 : tarefa2;
}

//---------------------------------------------
function mostrarPrimeiraTarefa() {
    if (!minhaLista.isEmpty()) {
        const tarefa = minhaLista.getFirst();
        alert(`Primeira tarefa:\n${tarefa.toString()}`);
    } else {
        alert("Lista de Tarefas Vazia");
    }
}

//---------------------------------------------
function mostrarTarefaMaisAntiga() {
    if (minhaLista.isEmpty()) {
        alert("Lista de Tarefas Vazia");
        return;
    }

    let maisAntiga = minhaLista.getFirst();
    for (const tarefa of minhaLista) {
        maisAntiga = comparaTarefasDataHora(maisAntiga, tarefa);
    }

    alert(`Tarefa mais antiga:\n${maisAntiga.toString()}`);
}

//---------------------------------------------
function removerTarefaPorIndice(index) {
    if (!minhaLista.isEmpty()) {
        const tarefa = minhaLista.removeAtIndex(index);
        mostrarMensagemRemocao(tarefa);
        atualizarLista();
    }
}

//---------------------------------------------
function saveLinkedListToLocalStorage() {
    let listaParaSalvar = [];
    for(const item of minhaLista){
        listaParaSalvar.push({
            _descricao: item.descricao,
            _prioridade: item.prioridade,
            _data: item.data,
            _hora: item.hora
        });
    };
    localStorage.setItem('myLinkedList', JSON.stringify(listaParaSalvar));
    alert("Lista salva com sucesso!");
}

//---------------------------------------------
function loadLinkedListFromLocalStorage() {
    let jsonStr = localStorage.getItem('myLinkedList');
    if (jsonStr) {
        let listaCarregada = JSON.parse(jsonStr);
        for (let i = 0; i < listaCarregada.length; i++) {
            let obj = listaCarregada[i];
            let novaTarefa = new Tarefa(obj._descricao, obj._prioridade, obj._data, obj._hora);
            minhaLista.addLast(novaTarefa);
        }
        atualizarLista();
        alert("Lista carregada com sucesso!");
    }
}
