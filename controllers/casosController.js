const repositories = require('../repositories/casosRepository');
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
        const casos = repositories.findC();

        res.status(200).json(casos);

    }catch(error){
        next(new ApiError('Erro ao listar casos'));
    };
};

const getCaseById = (req, res, next) =>{
    try{
        const { id } = req.params;
        const caso = repositories.findCById(id);

        res.status(200).json(caso);

    }catch(error){
        next(new ApiError('Erro ao encontrar o caso'));
    };
};

const createCase = (req, res, next) =>{
    
    try{
        const { titulo, descricao, status, agente_id} = req.body;

        const newData = {
            titulo,
            descricao,
            status: status.toLowerCase(),
            agente_id
        };
        const data = casoSchema.parse(newData);
        const newCase = repositories.createC(data);

        res.status(201).json(newCase);

    }catch(error){
        next(new ApiError(error.message, 400));
    };
};

const putCase = (req, res, next) =>{
    const {id} = req.params;

    try{
        const data = casoSchema.parse(req.body);
        const update = repositories.putC(id, data);

        if(!update){
            return next(new ApiError('Caso não encontrado', 404))
        }

        res.status(200).json(update);

    }catch(error){
        next(new ApiError(error.massage, 400));
    };
};

const patchCase = (req, res, next) =>{
    const { id } = req.params;
    try{
        const data = casoSchema.parse(req.body);
        const update = repositories.patchC(id, data);

        if(!update){
            return next(new ApiError('Caso não encontrado', 404))
        }

        res.status(200).json(update);

    }catch(error){
        next(new ApiError(error.message, 400));
    };
};

const deleteCase = (req, res, next) =>{
    const { id } = req.params;

    try{
        const deleted = repositories.removeC(id);
        
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