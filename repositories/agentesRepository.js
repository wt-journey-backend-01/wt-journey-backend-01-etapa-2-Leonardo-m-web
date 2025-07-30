const  { v4: uuidv4} = require('uuid');

const agentes = [
    {
        id: uuidv4(),
        nome : "Geraldo da Silva",
        dataDeIncorporacao : "2010-09-10",
        cargo : "inspetor"
    },
    {
        id: uuidv4(),
        nome : "Arnaldo Oliveira",
        dataDeIncorporacao : "2011-01-12",
        cargo : "inspetor"
    },
    {
        id: uuidv4(),
        nome : "José Augusto",
        dataDeIncorporacao : "2006-03-19",
        cargo : "delegado"
    }
];

const findA = () => agentes;

const findAById = (id) => animais.find((a) => a.id === id);

const createA = (dados) =>{
    const novoAgente = {
        id: uuidv4(),
        ...dados
    }
    agentes.push(novoAgente);
    return novoAgente
};

const putA = (id, dados) =>{
    const index = agentes.findIndex((a) => a.id === id);

    if(index != -1){
        agentes[index] = { ...agentes[index], ...dados};
        return agentes[index];
    };

    return null;
};

const patchA = (id, dados) =>{
    const index = agentes.findIndex((a) => a.id === id);

    if(index != -1){
        agentes[index] = { ...agentes[index], ...dados};
        return agentes[index];
    };

    return null;
};

const removeA = (id) =>{
    const index = agentes.findIndex((a) => a.id === id);

    if(index != -1){
        agentes.splice(index, 1);
        return true;
    };
    return false;
};

module.exports = {
    findA,
    findAById,
    removeA,
    putA,
    patchA,
    createA
};