import { Injectable } from '@nestjs/common';
import { FileStorage } from 'src/domain/interfaces/file.storage.interface';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LocalFileStorageAdapter implements FileStorage {
  private uploadPath = path.resolve(__dirname, '../../../uploads');

  constructor() {
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`; 
    const filePath = path.join(this.uploadPath, fileName);

    await fs.promises.writeFile(filePath, file.buffer);

        const host = process.env.UPLOAD_HOST ?? 'http://localhost';
    const port = process.env.PORT ?? '8080';

    return `${host}:${port}/uploads/${fileName}`;
  }
}
