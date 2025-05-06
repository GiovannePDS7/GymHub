function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var [primeiroNome] = nome.split(' ');

    var b_usuario = document.getElementById("b_usuario");

    if (email != null && nome != null) {
        b_usuario.innerHTML = primeiroNome;
    } else {
        window.location = "../../Pages/Login/login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../../Pages/Login/login.html";
}

function verificarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (email != null && nome != null){
        window.location = "../../Pages/Inicial/inicial.html";
    }
}