export const errorHandlerMiddleware = (entity, res) => {
    if(entity == undefined) {
        res.sendStatus(500);
    } else {
        return entity;
    }
}