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
        if (j < todosExercicios.length) {
            todosExercicios[j].value = listaValores[j]
        }
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
        alert('Não é possível criar um treino sem exercícios')
    }
}

function CriarTreino() {

    var nomeTreinoVar = document.getElementById('treinoNome').value;
    var nomeExerciciosVar = document.querySelectorAll('.exercicio');
    var idUsuarioVar = sessionStorage.ID_USUARIO;

    if (nomeTreinoVar != '') {
        nomeExerciciosVar.forEach(e => {
            console.log(e.value)
            if (e.value == '') {
                alert('Prencha todos os exercícios');
                return false;
            }
        })

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
                    alert('Treino cadastrado com sucesso');
                    setTimeout(() => {
                        window.location = "../../Pages/Inicial/inicial.html";
                    }, "1300");

                } else {
                    var erroDaController = await resposta.json(); //Recebe qualquer erro marcado da controller
                    console.log('Erro ao cadastrar')
                    alert('Erro ao cadastrar: ' + erroDaController.erroEmail) //Se fosse outro erro sem ser de email acredito que daria um alert inconsistente
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });

        return false;

    }
    else {
        alert('Preencha o campo nome do treino')
        return false;
    }








}