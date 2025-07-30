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

        res.status(200).json(agentes);

    }catch(error){
        next(new ApiError('Erro ao listar agentes'));
    };
};

const getAgentById = (req, res, next) =>{
    try{
        const { id } = req.params;
        const agente = repositories.findAById(id);

        res.status(200).json(agente);

    }catch(error){
        next(new ApiError('Erro ao encontrar agente'));
    };
};

const createAgent = (req, res, next) =>{
    
    try{
        const { nome, dataDeIncorporacao, cargo} = req.body;

        const newData = {
            nome,
            dataDeIncorporacao,
            cargo : cargo.toLowerCase()
        };
        const data = agentSchema.parse(newData);
        const newAgent = repositories.createA(data);

        res.status(201).json(newAgent);

    }catch(error){
        next(new ApiError(error.message, 400));
    };
};

const putAgent = (req, res, next) =>{
    const {id} = req.params;

    try{
        const data = agentSchema.parse(req.body);
        const update = repositories.putA(id, data);

        if(!update){
            return next(new ApiError('Agente não encontrado', 404))
        }

        res.status(200).json(update);

    }catch(error){
        next(new ApiError(error.message, 400));
    };
};

const patchAgent = (req, res, next) =>{
    const { id } = req.params;
    try{
        const data = agentSchema.parse(req.body);
        const update = repositories.patchA(id, data);

        if(!update){
            return next(new ApiError('Agente não encontrado', 404))
        }

        res.status(200).json(update);

    }catch(error){
        next(new ApiError(error.message, 400));
    };
};

const deleteAgent = (req, res, next) =>{
    const { id } = req.params;

    try{
        const deleted = repositories.removeA(id);
        
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