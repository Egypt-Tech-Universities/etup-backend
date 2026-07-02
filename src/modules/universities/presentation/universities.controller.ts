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
  ApiQuery,
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
import { UniversityRepository } from '../application/repositories/university.repository';
import { toUniversityResponse, toUniversityResponseList } from '../application/mappers/university.mapper';
import { toFacultyResponseList } from '../application/mappers/faculty.mapper';
import { toUniversityImageResponseList } from '../application/mappers/university-image.mapper';
import { toScholarshipResponseList } from '../application/mappers/scholarship.mapper';
import { toAdmissionRequirementResponseList } from '../application/mappers/admission-requirement.mapper';
import { toContactResponseList } from '../application/mappers/contact.mapper';
import { toSocialLinkResponseList } from '../application/mappers/social-link.mapper';
import { toLeadershipResponseList } from '../application/mappers/leadership.mapper';
import { toWorkingHourResponseList } from '../application/mappers/working-hour.mapper';
import { toTuitionFeeResponseList } from '../application/mappers/tuition-fee.mapper';
import { toAdmissionTimelineResponseList } from '../application/mappers/admission-timeline.mapper';
import { toCampusMomentResponseList } from '../application/mappers/campus-moment.mapper';

@ApiTags('Universities')
@Controller('universities')
export class UniversitiesController {
  constructor(
    private readonly createUC: CreateUniversityUseCase,
    private readonly listUC: ListUniversitiesUseCase,
    private readonly getByIdUC: GetUniversityByIdUseCase,
    private readonly updateUC: UpdateUniversityUseCase,
    private readonly deleteUC: DeleteUniversityUseCase,
    private readonly repo: UniversityRepository,
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
  @ApiOperation({ summary: 'Get a university by id (basic info only)' })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const uni = await this.getByIdUC.execute(id);
    return toUniversityResponse(uni);
  }

  @Public()
  @Get(':id/faculties')
  @ApiOperation({ summary: 'Get faculties of a university' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async listFaculties(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const p = parseInt(page || '1', 10);
    const l = parseInt(limit || '10', 10);
    return this.repo.findFacultiesByUniversityId(id, p, l)
      .then((result) => ({
        data: toFacultyResponseList(result.data),
        meta: { total: result.total, page: result.page, limit: result.limit, totalPages: result.totalPages },
      }));
  }

  @Public()
  @Get(':id/gallery')
  @ApiOperation({ summary: 'Get gallery images of a university' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async listGallery(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const p = parseInt(page || '1', 10);
    const l = parseInt(limit || '10', 10);
    return this.repo.findGalleryByUniversityId(id, p, l)
      .then((result) => ({
        data: toUniversityImageResponseList(result.data),
        meta: { total: result.total, page: result.page, limit: result.limit, totalPages: result.totalPages },
      }));
  }

  @Public()
  @Get(':id/scholarships')
  @ApiOperation({ summary: 'Get scholarships of a university' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async listScholarships(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const p = parseInt(page || '1', 10);
    const l = parseInt(limit || '10', 10);
    return this.repo.findScholarshipsByUniversityId(id, p, l)
      .then((result) => ({
        data: toScholarshipResponseList(result.data),
        meta: { total: result.total, page: result.page, limit: result.limit, totalPages: result.totalPages },
      }));
  }

  @Public()
  @Get(':id/admission-requirements')
  @ApiOperation({ summary: 'Get admission requirements of a university' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async listAdmissionRequirements(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const p = parseInt(page || '1', 10);
    const l = parseInt(limit || '10', 10);
    return this.repo.findAdmissionRequirementsByUniversityId(id, p, l)
      .then((result) => ({
        data: toAdmissionRequirementResponseList(result.data),
        meta: { total: result.total, page: result.page, limit: result.limit, totalPages: result.totalPages },
      }));
  }

  @Public()
  @Get(':id/tuition-fees')
  @ApiOperation({ summary: 'Get tuition fees of a university' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async listTuitionFees(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const p = parseInt(page || '1', 10);
    const l = parseInt(limit || '10', 10);
    return this.repo.findTuitionFeesByUniversityId(id, p, l)
      .then((result) => ({
        data: toTuitionFeeResponseList(result.data),
        meta: { total: result.total, page: result.page, limit: result.limit, totalPages: result.totalPages },
      }));
  }

  @Public()
  @Get(':id/contacts')
  @ApiOperation({ summary: 'Get contacts of a university' })
  async listContacts(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.repo.findContactsByUniversityId(id);
    return toContactResponseList(data);
  }

  @Public()
  @Get(':id/social-links')
  @ApiOperation({ summary: 'Get social links of a university' })
  async listSocialLinks(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.repo.findSocialLinksByUniversityId(id);
    return toSocialLinkResponseList(data);
  }

  @Public()
  @Get(':id/leadership')
  @ApiOperation({ summary: 'Get leadership of a university' })
  async listLeadership(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.repo.findLeadershipByUniversityId(id);
    return toLeadershipResponseList(data);
  }

  @Public()
  @Get(':id/working-hours')
  @ApiOperation({ summary: 'Get working hours of a university' })
  async listWorkingHours(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.repo.findWorkingHoursByUniversityId(id);
    return toWorkingHourResponseList(data);
  }

  @Public()
  @Get(':id/admission-timeline')
  @ApiOperation({ summary: 'Get admission timeline steps for a university' })
  async listAdmissionTimeline(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.repo.findAdmissionTimelinesByUniversityId(id);
    return toAdmissionTimelineResponseList(data);
  }

  @Public()
  @Get('regions')
  @ApiOperation({ summary: 'Get all distinct regions of universities' })
  async listRegions() {
    return this.repo.findAllRegions();
  }

  @Public()
  @Get('degree-types')
  @ApiOperation({ summary: 'Get all degree types' })
  async listDegreeTypes() {
    return this.repo.findAllDegreeTypes();
  }

  @Public()
  @Get(':id/campus-moments')
  @ApiOperation({ summary: 'Get campus life moments for a university' })
  async listCampusMoments(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.repo.findCampusMomentsByUniversityId(id);
    return toCampusMomentResponseList(data);
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
