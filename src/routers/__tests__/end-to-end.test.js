import request from "supertest";
import { app } from "../../app.js";

describe('End to end tests', () => {
    it('Working with group, users and user groups', async () => {
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

        const userGroupsPosted = await request(app).post('/usergroups').send({
            groupId: groupPosted.body.id,
            userIds: [5, 22]
        }).set('authorization', `Bearer ${loginResponse.body.accessToken}`);
        expect(userGroupsPosted.statusCode).toBe(200);
        
        const groupDeleted = await request(app).delete(`/groups/${groupPosted.body.id}`)
            .set('authorization', `Bearer ${loginResponse.body.accessToken}`);
        expect(groupDeleted.statusCode).toBe(200);

        const groupDeletedRequested = await request(app).get(`/groups/${groupPosted.body.id}`)
            .set('authorization', `Bearer ${loginResponse.body.accessToken}`);
        expect(groupDeletedRequested.statusCode).toBe(500);

        const userGroupsRequested = await request(app).get('/usergroups')
            .set('authorization', `Bearer ${loginResponse.body.accessToken}`);
        const removedUserGroupIds = userGroupsPosted.body.map(x => x.id);
        const userGroupIds = userGroupsRequested.body.map(x => x.id);
        expect(userGroupIds).not.toContain(removedUserGroupIds);
    }, 10000);
});