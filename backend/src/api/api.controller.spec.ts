import { Test, TestingModule } from '@nestjs/testing';

import { ApiController } from './api.controller';
import { ApiService } from './api.service';

describe('AppController', () => {
    let appController: ApiController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ApiController],
            providers: [ApiService],
        }).compile();

        appController = app.get<ApiController>(ApiController);
    });

    describe('root', () => {
        it('should return "Local Lama API Service"', () => {
            expect(appController.getApiDetails().name).toBe('Local Lama API Service');
        });
    });
});
