const  { v4: uuidv4} = require('uuid');

const casos = [
    
];

const findC = () => casos;

const findCById = (id) => casos.find((a) => a.id === id);

const createC = ( dados) =>{
    let novoCaso ={
        id: uuidv4(),
        ...dados
    };
    casos.push(novoCaso);
    return novoCaso;
}

const putC = (id, dados) =>{
    let index = casos.findIndex((a) => a.id ===id);

    if(index != -1){
        let { id: _, ...dadosSemId } = dados;
        casos[index] = { ...casos[index], ...dadosSemId};
        return casos[index];
    };
    return null;
};

const patchC = (id, dados) =>{
    let index = casos.findIndex((a) => a.id ===id);

    if(index != -1){
        let { id: _, ...dadosSemId } = dados;
        casos[index] = { ...casos[index], ...dadosSemId};
        return casos[index];
    };

    return null;
};

const removeC = (id) =>{
    let index = casos.findIndex((a) => a.id ===id);

    if(index != -1){
        casos.splice(index, 1);
        return true;
    };

    return false;
};


module.exports ={
    findC,
    findCById,
    removeC,
    putC,
    patchC,
    createC
}
