import request from "supertest";
import { app } from "../../app.js";

describe('Group router integration tests', () => {
    it('Working with a group', async () => {
        const loginResponse = await request(app).post('/login').send({
            username: "Levine",
            password: "Clay"
        });
        const groupPosted = await request(app).post('/groups').send({
            name: "testGroup",
            permissions: ["WRITE"]
        }).set('authorization', `Bearer ${loginResponse.body.accessToken}`);
        expect(groupPosted.statusCode).toBe(200);

        const groupRequested = await request(app).get(`/groups/${groupPosted.body.id}`)
            .set('authorization', `Bearer ${loginResponse.body.accessToken}`);
        expect(groupRequested.statusCode).toBe(200);
        expect(groupRequested.body.name).toBe("testGroup");

        const groupDeleted = await request(app).delete(`/groups/${groupPosted.body.id}`)
            .set('authorization', `Bearer ${loginResponse.body.accessToken}`);
        expect(groupDeleted.statusCode).toBe(200);

        const groupDeletedRequested = await request(app).get(`/groups/${groupPosted.body.id}`)
            .set('authorization', `Bearer ${loginResponse.body.accessToken}`);
        expect(groupDeletedRequested.statusCode).toBe(500);
    });
});