var setaIconUser = document.getElementById("setaIconUser");
var containerFerramentas = document.getElementById("containerFerramentas");

setaIconUser.addEventListener("click", function () {
    if (containerFerramentas.style.height == "10%") {
        containerFerramentas.style.height = "0%";
    } else {
        containerFerramentas.style.height = "10%";
    }
});

var idUsuarioVar = sessionStorage.ID_USUARIO;
var listaTreinos = [];
var listaExercicios = [];
var grafico = document.getElementById("grafico");
var indicadores = document.getElementById("indicadores");

function RecuperarTreinos() {
    var selectTreino = document.getElementById("selectTreino");

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
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then((json) => {
                    // console.log(json);

                    if (json.length == 0) {
                        alert("Você não possui treinos cadastrados, crie um já!");

                        window.location = "../../Pages/CriarTreino/criarTreino.html";
                    }
                    for (let i = 0; i < json.length; i++) {
                        var treino = {
                            nomeTreino: json[i].nome,
                            idTreino: json[i].idTreino,
                            fkUsuario: json[i].fkUsuario,
                        };
                        listaTreinos.push(treino);
                    }

                    for (let j = 0; j < listaTreinos.length; j++) {
                        selectTreino.innerHTML += `<option class="optTreino" value="${listaTreinos[j].idTreino}">${listaTreinos[j].nomeTreino}</option>`;
                    }
                });
            } else {
                alert("Erro ao recuperar treino");
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
    return false;
}
addEventListener("DOMContentLoaded", function () {
    // ativa quando o HTML for totalmente carregado
    RecuperarTreinos();
});

var selectExercicio = document.getElementById("selectExercicio");
var selectIntervalo = document.getElementById("selectIntervalo");

selectExercicio.addEventListener("change", function () {
    if (selectExercicio.value != "") {
        grafico.innerHTML = "";
        indicadores.innerHTML = "";
        containerGrafico.style.height = '0';
        selectIntervalo.innerHTML =
            '<option class="optIntervalo" value="">Selecione o intervalo</option><option class="optIntervalo" value="3">Últimos 3 meses</option>   <option class="optIntervalo" value="6">Últimos 6 meses</option> <option class="optIntervalo" value="12">Últimos 12 meses</option>';
        selectIntervalo.disabled = false;
    } else {
        grafico.innerHTML = "";
        alert("Selecione um exercício");
        selectIntervalo.innerHTML =
            '<option class="optIntervalo" value="">Selecione o intervalo</option>';
        selectIntervalo.disabled = true;
    }
});

selectTreino.addEventListener("change", function () {
    grafico.innerHTML = "";
    indicadores.innerHTML = "";
    containerGrafico.style.height = '0';
    selectExercicio.innerHTML =
        '<option class="optExercicio" value="">Selecione o Exercicio</option>';
    selectIntervalo.innerHTML =
        '<option class="optIntervalo" value="">Selecione o intervalo</option>';
    if (selectTreino.value != "") {
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
                    listaExercicios = [];
                    resposta.json().then((json) => {
                        for (let i = 0; i < json.length; i++) {
                            var exercicio = {
                                idExercicio: json[i].idExercicio,
                                nomeExercicio: json[i].nome,
                                fkTreino: json[i].fkTreino,
                            };
                            listaExercicios.push(exercicio);
                        }
                        console.table(listaExercicios);
                        for (let j = 0; j < listaExercicios.length; j++) {
                            selectExercicio.innerHTML += `<option class="optExercicio" value="${listaExercicios[j].nomeExercicio}">${listaExercicios[j].nomeExercicio}</option>`;
                            console.log(selectExercicio);
                        }
                    });

                    selectExercicio.disabled = false;
                } else {
                    alert("Erro ao recuperar exercicio");
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });
    } else {
        alert("Selecione um treino");
        selectExercicio.disabled = true;
    }
});

let proximaAtualizacao;
var selectExercicio = document.getElementById("selectExercicio");
selectIntervalo.addEventListener("change", obterDadosGrafico);

var containerGrafico = document.getElementById('containerGrafico')
function obterDadosGrafico() {
    grafico.innerHTML = "";
    indicadores.innerHTML = "";
    containerGrafico.style.height = '0';
    if (selectIntervalo.value == "") {
        alert("Selecione o intervalo");
        return false;
    }

    var idTreino = selectTreino.value;
    var nomeExercicio = selectExercicio.value;
    var intervalo = selectIntervalo.value;
    if (nomeExercicio !== "") {
        for (let i = 0; i < listaTreinos.length; i++) {
            if (listaTreinos[i].idTreino == selectTreino.value) {
                var nomeTreino = listaTreinos[i].nomeTreino;
                break;
            }
        }

        if (proximaAtualizacao != undefined) {
            clearTimeout(proximaAtualizacao);
        }

        console.log("idTreino: " + idTreino);
        console.log("nomeExercicio: " + nomeExercicio);
        console.log("intervalo: " + intervalo);

        fetch(
            `/registroExercicio/pegarUltimosDados/${idTreino}/${nomeExercicio}/${intervalo}`,
            { cache: "no-store" }
        )
            .then(function (response) {
                if (response.ok) {
                    response.json().then(function (resposta) {
                        console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                        resposta.reverse();
                        grafico.innerHTML += `
                        <h3 id="tituloGraficos">
                            <span id="tituloGrafico">Evolução média das cargas do treino: <b>${nomeTreino}</b> para o exercício: <b>${selectExercicio.value}</b> dos últimos <b>${selectIntervalo.value}</b> meses</span>
                        </h3>
                        <div id="graph">
                            <canvas id="myChartCanvas"></canvas>
                        </div>
                `;



                        fetch(`/registroExercicio/CheckIns/${idUsuarioVar}/${intervalo}`, {
                            cache: "no-store",
                        })
                            .then(function (resposta) {
                                if (resposta.ok) {
                                    resposta.json().then((json) => {
                                        if (json.length == 0) {
                                            alert("Você não possui Check-In's , realize um já!");
                                            window.location = "../../Pages/CheckIn/checkIn.html";
                                        }
                                        indicadores.innerHTML = `<div class="kpi">
                    <span class="kpiTitle" id="kpiTitle1"></span>
                    <span class="valorKPI" id="kp1"></span>
                </div>
                <div class="kpi">
                    <span class="kpiTitle" id="kpiTitle2"></span>
                    <span class="valorKPI" id="kp2"></span>
                </div>
                <div class="kpi">
                    <span class="kpiTitle" id="kpiTitle3"></span>
                    <span class="valorKPI" id="kp3"></span>
                </div>`;
                                        var kp1 = document.getElementById("kp1");
                                        var kpiTitle1 = document.getElementById("kpiTitle1");
                                        kpiTitle1.innerHTML = `Total de Check-In's realizados nos últimos<br><b id="Kpi1Mes">${selectIntervalo.value}</b> meses`;
                                        kp1.innerHTML = `${json[0].CheckIn}`;
                                    });
                                } else {
                                    alert("Nenhum dado encontrado para KPI");
                                    return false;
                                }
                            })
                            .catch(function (error) {
                                console.error(
                                    `Erro na obtenção dos dados p/ KPI: ${error.message}`
                                );
                            });

                        fetch(
                            `/registroExercicio/MaiorFrequencia/${idUsuarioVar}/${intervalo}`,
                            { cache: "no-store" }
                        )
                            .then(function (resposta) {
                                if (resposta.ok) {
                                    resposta.json().then((json) => {
                                        if (json.length == 0) {
                                            alert("Você não possui Check-In's , realize um já!");
                                            window.location = "../../Pages/CheckIn/checkIn.html";
                                        }
                                        var kp2 = document.getElementById("kp2");
                                        var kpiTitle2 = document.getElementById("kpiTitle2");
                                        kpiTitle2.innerHTML = `Treino relizado com maior frequência (<b>${json[0].Frequencia}x</b>) nos últimos <b>${selectIntervalo.value}</b> meses`;
                                        kp2.innerHTML = `${json[0].Treino}`;
                                    });
                                } else {
                                    alert("Nenhum dado encontrado para KPI");
                                    return false;
                                }
                            })
                            .catch(function (error) {
                                console.error(
                                    `Erro na obtenção dos dados p/ KPI: ${error.message}`
                                );
                            });

                        fetch(
                            `/registroExercicio/MenorFrequencia/${idUsuarioVar}/${intervalo}`,
                            { cache: "no-store" }
                        )
                            .then(function (resposta) {
                                if (resposta.ok) {
                                    resposta.json().then((json) => {
                                        if (json.length == 0) {
                                            alert("Você não possui Check-In's , realize um já!");
                                            window.location = "../../Pages/CheckIn/checkIn.html";
                                        }
                                        var kp3 = document.getElementById("kp3");
                                        var kpiTitle3 = document.getElementById("kpiTitle3");
                                        kpiTitle3.innerHTML = `Treino relizado com menor frequência (<b>${json[0].Frequencia}x</b>) nos últimos <b>${selectIntervalo.value}</b> meses`;
                                        kp3.innerHTML = `${json[0].Treino}`;
                                    });
                                } else {
                                    alert("Nenhum dado encontrado para KPI");
                                    return false;
                                }
                            })
                            .catch(function (error) {
                                console.error(
                                    `Erro na obtenção dos dados p/ KPI: ${error.message}`
                                );
                            });

                        plotarGrafico(resposta, idTreino, nomeExercicio, intervalo);
                    });
                } else {
                    grafico.innerHTML = "";
                    selectIntervalo.innerHTML =
                        '<option class="optIntervalo" value="">Selecione o intervalo</option>';
                    selectIntervalo.disabled = true;
                    alert("Nenhum dado encontrado");
                    return false;
                }
            })
            .catch(function (error) {
                console.error(
                    `Erro na obtenção dos dados p/ gráfico: ${error.message}`
                );
            });
    } else {
        alert("Selecione um exercício");
    }
}

function plotarGrafico(resposta, idTreino, nomeExercicio, intervalo) {
    console.log("iniciando plotagem do gráfico...");

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados
    let dados = {
        labels: labels,
        datasets: [
            {
                label: "Carga média em kg",
                data: [],
                fill: false,
                backgroundColor: "#000",
                borderColor: "#D40000",
                borderWidth: 2.5,
                pointBackgroundColor: "#000",
                pointRadius: 5,
            },
        ],
    };

    console.log("----------------------------------------------");
    console.log(
        'Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":'
    );
    console.log(resposta);
    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.mes);
        dados.datasets[0].data.push(registro.media_carga);
    }

    console.log("----------------------------------------------");
    console.log("O gráfico será plotado com os respectivos valores:");
    console.log("Labels:");
    console.log(labels);
    console.log("Dados:");
    console.log(dados.datasets);
    console.log("----------------------------------------------");

    // Criando estrutura para plotar gráfico - config
    const config = {
        type: "line",
        data: dados,
        options: {
            scales: {
                x: {
                    ticks: {
                        color: "#fff",
                    },
                },
                y: {
                    ticks: {
                        color: "#fff",
                    },
                },
            },
        },
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(document.getElementById(`myChartCanvas`), config);
    containerGrafico.style.height = '100vh';
    containerGrafico.scrollIntoView({ block: "center", behavior: "smooth" })
    setTimeout(
        () => atualizarGrafico(idTreino, nomeExercicio, intervalo, dados, myChart),
        2000
    );
}

function atualizarGrafico(idTreino, nomeExercicio, intervalo, dados, myChart) {
    fetch(
        `/registroExercicio/tempo-real/${idTreino}/${nomeExercicio}/${intervalo}`,
        { cache: "no-store" }
    )
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (novoRegistro) {
                    console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                    console.log(`Dados atuais do gráfico:`);
                    console.log(dados);

                    // let avisoCaptura = document.getElementById(`avisoCaptura${idAquario}`)
                    // avisoCaptura.innerHTML = ""

                    if (novoRegistro[0].mes == dados.labels[dados.labels.length - 1]) {
                        console.log(
                            "---------------------------------------------------------------"
                        );
                        console.log(
                            "Como não há dados novos para captura, o gráfico não atualizará."
                        );
                        // avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará."
                        console.log("Mes do novo dado capturado:");
                        console.log(novoRegistro[0].mes);
                        console.log("Mes do último dado capturado:");
                        console.log(dados.labels[dados.labels.length - 1]);
                        console.log(
                            "---------------------------------------------------------------"
                        );
                    } else {
                        // tirando e colocando valores no gráfico
                        dados.labels.shift(); // apagar o primeiro
                        dados.labels.push(novoRegistro[0].mes); // incluir um novo momento

                        dados.datasets[0].data.shift(); // apagar o primeiro de umidade
                        dados.datasets[0].data.push(novoRegistro[0].media_carga); // incluir uma nova medida de umidade

                        myChart.update();
                    }

                    // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                    proximaAtualizacao = setTimeout(
                        () =>
                            atualizarGrafico(
                                idTreino,
                                nomeExercicio,
                                intervalo,
                                dados,
                                myChart
                            ),
                        2000
                    );
                });
            } else {
                console.error("Nenhum dado encontrado ou erro na API");
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(
                    () =>
                        atualizarGrafico(
                            idTreino,
                            nomeExercicio,
                            intervalo,
                            dados,
                            myChart
                        ),
                    2000
                );
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}
