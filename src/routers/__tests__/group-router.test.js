import request from "supertest";
import { app } from "../../app.js";

jest.mock('../../helpers/authentication.js', () => ({
    authenticationFunction: jest.fn((req, res, next) => next())
}));

describe('Group router tests', () => {
    describe('Group router unit tests', () => {
        it('Getting all groups by GET /groups', async () => {
            const response = await request(app).get('/groups');
            expect(response.statusCode).toBe(200);
        });
        it('Getting group by id by GET /groups/ID', async () => {
            const response = await request(app).get('/groups/2');
            expect(response.statusCode).toBe(200);
        });
    });
});