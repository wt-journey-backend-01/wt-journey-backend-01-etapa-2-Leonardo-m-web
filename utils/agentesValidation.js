const { z } = require('zod');

const agentSchema = z.object({
    nome : z.string({required_error: 'Nome é obrigatorio'}).min(1, 'Nome não pode ser vazio'),
    dataDeIncorporacao: z.string({required_error: 'Data de incorporação é obrigatoria'}).min(8, 'A data deve estar no formato YYYY/MM/DD'),
    cargo : z.enum(['inspetor', 'delegado', 'perito', 'investigador', 'agente' ], {
        required_error: 'Cargo é obrigatorio .' ,
        invalid_type_error: 'O cargo deve ser ou inspetor ou delegado ou perito ou investigador ou agente'
    })
});

module.exports = { agentSchema };