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
import { CreateUserDto } from '../application/dtos/create-user.dto';
import { UpdateUserDto } from '../application/dtos/update-user.dto';
import { ChangePasswordDto } from '../application/dtos/change-password.dto';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { GetUserByIdUseCase } from '../application/use-cases/get-user-by-id.use-case';
import { UpdateUserUseCase } from '../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../application/use-cases/delete-user.use-case';
import { ListUsersUseCase } from '../application/use-cases/list-users.use-case';
import { ChangePasswordUseCase } from '../application/use-cases/change-password.use-case';
import { JwtAuthGuard } from '../../../shared/guards/jwt-auth.guard';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { UserRole } from '../../../shared/enums/user-role.enum';
import { PaginationDto } from '../../../shared/dto/pagination.dto';
import { Public } from '../../../shared/decorators/public.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(
    private readonly createUC: CreateUserUseCase,
    private readonly getByIdUC: GetUserByIdUseCase,
    private readonly updateUC: UpdateUserUseCase,
    private readonly deleteUC: DeleteUserUseCase,
    private readonly listUC: ListUsersUseCase,
    private readonly changePasswordUC: ChangePasswordUseCase,
  ) {}

  @Public()
  @Post()
  @ApiOperation({ summary: 'Create a new user (public registration)' })
  @ApiResponse({ status: 201, description: 'User created' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  create(@Body() dto: CreateUserDto) {
    return this.createUC.execute(dto);
  }

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'List all users (admin only)' })
  async list(@Query() query: PaginationDto) {
    const { data, total } = await this.listUC.execute(query);
    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    return {
      data,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current logged-in user' })
  async me(@CurrentUser('id') id: string) {
    return this.getByIdUC.execute(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.getByIdUC.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.updateUC.execute(id, dto);
  }

  @Patch('me/password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Change own password' })
  async changeMyPassword(
    @CurrentUser('id') id: string,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.changePasswordUC.execute(id, dto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user (admin only)' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteUC.execute(id);
  }
}
