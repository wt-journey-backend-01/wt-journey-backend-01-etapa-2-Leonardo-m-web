const { z } = require('zod');

const agentSchema = z.object({
    nome : z.string({required_error: 'Nome é obrigatorio'}).min(1, 'Nome não pode ser vazio'),
    dataDeIncorporacao: z.string.refine(date => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        if (!regex.test(date)) return false;
        const inputDate = new Date(date);
        const now = new Date();
        return inputDate <= now;
        }, {
        message: "Data de incorporação deve estar no formato YYYY-MM-DD e não pode ser futura"
    }),
    cargo : z.enum(['inspetor', 'delegado', 'perito', 'investigador', 'agente' ], {
        required_error: 'Cargo é obrigatorio .' ,
        invalid_type_error: 'O cargo deve ser ou inspetor ou delegado ou perito ou investigador ou agente'
    })
});

module.exports = { agentSchema };