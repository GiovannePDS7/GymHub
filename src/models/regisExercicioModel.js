var database = require("../database/config")

async function pegarExercicio(idTreino) {

    var pegarExercicios = `
       select * from exercicio where fkTreino = '${idTreino}';
    `;
    try{
        
        console.log("Executando a instrução SQL: \n" + pegarExercicios);
        return database.executar(pegarExercicios);
    }
    catch(erro){
        throw erro;
    }

}

module.exports = {
    pegarExercicio
};