const request = require('supertest');
const express = require('express');
const routes = require('./api'); // Replace with the actual path to your routes file
const config = require('../config');

const app = express();

// Assuming you have a middleware like bodyParser for parsing JSON
app.use(express.json());

// Mount your routes
app.use('/api', routes.guest);
app.use('/api', routes.user);

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

describe('Guest Routes', () => {
    it('should register a user', async () => {
        const response = await request(app)
            .post(`/api/register`)
            .send({
                name: makeid(10),
                email: `${makeid(10)}@gmail.com`,
                password: makeid(10),
                role: 'user',
            });

        expect(response.status).toBe(200);

        // Add more assertions based on your application logic
    });

    it('should login a user', async () => {
        const response = await request(app, {
            headers: config.HEADER

        })
            .post(`/api/login`)

            .send({
                email: 'ali@gmail.com',
                password: '123456'
            })

        expect(response.status).toBe(200);
        // Add more assertions based on your application logic
    });
    // Add more tests for other guest routes
});

describe('User Routes', () => {
    // Write similar tests for user routes using request(app)...

    it('should get all users', async () => {
        const response = await request(app, {
            headers: config.HEADER

        })
            .post(`/api/users`)
            .send({ /* Your data */});

        expect(response.status).toBe(200);
        // Add more assertions based on your application logic
    });

    it('should get user by ID', async () => {
        const response = await request(app, {
            headers: config.HEADER

        }).get(`/api/user/656a74f429e937cca293832e`); // Replace 123 with a valid user ID

        expect(response.status).toBe(200);
        // Add more assertions based on your application logic
    });
    // Add more tests for other user routes
});

// Add more describe blocks for other route groups if needed
