import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DocumentEntity } from '../../entities';
import { RagService } from '../../services/rag/rag.service';

@Injectable()
export class DocumentsService {
    constructor(
        @InjectRepository(DocumentEntity)
        private readonly documentRepository: Repository<DocumentEntity>,
        private readonly ragService: RagService,
    ) {}

    async create(title: string, source: string, description: string): Promise<DocumentEntity> {
        const doc = this.documentRepository.create({ title, source, description });
        return await this.documentRepository.save(doc);
    }

    async findAll(): Promise<DocumentEntity[]> {
        return await this.documentRepository.find({ order: { createdAt: 'DESC' } });
    }

    async remove(id: number): Promise<void> {
        const doc = await this.documentRepository.findOne({ where: { id } });
        if (doc) {
            await this.documentRepository.delete(id);
            try {
                await this.ragService.deleteDocument(doc.source);
            } catch (err) {
                // log and ignore
            }
        }
    }
}
