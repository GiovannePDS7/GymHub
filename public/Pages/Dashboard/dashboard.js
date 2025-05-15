var setaIconUser = document.getElementById('setaIconUser');
var containerFerramentas = document.getElementById('containerFerramentas');


setaIconUser.addEventListener('click', function () {

    if (containerFerramentas.style.height == '10%') {

        containerFerramentas.style.height = '0%';
    } else {
        containerFerramentas.style.height = '10%';
    }
})

var idUsuarioVar = sessionStorage.ID_USUARIO;
var listaTreinos = [];
var listaExercicios = [];

function RecuperarTreinos() {
    var selectTreino = document.getElementById('selectTreino')

    fetch("/registroTreino/pegarTreino", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            idUsuarioServer: idUsuarioVar,
        }),
    })
        .then(async function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {

                resposta.json().then(json => {
                    // console.log(json);

                    if (json.length == 0) {
                        alert('Você não possui treinos cadastrados, crie um já!')

                        window.location = "../../Pages/CriarTreino/criarTreino.html";
                    }
                    for (let i = 0; i < json.length; i++) {
                        var treino = {
                            nomeTreino: json[i].nome,
                            idTreino: json[i].idTreino,
                            fkUsuario: json[i].fkUsuario
                        }
                        listaTreinos.push(treino)
                    }

                    for (let j = 0; j < listaTreinos.length; j++) {
                        selectTreino.innerHTML += `<option class="optTreino" value="${listaTreinos[j].idTreino}">${listaTreinos[j].nomeTreino}</option>`
                    }
                })


            } else {
                alert('Erro ao recuperar treino')
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    return false;
}
addEventListener('DOMContentLoaded', function () { // ativa quando o HTML for totalmente carregado
    RecuperarTreinos()
})

var selectExercicio = document.getElementById('selectExercicio');
var selectIntervalo = document.getElementById('selectIntervalo');

selectExercicio.addEventListener('change', function(){
    if(selectExercicio.value != ''){
        selectIntervalo.disabled = false;
    }
    else{
        alert('Selecione um exercício')
        selectIntervalo.disabled = true;
    }
})

selectTreino.addEventListener('change', function () {

    selectExercicio.innerHTML = '<option class="optExercicio" value="">Selecione o Exercicio</option>';
    if (selectTreino.value != '') {
        fetch("/registroExercicio/pegarExercicio", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                idTreinoServer: selectTreino.value,
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {

                    listaExercicios = []
                    resposta.json().then(json => {

                        for (let i = 0; i < json.length; i++) {
                            var exercicio = {
                                idExercicio: json[i].idExercicio,
                                nomeExercicio: json[i].nome,
                                fkTreino: json[i].fkTreino
                            }
                            listaExercicios.push(exercicio)
                        }
                        console.table(listaExercicios)
                        for (let j = 0; j < listaExercicios.length; j++) {
                            selectExercicio.innerHTML += `<option class="optExercicio" value="${listaExercicios[j].nomeExercicio}">${listaExercicios[j].nomeExercicio}</option>`
                            console.log(selectExercicio)
                        }
                    })

                    selectExercicio.disabled = false;
                } else {
                    alert('Erro ao recuperar exercicio')
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }
    else {
        alert('Selecione um treino')
        selectExercicio.disabled = true;
    }
})

let proximaAtualizacao;
var selectExercicio = document.getElementById('selectExercicio')
var grafico = document.getElementById("grafico")

selectIntervalo.addEventListener('change', exibirGraficoEvolucaoDoUsuario)

function exibirGraficoEvolucaoDoUsuario() {
    grafico.innerHTML = ''
    if (selectExercicio.value !== '') {
        for (let i = 0; i < listaTreinos.length; i++) {
            if (listaTreinos[i].idTreino == selectTreino.value) {
                var nomeTreino = listaTreinos[i].nomeTreino;
                break;
            }
        }
        grafico.innerHTML += `
                        <h3 id="tituloGraficos">
                            <span id="tituloGrafico">Exibindo evolução média das cargas do treino: <b>${nomeTreino}</b> para o exercício: <b>${selectExercicio.value}</b> dos últimos ${selectIntervalo.value} meses</span>
                        </h3>
                        <div class="graph">
                            <canvas id="myChartCanvas"></canvas>
                        </div>
                `
    }
    else {

        alert('Selecione um exercício')
    }

}