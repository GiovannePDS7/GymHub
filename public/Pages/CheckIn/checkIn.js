
var setaIconUser = document.getElementById('setaIconUser');
var containerFerramentas = document.getElementById('containerFerramentas');
var listaTreinos = [];
var listaExercicios = [];
var selectTreino = document.getElementById('selectTreino')
var containerExercicios = document.getElementById('containerExercicios');

setaIconUser.addEventListener('click', function () {
    if (containerFerramentas.style.height == '10%') {

        containerFerramentas.style.height = '0%';
    } else {
        containerFerramentas.style.height = '10%';
    }
})

function RecuperarTreinos() {

    var idUsuarioVar = sessionStorage.ID_USUARIO;
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

selectTreino.addEventListener('change', function () {
    containerExercicios.innerHTML = '';
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
            .then(async function (resposta) {
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
                        for (let j = 0; j < listaExercicios.length; j++) {
                            containerExercicios.innerHTML += `
                             <div class="containerExercicio">
                        <div class="containerExInput">
                            <input required type="text" disabled value = "${listaExercicios[j].nomeExercicio}" class="inputForm exercicio" id="${listaExercicios[j].idExercicio}">
                            <label for="${listaExercicios[j].idExercicio}">Nome do ${j + 1}º exercicio</label>
                        </div>
                        <div class="containerCargaRep">
                            <div class="subContainerCargaRep">
                                <input required type="number" [min]='0' class="inputFormCargaRep" id="CargaEx-${listaExercicios[j].idExercicio}">
                                <label for="inputFormCargaRep">Carga(kg)</label>
                            </div>
                            <div class="subContainerCargaRep">
                                <input required type="number" [min]='0' class="inputFormCargaRep" id="SerieEx-${listaExercicios[j].idExercicio}">
                                <label for="inputFormCargaRep">Séries</label>
                            </div>
                            <div class="subContainerCargaRep">
                                <input required type="number" class="inputFormCargaRep" id="RepEx-${listaExercicios[j].idExercicio}">
                                <label for="inputFormCargaRep">Repetições</label>
                            </div>
                        </div>
                    </div>
                            `
                        }
                    })


                } else {
                    alert('Erro ao recuperar exercicio')
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }
    else {
        alert('Escolha um treino')
    }
})