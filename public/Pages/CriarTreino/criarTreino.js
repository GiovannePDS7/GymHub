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
    for(let j = 0; j < listaValores.length; j++){
        if(j < todosExercicios.length){
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

    var nomeTreino = document.getElementById('treinoNome').value;

    var nomeExercicios = document.querySelectorAll('.exercicio');

    nomeExercicios.forEach(e => {
        console.log(e.value)
        if (e.value == '') {
            alert('Prencha todos os exercícios');
            return false
        }
    })

}