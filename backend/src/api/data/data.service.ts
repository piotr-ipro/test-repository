import { Injectable } from '@nestjs/common';

import { RagService } from '../../services/rag/rag.service';
import { DocumentsService } from '../documents/documents.service';

@Injectable()
export class DataService {
    constructor(
        private ragService: RagService,
        private documentsService: DocumentsService,
    ) {}

    public async putDataFileIntoDatabase(file: Express.Multer.File, documentId: string) {
        const content: string = file.buffer.toString('utf-8');
        const source = await this.ragService.addDocument(content, documentId);
        return await this.documentsService.create(documentId, source, content);
    }
}
