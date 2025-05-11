
var setaIconUser = document.getElementById('setaIconUser');
var containerFerramentas = document.getElementById('containerFerramentas');
var listaTreinos = [];
var listaExercicios = [];
var selectTreino = document.getElementById('selectTreino')
var containerExercicios = document.getElementById('containerExercicios');
var linha = document.getElementById('linha')
var linha2 = document.getElementById('linha2')
var btnRegistrar = document.getElementById('btnRegistrar')

var idUsuarioVar = sessionStorage.ID_USUARIO;

setaIconUser.addEventListener('click', function () {
    if (containerFerramentas.style.height == '10%') {

        containerFerramentas.style.height = '0%';
    } else {
        containerFerramentas.style.height = '10%';
    }
})

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
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    linha.style.display = 'block'
                    linha2.style.display = 'block'
                    btnRegistrar.style.display = 'block'

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
                        // console.table(listaExercicios)
                        for (let j = 0; j < listaExercicios.length; j++) {
                            containerExercicios.innerHTML += `
                             <div class="containerExercicio">
                        <div class="containerExInput">
                            <input required type="text" disabled value = "${listaExercicios[j].nomeExercicio}" class="inputForm exercicio" id="${listaExercicios[j].idExercicio}">
                            <label for="${listaExercicios[j].idExercicio}">Nome do ${j + 1}º exercicio</label>
                        </div>
                        <div class="containerCargaRep">
                            <div class="subContainerCargaRep">
                                <input required type="number" [min]='0' class="inputFormCargaRep CargaEx">
                                <label for="inputFormCargaRep">Carga(kg)</label>
                            </div>
                            <div class="subContainerCargaRep">
                                <input required type="number" [min]='0' class="inputFormCargaRep SerieEx">
                                <label for="inputFormCargaRep">Séries</label>
                            </div>
                            <div class="subContainerCargaRep">
                                <input required type="number" class="inputFormCargaRep RepEx">
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

        linha.style.display = 'none'
        linha2.style.display = 'none'
        btnRegistrar.style.display = 'none'

    }
})

function registrarTreino() {

    var treino = document.getElementById('selectTreino');
    var inputFormCargaRep = document.querySelectorAll('.inputFormCargaRep')

    var nomeExercicios = document.querySelectorAll('.exercicio');
    var cargaExercicios = document.querySelectorAll('.CargaEx');
    var serieExercicios = document.querySelectorAll('.SerieEx');
    var repeticaoExercicios = document.querySelectorAll('.RepEx');

    var listaRegisExercicios = [];

    for (let i = 0; i < inputFormCargaRep.length; i++) {
        if (inputFormCargaRep[i].value == '') {
            alert('Preencha todos os dados de cada exercicio')
            return false;
        }
    }


    for (let j = 0; j < nomeExercicios.length; j++) {
        var exercicio = {
            nomeExercicio: nomeExercicios[j].value,
            cargaExercicio: cargaExercicios[j].value,
            serieExercicio: serieExercicios[j].value,
            repeticaoExercicio: repeticaoExercicios[j].value,
        }
        listaRegisExercicios.push(exercicio)
    }

    if (treino.value != '') {

        fetch("/registroTreino/registrarTreino", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                idTreinoServer: treino.value,
                idUsuarioServer: idUsuarioVar,
            }),
        })
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    alert('Registro de treino criado!')


                    for (let i = 0; i < listaRegisExercicios.length; i++) {
                        console.log(listaExercicios[i])
                        fetch("/registroExercicio/registrarExercicio", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                // crie um atributo que recebe o valor recuperado aqui
                                idUsuarioServer: idUsuarioVar,
                                nomeTreinoServer: listaRegisExercicios[i].nomeExercicio,
                                cargaServer: listaRegisExercicios[i].cargaExercicio,
                                serieServer: listaRegisExercicios[i].serieExercicio,
                                repeticoesServer: listaRegisExercicios[i].repeticaoExercicio
                            }),
                        })
                            .then(function (resposta) {
                                console.log("resposta: ", resposta);
                            })
                            .catch(function (resposta) {
                                console.log(`#ERRO: ${resposta}`);
                            });
                    }
                    alert("Check-In realizado com sucesso!")
                    window.location = "../CheckIn/checkIn.html";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    }

    return false;
}