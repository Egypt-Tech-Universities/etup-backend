import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { Public } from '../../../shared/decorators/public.decorator';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UniversityRepository } from '../application/repositories/university.repository';
import { toSpecializationResponseList } from '../application/mappers/specialization.mapper';

@ApiTags('Departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly repo: UniversityRepository) {}

  @Public()
  @Get(':id/specializations')
  @ApiOperation({ summary: 'Get specializations of a department' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async listSpecializations(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const p = parseInt(page || '1', 10);
    const l = parseInt(limit || '10', 10);
    return this.repo.findSpecializationsByDepartmentId(id, p, l)
      .then((result) => ({
        data: toSpecializationResponseList(result.data),
        meta: { total: result.total, page: result.page, limit: result.limit, totalPages: result.totalPages },
      }));
  }
}
