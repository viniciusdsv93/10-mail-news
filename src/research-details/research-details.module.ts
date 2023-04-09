import { Module } from '@nestjs/common';
import { ResearchDetailsService } from './research-details.service';
import { ResearchDetailsController } from './research-details.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ResearchDetailsController],
  providers: [ResearchDetailsService, PrismaService]
})
export class ResearchDetailsModule {}
