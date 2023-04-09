import { PartialType } from '@nestjs/swagger';
import { CreateResearchDetailDto } from './create-research-detail.dto';

export class UpdateResearchDetailDto extends PartialType(CreateResearchDetailDto) {}
