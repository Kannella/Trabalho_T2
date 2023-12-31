const axios = require('axios');

const apiKey = '5e9820182cb91d381baaee523432475b'; 
const nomeCidade = 'Sao Paulo'; // Colocar aqui o nome da cidade desejada

async function obterCoordenadasCidade() {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${nomeCidade}&limit=1&appid=${apiKey}&lang=pt`;

    try {
        const resposta = await axios.get(url);
        const coordenadas = resposta.data[0].lat + ',' + resposta.data[0].lon;  
        return coordenadas;
    } catch (erro) {
        console.error('Erro ao obter coordenadas da cidade:', erro.message);
        throw erro;
    }
}

async function obterCondicoesAtuais(coordenadas) {
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${coordenadas.split(',')[0]}&lon=${coordenadas.split(',')[1]}&appid=${apiKey}&units=metric&lang=pt`;

    try {
        const resposta = await axios.get(url);
        const sensacaoTermicaCelsius = resposta.data.main.feels_like;
        const descricao = resposta.data.weather[0].description;

        console.log('Sensação Térmica (Celsius):', sensacaoTermicaCelsius);
        console.log('Descrição:', descricao);
    } catch (erro) {
        console.error('Erro ao obter condições climáticas atuais:', erro.message);
        throw erro;
    }
}

async function main() {
    try {
        const coordenadas = await obterCoordenadasCidade();
        await obterCondicoesAtuais(coordenadas);
    } catch (erro) {
        console.error('Erro no programa:', erro.message);
    }
}

main();
