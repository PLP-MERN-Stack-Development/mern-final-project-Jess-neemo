import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import app from '../server.js'; // This must work now
import Report from '../models/Report.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Report.deleteMany();
});

describe('POST /api/reports', () => {
  it('should create a new anonymous report', async () => {
    const res = await request(app)
      .post('/api/reports')
      .send({
        title: 'Test',
        description: 'Test report',
        contactMethod: 'anonymous'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test');
  });
});