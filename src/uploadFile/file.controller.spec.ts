import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from "@nestjs/common";
import { FilesService } from "./file.service";
import { AppModule } from "../app.module";
describe('Files upload', () => {
  const filePath = `./uploads/test.jpeg`;
  let app: INestApplication;
  let catsService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(FilesService)
      .useValue(catsService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/Post files`, async () => {
    await request(app.getHttpServer()) 
      .post('/files/upload')           // Attach the file with key 'file' which is corresponding to your endpoint setting. 
          .attach('files', filePath)
          .then((res) => {
            expect(res.status).toBe(201);
          })
          .catch(err => console.log(err));
  });

});