var setaIconUser = document.getElementById('setaIconUser');
var containerFerramentas = document.getElementById('containerFerramentas');


setaIconUser.addEventListener('click', function (){

    if(containerFerramentas.style.height == '10%'){

        containerFerramentas.style.height = '0%';
    }else{
        containerFerramentas.style.height = '10%';
    }
})