var setaIconUser = document.getElementById('setaIconUser');
var containerFerramentas = document.getElementById('containerFerramentas');


setaIconUser.addEventListener('click', function () {

    if (containerFerramentas.style.height == '10%') {

        containerFerramentas.style.height = '0%';
    } else {
        containerFerramentas.style.height = '10%';
    }
})

function Calcular() {
    var spanResultado = document.getElementById('spanResultado')
    spanResultado.innerHTML = ''
    var resultado = document.getElementById('h2Resultado');

    var peso = Number(document.getElementById('peso').value)
    var alturaCm = Number(document.getElementById('altura').value)
    var IMC = 0;
    var alturaM = alturaCm / 100;

    if (peso != 0 && alturaM != 0) {
        IMC = peso / (alturaM * alturaM);
        resultado.innerHTML = 'Resultado:'
        spanResultado.innerHTML = `Seu IMC é: <b>${IMC.toFixed(2)}</b>`
    }
    else {
        containerAlerta.style.display = 'flex'
        mensagem.innerHTML = 'Preencha os dados'
    }

}
var containerAlerta = document.getElementById('containerAlerta')
var mensagem = document.getElementById('mensagem')

function Alerta() {
    containerAlerta.style.display = 'none'
}