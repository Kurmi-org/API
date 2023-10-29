module.exports = {
    Error: {
        type: 'object',
        properties: {
            message: {
                type: 'string',
                description: 'Mensaje de error'
            }
        },
        required: ['message']
    }
};