var database = require("../database/config")

async function pegarExercicio(idTreino) {

    var pegarExercicios = `
       select * from exercicio where fkTreino = '${idTreino}';
    `;
    try {

        console.log("Executando a instrução SQL: \n" + pegarExercicios);
        return database.executar(pegarExercicios);
    }
    catch (erro) {
        throw erro;
    }

}

async function registrarExercicio(idUsuario, nomeTreino, carga, series, repeticoes) {

    var pegarPkComposta = `
       select idRegisTreino, fkTreino from registro_treino where fkUsuario = ${idUsuario} order by idRegisTreino desc limit 1; 
    `
    try {
        var PkComposta = await database.executar(pegarPkComposta);

        console.log("Executando a instrução SQL: \n" + pegarPkComposta);

        console.log(PkComposta)

        idRegisTreino = PkComposta[0].idRegisTreino;
        fkTreino = PkComposta[0].fkTreino;

        var instrucaoSql = `
        INSERT INTO registro_exercicio (fkRegisTreino, fkTreino, nome, carga, series, repeticoes) VALUES ('${idRegisTreino}', '${fkTreino}', '${nomeTreino}','${carga}','${series}','${repeticoes}');
    `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);

    } catch (erro) {
        throw erro;
    }

}

async function pegarUltimosDados(idTreino, nomeExercicio, intervalo) {

    console.log('idTreino: ' + idTreino)
    console.log('nomeExercicio: ' + nomeExercicio)
    console.log('intervalo: ' + intervalo)


    var instrucaoSql = `
select
    date_format(data, '%M') as mes,
    round(avg(carga), 1) as media_carga
from
    registro_exercicio
where
    nome = '${nomeExercicio}'
    and data between date_format(curdate() - interval '${(intervalo - 1)}' month,  '%Y-%m-01')
                and curdate()
    and fkTreino = '${idTreino}'
group by
     date_format(data, '%M'), year(data), month(data)
order by
    year(data), month(data)  desc
limit ${intervalo};
`;

    try {
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        var resposta = await database.executar(instrucaoSql);

        for (let i = 0; i < resposta.length; i++) {
            var mes = resposta[i].mes;

            switch (mes) {
                case 'January':
                    resposta[i].mes = 'Janeiro';
                    break;
                case 'February':
                    resposta[i].mes = 'Fevereiro';
                    break;
                case 'March':
                    resposta[i].mes = 'Março';
                    break;
                case 'April':
                    resposta[i].mes = 'Abril';
                    break;
                case 'May':
                    resposta[i].mes = 'Maio';
                    break;
                case 'June':
                    resposta[i].mes = 'Junho';
                    break;
                case 'July':
                    resposta[i].mes = 'Julho';
                    break;
                case 'August':
                    resposta[i].mes = 'Agosto';
                    break;
                case 'September':
                    resposta[i].mes = 'Setembro';
                    break;
                case 'October':
                    resposta[i].mes = 'Outubro';
                    break;
                case 'November':
                    resposta[i].mes = 'Novembro';
                    break;
                case 'December':
                    resposta[i].mes = 'Dezembro';
                    break;
                default:
                    resposta[i].mes = mes;
                    break;
            }
        }
        return resposta;
    } catch (error) {
        console.error('Erro ao pegar últimos dados:', error);
        throw error;
    }
}

async function pegarDadosTempoReal(idTreino, nomeExercicio) {
    var instrucaoSql = `select
    date_format(data, '%M') as mes,
    round(avg(carga), 1) as media_carga
from
    registro_exercicio
where
    nome = '${nomeExercicio}'
    and fkTreino = '${idTreino}'
group by
     date_format(data, '%M'), year(data), month(data)
order by
    year(data), month(data) desc
limit 1;
`;

    try {
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        var resposta = await database.executar(instrucaoSql);

        var mes = resposta[0].mes;

        switch (mes) {
            case 'January':
                resposta[0].mes = 'Janeiro';
                break;
            case 'February':
                resposta[0].mes = 'Fevereiro';
                break;
            case 'March':
                resposta[0].mes = 'Março';
                break;
            case 'April':
                resposta[0].mes = 'Abril';
                break;
            case 'May':
                resposta[0].mes = 'Maio';
                break;
            case 'June':
                resposta[0].mes = 'Junho';
                break;
            case 'July':
                resposta[0].mes = 'Julho';
                break;
            case 'August':
                resposta[0].mes = 'Agosto';
                break;
            case 'September':
                resposta[0].mes = 'Setembro';
                break;
            case 'October':
                resposta[0].mes = 'Outubro';
                break;
            case 'November':
                resposta[0].mes = 'Novembro';
                break;
            case 'December':
                resposta[0].mes = 'Dezembro';
                break;
            default:
                resposta[0].mes = mes;
                break;
        }

        return resposta;
    } catch (error) {
        console.error('Erro ao pegar últimos dados em tempo real:', error);
        throw error;
    }
}
module.exports = {
    pegarExercicio,
    registrarExercicio,
    pegarUltimosDados,
    pegarDadosTempoReal
};