import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentEntity } from '../../entities';
import { RagModule } from '../../services/rag/rag.module';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';

@Module({
    imports: [TypeOrmModule.forFeature([DocumentEntity]), RagModule],
    controllers: [DocumentsController],
    providers: [DocumentsService],
    exports: [DocumentsService],
})
export class DocumentsModule {}
