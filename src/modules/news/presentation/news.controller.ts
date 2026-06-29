import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateNewsDto } from '../application/dtos/create-news.dto';
import { UpdateNewsDto } from '../application/dtos/update-news.dto';
import { ListNewsDto } from '../application/dtos/list-news.dto';
import { CreateNewsUseCase } from '../application/use-cases/create-news.use-case';
import { ListNewsUseCase } from '../application/use-cases/list-news.use-case';
import { GetNewsUseCase } from '../application/use-cases/get-news.use-case';
import { GetNewsBySlugUseCase } from '../application/use-cases/get-news-by-slug.use-case';
import { UpdateNewsUseCase } from '../application/use-cases/update-news.use-case';
import { DeleteNewsUseCase } from '../application/use-cases/delete-news.use-case';
import { GetFeaturedNewsUseCase } from '../application/use-cases/get-featured-news.use-case';
import { GetRelatedNewsUseCase } from '../application/use-cases/get-related-news.use-case';
import { Public } from '../../../shared/decorators/public.decorator';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { UserRole } from '../../../shared/enums/user-role.enum';

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(
    private readonly createUC: CreateNewsUseCase,
    private readonly listUC: ListNewsUseCase,
    private readonly getUC: GetNewsUseCase,
    private readonly getBySlugUC: GetNewsBySlugUseCase,
    private readonly updateUC: UpdateNewsUseCase,
    private readonly deleteUC: DeleteNewsUseCase,
    private readonly getFeaturedUC: GetFeaturedNewsUseCase,
    private readonly getRelatedUC: GetRelatedNewsUseCase,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiOperation({ summary: 'Create a news article (Admin/Moderator only)' })
  create(@Body() dto: CreateNewsDto, @CurrentUser('id') userId: string) {
    return this.createUC.execute(dto, userId);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'List published news articles (public)' })
  async list(@Query() query: ListNewsDto) {
    const { data, total } = await this.listUC.execute(query, true);
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  @Get('admin/all')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiOperation({ summary: 'List all news (including drafts) - Admin only' })
  async listAdmin(@Query() query: ListNewsDto) {
    const { data, total } = await this.listUC.execute(query, false);
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  @Public()
  @Get('featured')
  @ApiOperation({ summary: 'Get featured news articles' })
  getFeatured(@Query('limit') limit: number = 5) {
    return this.getFeaturedUC.execute(+limit);
  }

  @Public()
  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get article by slug (also increments views)' })
  getBySlug(@Param('slug') slug: string) {
    return this.getBySlugUC.execute(slug);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get article by ID (also increments views)' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getUC.execute(id);
  }

  @Public()
  @Get(':id/related')
  @ApiOperation({ summary: 'Get related articles' })
  getRelated(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('limit') limit: number = 5,
  ) {
    return this.getRelatedUC.execute(id, +limit);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiOperation({ summary: 'Update news article (Admin/Moderator only)' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateNewsDto,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    return this.updateUC.execute(id, dto, userId, role);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete news article (Admin/Moderator only)' })
  remove(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('id') userId: string,
    @CurrentUser('role') role: UserRole,
  ) {
    return this.deleteUC.execute(id, userId, role);
  }
}
