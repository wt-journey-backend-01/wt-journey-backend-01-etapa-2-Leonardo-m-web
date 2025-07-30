const repositories = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const { casoSchema } = require('../utils/casosValidation');

class ApiError extends Error{
    constructor(message, statusCode = 500) {
        super(message);
        this.name = 'ApiError';
        this.statusCode = statusCode;
    }
}

const getCase = (req, res, next) =>{
    try{
        let casos = repositories.findC();

        let { status } = req.query;

        if (status) {
            casos = casos.filter(c => c.status === status.toLowerCase());
        }

        res.status(200).json(casos);

    }catch(error){
        next(new ApiError('Erro ao listar casos'));
    };
};

const getCaseById = (req, res, next) =>{
    try{
        let { id } = req.params;
        let caso = repositories.findCById(id);

        if(!caso){
            return next(new ApiError('Caso não encontrado', 404));
        }

        res.status(200).json(caso);

    }catch(error){
        next(new ApiError('Erro ao encontrar o caso'));
    };
};

const createCase = (req, res, next) =>{
    
    try{
        let { titulo, descricao, status, agente_id} = req.body;

        let agenteExiste = agentesRepository.findAById(agente_id);
        if (!agenteExiste) {
            return next(new ApiError('Agente não encontrado para o agente_id informado', 404));
        }

        let newData = {
            titulo,
            descricao,
            status:  status ? status.toLowerCase() : status,
            agente_id
        };
        let data = casoSchema.parse(newData);
        let newCase = repositories.createC(data);

        res.status(201).json(newCase);

    }catch(error){
        next(new ApiError(error.message, 400));
    };
};

const putCase = (req, res, next) =>{
    let {id} = req.params;

    try{
        let data = casoSchema.parse(req.body);
        let update = repositories.putC(id, data);

        if(!update){
            return next(new ApiError('Caso não encontrado', 404))
        }

        res.status(200).json(update);

    }catch(error){
        next(new ApiError(error.message, 400));
    };
};

const patchCase = (req, res, next) =>{
    let { id } = req.params;
    try{

        let casePatchSchema = casoSchema.partial();
        let data = casePatchSchema.parse(req.body); 
        let update = repositories.patchC(id, data);

        if(!update){
            return next(new ApiError('Caso não encontrado', 404))
        }

        res.status(200).json(update);

    }catch(error){
        next(new ApiError(error.message, 400));
    };
};

const deleteCase = (req, res, next) =>{
    let { id } = req.params;

    try{
        let deleted = repositories.removeC(id);
        
        if(!deleted){
            return next(new ApiError('Caso não encontrado', 404))
        }

        res.status(204).send()
        
    }catch(error){
        next(new ApiError(error.message, 400))
    };
};

module.exports = {
    createCase,
    deleteCase,
    getCaseById,
    getCase,
    patchCase,
    putCase
};