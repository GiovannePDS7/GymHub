var setaIconUser = document.getElementById('setaIconUser');
var containerFerramentas = document.getElementById('containerFerramentas');


setaIconUser.addEventListener('click', function () {

    if (containerFerramentas.style.height == '10%') {

        containerFerramentas.style.height = '0%';
    } else {
        containerFerramentas.style.height = '10%';
    }
})

var i_ex = 1

function AddEx() {
    var listaValores = [];
    var containerExercicios = document.getElementById('containerExercicios')

    var todosExercicios = document.querySelectorAll('.exercicio')
    todosExercicios.forEach(e => {
        listaValores.push(e.value)
    })
    console.log(listaValores)
    i_ex++
    containerExercicios.innerHTML += `
    <div class="containerExercicio">
        <input required type="text" class="inputForm exercicio" id="exercicio${i_ex}">
        <label for="exercicio${i_ex}">Nome do exercício ${i_ex}</label>
    </div>
    `


    var todosExercicios = document.querySelectorAll('.exercicio')
    for (let j = 0; j < listaValores.length; j++) {
        todosExercicios[j].value = listaValores[j]
    }
}

function ExcluirEx() {
    var containerExercicios = document.getElementById('containerExercicios')
    var todosExercicios = containerExercicios.querySelectorAll('.exercicio')
    var ultimoEx = containerExercicios.querySelector('.containerExercicio:last-child')

    if (todosExercicios.length > 1) {
        i_ex--;
        ultimoEx.remove()
    }
    else {
        containerAlerta.style.display = 'flex'
        mensagem.innerHTML = 'Não é possível criar um treino sem exercícios'
    }
}

function CriarTreino() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var nomeTreinoVar = document.getElementById('treinoNome').value;
    var nomeExerciciosVar = document.querySelectorAll('.exercicio');
    var idUsuarioVar = sessionStorage.ID_USUARIO;

    console.log(email)
    console.log(nome)
    console.log(idUsuarioVar)

    if (nomeTreinoVar != '') {

        for (let i = 0; i < nomeExerciciosVar.length; i++) {
            if (nomeExerciciosVar[i].value == '') {
                containerAlerta.style.display = 'flex'
                mensagem.innerHTML = 'Prencha todos os exercícios'
                return false;
            }
        }

        fetch("/treinos/cadastrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // crie um atributo que recebe o valor recuperado aqui
                nomeTreinoServer: nomeTreinoVar,
                idUsuarioServer: idUsuarioVar,
            }),
        })
            .then(async function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) { //Status == 200 'ok'


                    for (let i = 0; i < nomeExerciciosVar.length; i++) {
                        fetch("/exercicios/cadastrar", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                // crie um atributo que recebe o valor recuperado aqui
                                nomeExercicioServer: nomeExerciciosVar[i].value,
                                idUsuarioServer: idUsuarioVar
                            }),
                        })
                            .then(function (resposta) {
                                console.log("resposta: ", resposta);

                                if (resposta.ok) { //Status == 200 'ok'
                                    console.log(resposta);
                                } else {
                                    //Recebe qualquer erro marcado da controller
                                    console.log('Erro ao cadastrar exercicio')
                                }
                            })
                            .catch(function (resposta) {
                                console.log(`#ERRO: ${resposta}`);
                            });
                    }
                    containerAlerta.style.display = 'flex'
                    mensagem.innerHTML = 'Treino cadastrado com sucesso'

                } else {
                    var erroDaController = await resposta.json(); //Recebe qualquer erro marcado da controller
                    console.log('Erro ao cadastrar treino')
                    containerAlerta.style.display = 'flex'
                    mensagem.innerHTML = 'Erro ao cadastrar: ' + erroDaController.erroTreino
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });


        return false;
    }
    else {
        containerAlerta.style.display = 'flex'
        mensagem.innerHTML = 'Preencha o campo nome do treino'
        return false;
    }
}

var containerAlerta = document.getElementById('containerAlerta')
var mensagem = document.getElementById('mensagem')

function Alerta() {
    var valorMensagem = document.getElementById('mensagem').innerText
    if (valorMensagem == 'Treino cadastrado com sucesso') {
        window.location = "../../Pages/CriarTreino/criarTreino.html";
    }
    else {
        containerAlerta.style.display = 'none'
    }
}