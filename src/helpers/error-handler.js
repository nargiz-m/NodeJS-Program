export const errorHandlerMiddleware = (entity, res) => {
    if(entity) {
        return entity;
    } else {
        res.sendStatus(500);
    }
}