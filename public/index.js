let indicePalavra = 0;
var i = 0
const palavra = ['Treine', 'Evolua', 'Acompanhe'];
const spanTxt = document.getElementById('txtQuadro')


function zerarIndice() {
    if (i > 0) {
        i--;
        spanTxt.innerHTML = spanTxt.innerHTML.slice(0, -1);
        setTimeout(zerarIndice, 120);
    }
    else {
        adicionarLetraPalavra();
    }
}

function adicionarLetraPalavra() {
    for (i; i <= palavra[indicePalavra].length; i++) {
        setTimeout(()=>{
            spanTxt.innerHTML = palavra[indicePalavra].slice(0, i);
        }, 120)
    }
    setTimeout(function () {
        zerarIndice()
        indicePalavra++;
        if (indicePalavra >= palavra.length) {
            indicePalavra = 0;
        }
    }, 1600);
}
adicionarLetraPalavra();

const aInicioHeader = document.getElementById('aInicioHeader');
const sectionInicial = document.getElementById('sectionInicial');

aInicioHeader.addEventListener('click', function (){
    sectionInicial.scrollIntoView({block: "center", behavior: "smooth"})
})

const aObjetivoHeader = document.getElementById('aObjetivoHeader');
const aBtnInicial = document.getElementById('aBtnInicial');
const sectionObjetivo = document.getElementById('sectionObjetivo');

aObjetivoHeader.addEventListener('click', function (){
    sectionObjetivo.scrollIntoView({block: "center", behavior: "smooth"})
})

aBtnInicial.addEventListener('click', function (){
    sectionObjetivo.scrollIntoView({block: "center", behavior: "smooth"})
})

const aFuncionalidadesHeader = document.getElementById('aFuncionalidadesHeader');
const sectionFuncionalidades = document.getElementById('sectionFuncionalidades');

aFuncionalidadesHeader.addEventListener('click', function (){
    sectionFuncionalidades.scrollIntoView({block: "center", behavior: "smooth"})
})
