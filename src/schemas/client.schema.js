
module.exports = {
    Client: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
                description: 'Identificador único del cliente'
            },
            email: {
                type: 'string',
                format: 'email',
                description: 'Correo electrónico del cliente'
            },
            name: {
                type: 'string',
                description: 'Nombre del cliente'
            }
        },
        required: ['id', 'email', 'name']
    }
};