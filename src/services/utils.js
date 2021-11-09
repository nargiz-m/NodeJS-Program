function errorResponse(schemaErrors) {
    const errors = schemaErrors.map((error) => {
        let { path, message } = error;
        return { path, message };
    })
    return {
        status: 'failed',
        errors,
    }
}

export function validateSchema(schema) {
    return (req, res, next) => {
        const {error} = schema.validate(req.body, {
            abortEarly: true,
            allowUnknown: false
        });

        if(error && error.isJoi) {
            return res.status(400).json(errorResponse(error.details))
        }
        next();
    }
}