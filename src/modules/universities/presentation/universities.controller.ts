import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Public } from '../../../shared/decorators/public.decorator';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUniversityDto } from './dto/create-university.dto';
import { UpdateUniversityDto } from './dto/update-university.dto';
import { ListUniversitiesDto } from './dto/list-universities.dto';
import { CreateUniversityUseCase } from '../application/use-cases/create-university.use-case';
import { ListUniversitiesUseCase } from '../application/use-cases/list-universities.use-case';
import { GetUniversityByIdUseCase } from '../application/use-cases/get-university-by-id.use-case';
import { UpdateUniversityUseCase } from '../application/use-cases/update-university.use-case';
import { DeleteUniversityUseCase } from '../application/use-cases/delete-university.use-case';
import { toUniversityResponse, toUniversityResponseList } from '../application/mappers/university.mapper';

@ApiTags('Universities')
@Controller('universities')
export class UniversitiesController {
  constructor(
    private readonly createUC: CreateUniversityUseCase,
    private readonly listUC: ListUniversitiesUseCase,
    private readonly getByIdUC: GetUniversityByIdUseCase,
    private readonly updateUC: UpdateUniversityUseCase,
    private readonly deleteUC: DeleteUniversityUseCase,
  ) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new university with all its details' })
  @ApiResponse({ status: 201, description: 'University created successfully' })
  @ApiResponse({ status: 409, description: 'University name already exists' })
  create(@Body() dto: CreateUniversityDto) {
    return this.createUC.execute(dto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get paginated list of universities' })
  async list(@Query() query: ListUniversitiesDto) {
    const { data, total } = await this.listUC.execute(query);
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return {
      data: toUniversityResponseList(data),
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a university by id with all relations' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const uni = await this.getByIdUC.execute(id);
    return toUniversityResponse(uni);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a university' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUniversityDto,
  ) {
    return this.updateUC.execute(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a university' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteUC.execute(id);
  }
}
