import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  HttpStatus,
  Res,
  HttpCode,
} from '@nestjs/common';
import { Response } from 'express';
import { ResearchDetailsService } from './research-details.service';
import { CreateResearchDetailDto } from './dto/create-research-detail.dto';
import { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';

@Controller('research-details')
export class ResearchDetailsController {
  constructor(
    private readonly researchDetailsService: ResearchDetailsService,
  ) {}

  @Post()
  async create(
    @Body() createResearchDetailDto: CreateResearchDetailDto,
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ) {
    // console.log({ createResearchDetailDto })
    const { user } = request;
    const createdResearchDetail = await this.researchDetailsService.create(
      createResearchDetailDto,
      user,
    );

    console.log({ createdResearchDetail });
    response
      .status(HttpStatus.CREATED)
      .location(`/research-details/${createdResearchDetail.id}`)
      .json(createdResearchDetail);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.researchDetailsService.findOne(id);
  }

  @Get()
  async findAll(@Req() request: RequestWithUser) {
    const { user } = request;
    return await this.researchDetailsService.findAll(user.sub);
  }

  @Delete()
  @HttpCode(204)
  async deleteAll(@Req() request: RequestWithUser) {
    const { user } = request;
    return await this.researchDetailsService.deleteAll(user.sub);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateResearchDetailDto: UpdateResearchDetailDto) {
  //   return this.researchDetailsService.update(+id, updateResearchDetailDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.researchDetailsService.remove(+id);
  // }
}
