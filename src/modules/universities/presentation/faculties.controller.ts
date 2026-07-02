import { Controller, Get, Param, ParseUUIDPipe, Query } from '@nestjs/common';
import { Public } from '../../../shared/decorators/public.decorator';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UniversityRepository } from '../application/repositories/university.repository';
import { toDepartmentResponseList } from '../application/mappers/department.mapper';

@ApiTags('Faculties')
@Controller('faculties')
export class FacultiesController {
  constructor(private readonly repo: UniversityRepository) {}

  @Public()
  @Get(':id/departments')
  @ApiOperation({ summary: 'Get departments of a faculty' })
  @ApiQuery({ name: 'page', required: false, example: 1 })
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  async listDepartments(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const p = parseInt(page || '1', 10);
    const l = parseInt(limit || '10', 10);
    return this.repo.findDepartmentsByFacultyId(id, p, l)
      .then((result) => ({
        data: toDepartmentResponseList(result.data),
        meta: { total: result.total, page: result.page, limit: result.limit, totalPages: result.totalPages },
      }));
  }
}
