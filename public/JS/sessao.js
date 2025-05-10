function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (email == null || nome == null) {
        window.location = "../../Pages/Login/login.html";
    }
    else {
        GetUsuarioNome(nome);
    }
}

function GetUsuarioNome(nome) {
    var [primeiroNome] = nome.split(' ');
    if (nome != null) {
        b_usuario.innerHTML = primeiroNome;
    }
}


function limparSessao() {
    sessionStorage.clear();
    window.location = "../../Pages/Login/login.html";
}

function verificarSessaoIndex() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    if (email != null && nome != null) {
        window.location = "../../Pages/Inicial/inicial.html";
    }
}