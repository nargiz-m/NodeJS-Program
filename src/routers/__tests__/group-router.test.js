import request from "supertest";
import { groupRouter } from '../group-router.js';
import regeneratorRuntime from "regenerator-runtime";

jest.mock('../../services/GroupService.js', () => ({
    getAllGroups: jest.fn(),
}));
jest.mock('../../services/UserGroupService.js', () => ({
    getAllUserGroups: jest.fn(),
}));
jest.mock('../../helpers/authentication.js', () => ({
    authenticationFunction: jest.fn()
}));

describe('Group router tests', () => {
    describe('GET /groups request', () => {
        it('Getting all groups by GET /groups', async () => {
            const response = await request(groupRouter).get('/groups');
            expect(response.statusCode).toBe(200);
        })
    })
})