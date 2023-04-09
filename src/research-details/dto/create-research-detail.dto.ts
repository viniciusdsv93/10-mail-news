import { IsNotEmpty } from "class-validator";

export class CreateResearchDetailDto {
  @IsNotEmpty()
  term: string;
}
