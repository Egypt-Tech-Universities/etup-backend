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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProgramDto } from '../application/dtos/create-program.dto';
import { UpdateProgramDto } from '../application/dtos/update-program.dto';
import { ListProgramsDto } from '../application/dtos/list-programs.dto';
import { CreateProgramUseCase } from '../application/use-cases/create-program.use-case';
import { ListProgramsUseCase } from '../application/use-cases/list-programs.use-case';
import { GetProgramByIdUseCase } from '../application/use-cases/get-program-by-id.use-case';
import { GetProgramBySlugUseCase } from '../application/use-cases/get-program-by-slug.use-case';
import { GetProgramsByUniversityUseCase } from '../application/use-cases/get-programs-by-university.use-case';
import { UpdateProgramUseCase } from '../application/use-cases/update-program.use-case';
import { DeleteProgramUseCase } from '../application/use-cases/delete-program.use-case';
import { Public } from '../../../shared/decorators/public.decorator';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { UserRole } from '../../../shared/enums/user-role.enum';

@ApiTags('Programs')
@Controller('programs')
export class ProgramsController {
  constructor(
    private readonly createUC: CreateProgramUseCase,
    private readonly listUC: ListProgramsUseCase,
    private readonly getByIdUC: GetProgramByIdUseCase,
    private readonly getBySlugUC: GetProgramBySlugUseCase,
    private readonly getByUniUC: GetProgramsByUniversityUseCase,
    private readonly updateUC: UpdateProgramUseCase,
    private readonly deleteUC: DeleteProgramUseCase,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new program (Admin only)' })
  @ApiResponse({ status: 201, description: 'Program created' })
  @ApiResponse({ status: 409, description: 'Slug already exists' })
  create(@Body() dto: CreateProgramDto) {
    return this.createUC.execute(dto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'List all programs (public)' })
  async list(@Query() query: ListProgramsDto) {
    const { data, total } = await this.listUC.execute(query);
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  @Public()
  @Get('by-university/:universityId')
  @ApiOperation({ summary: 'Get all programs of a specific university' })
  getByUniversity(@Param('universityId', ParseUUIDPipe) universityId: string) {
    return this.getByUniUC.execute(universityId);
  }

  @Public()
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a program by slug (URL-friendly)' })
  getBySlug(@Param('slug') slug: string) {
    return this.getBySlugUC.execute(slug);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a program by id' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getByIdUC.execute(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a program (Admin only)' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateProgramDto) {
    return this.updateUC.execute(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a program (Admin only)' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteUC.execute(id);
  }
}
