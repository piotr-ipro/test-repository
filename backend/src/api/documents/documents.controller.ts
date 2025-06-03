import { Controller, Delete, Get, Param } from '@nestjs/common';

import { DocumentEntity } from '../../entities';
import { DocumentsService } from './documents.service';

@Controller('api/documents')
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) {}

    @Get()
    async findAll(): Promise<DocumentEntity[]> {
        return await this.documentsService.findAll();
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        await this.documentsService.remove(Number(id));
    }
}
