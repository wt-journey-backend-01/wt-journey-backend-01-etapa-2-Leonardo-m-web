const repositories = require('../repositories/agentesRepository');
const { agentSchema } = require('../utils/agentesValidation');

class ApiError extends Error{
    constructor(message, statusCode = 500) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
    }
}

const getAgents = (req, res, next) =>{
    try{
        const agentes = repositories.findA();

        const { cargo } = req.query;

        if (cargo) {
            agentes = agentes.filter(c => c.cargo === cargo.toLowerCase());
        }

        const { dataDeIncorporacao } = req.query;

        if (dataDeIncorporacao) {
            agentes = agentes.filter(c => c.dataDeIncorporacao === dataDeIncorporacao);
        }

        res.status(200).json(agentes);

    }catch(error){
        next(new ApiError('Erro ao listar agentes'));
    };
};

const getAgentById = (req, res, next) =>{
    try{
        let { id } = req.params;
        let agente = repositories.findAById(id);

        if(!agente){
            return next(new ApiError('Agente não encontrado', 404));
        }

        res.status(200).json(agente);

    }catch(error){
        next(new ApiError('Erro ao encontrar agente'));
    };
};

const createAgent = (req, res, next) =>{
    
    try{
        let { nome, dataDeIncorporacao, cargo} = req.body;

        let newData = {
            nome,
            dataDeIncorporacao,
            cargo :  cargo ? cargo.toLowerCase() : cargo
        };
        let data = agentSchema.parse(newData);
        let newAgent = repositories.createA(data);

        res.status(201).json(newAgent);

    }catch(error){
        next(new ApiError(error.message, 400));
    };
};

const putAgent = (req, res, next) =>{
    let {id} = req.params;

    try{
        let data = agentSchema.parse(req.body);
        let update = repositories.putA(id, data);

        if(!update){
            return next(new ApiError('Agente não encontrado', 404))
        }

        res.status(200).json(update);

    }catch(error){
        next(new ApiError(error.message, 400));
    };
};

const patchAgent = (req, res, next) =>{
    let { id } = req.params;
    try{
        let agentPatchSchema = agentSchema.partial();
        let data = agentPatchSchema.parse(req.body);
        let update = repositories.patchA(id, data);

        if(!update){
            return next(new ApiError('Agente não encontrado', 404))
        }

        res.status(200).json(update);

    }catch(error){
        next(new ApiError(error.message, 400));
    };
};

const deleteAgent = (req, res, next) =>{
    let { id } = req.params;

    try{
        let deleted = repositories.removeA(id);
        
        if(!deleted){
            return next(new ApiError('Agente não encontrado', 404))
        }

        res.status(204).send()
        
    }catch(error){
        next(new ApiError(error.message, 400))
    };
};

module.exports = {
    createAgent,
    deleteAgent,
    getAgentById,
    getAgents,
    patchAgent,
    putAgent
};