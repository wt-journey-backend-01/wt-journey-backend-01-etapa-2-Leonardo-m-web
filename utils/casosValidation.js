const { z } = require('zod');

const casoSchema = z.object({
    titulo : z.string({required_error: 'O titulo é obrigatorio'}).min(1, 'Titulo não pode ser vazio'),
    descricao : z.string({required_error: 'A descrição é obrigatoria .'}).min(1, 'A descrição não pode ser vazia'),
    status : z.enum(['aberto', 'solucionado'] , {
        required_error: 'O status é obrigatorio',
        invalid_type_error: 'O status deve ser apenas aberto ou solucionado'
    })
});

module.exports = {casoSchema};