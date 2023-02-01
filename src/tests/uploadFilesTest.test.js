const request = require('supertest')
const { app } = require('../app')
const Files = require('../models/Files')

jest.mock('../models/Files')

describe('POST /arquivos/posts', () => {
    let userId

    beforeEach(() => {
        userId = '12345';
        Files.create.mockResolvedValue({
          ...req.file, url: "", usuario: userId
        });
      });
      
      afterEach(() => {
        Files.create.mockReset();
      });

      it('creates a post and returns it', async () => {
        const file = {
          originalname: 'file.jpg',
          size: 1024,
          buffer: Buffer.from('file content')
        };
        const response = await request(app)
          .post('/arquivos/posts')
          .set('Authorization', `Bearer ${userId}`)
          .attach('file', file.buffer, file.originalname)
          .expect(200);
        
        expect(Files.create).toHaveBeenCalledWith({
          ...file, url: "", usuario: userId
        });
        expect(response.body).toEqual({
          ...file, url: "", usuario: userId
        });
    });
});