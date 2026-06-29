import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Optional,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from '../application/dtos/send-message.dto';
import { CreateIntentDto } from '../application/dtos/create-intent.dto';
import { SendMessageUseCase } from '../application/use-cases/send-message.use-case';
import { GetConversationUseCase } from '../application/use-cases/get-conversation.use-case';
import { ListUserConversationsUseCase } from '../application/use-cases/list-user-conversations.use-case';
import { DeleteConversationUseCase } from '../application/use-cases/delete-conversation.use-case';
import {
  CreateIntentUseCase,
  DeleteIntentUseCase,
  ListIntentsUseCase,
  UpdateIntentUseCase,
} from '../application/use-cases/manage-intents.use-case';
import { Public } from '../../../shared/decorators/public.decorator';
import { CurrentUser } from '../../../shared/decorators/current-user.decorator';
import { Roles } from '../../../shared/decorators/roles.decorator';
import { RolesGuard } from '../../../shared/guards/roles.guard';
import { UserRole } from '../../../shared/enums/user-role.enum';

@ApiTags('Chatbot')
@Controller('chatbot')
export class ChatbotController {
  constructor(
    private readonly sendMsgUC: SendMessageUseCase,
    private readonly getConvUC: GetConversationUseCase,
    private readonly listConvsUC: ListUserConversationsUseCase,
    private readonly deleteConvUC: DeleteConversationUseCase,
    private readonly createIntentUC: CreateIntentUseCase,
    private readonly listIntentsUC: ListIntentsUseCase,
    private readonly updateIntentUC: UpdateIntentUseCase,
    private readonly deleteIntentUC: DeleteIntentUseCase,
  ) {}

  // ============== Public/User Endpoints ==============

  @Public()
  @Post('message')
  @ApiOperation({
    summary: 'Send a message to the chatbot',
    description: 'Works for both logged-in users and anonymous (use sessionId for anonymous).',
  })
  sendMessage(@Body() dto: SendMessageDto, @CurrentUser('id') userId?: string) {
    return this.sendMsgUC.execute(dto, userId);
  }

  @Public()
  @Get('conversations/:id')
  @ApiOperation({ summary: 'Get a conversation with all messages' })
  getConversation(@Param('id', ParseUUIDPipe) id: string) {
    return this.getConvUC.execute(id);
  }

  @Get('my/conversations')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'List my conversations' })
  myConversations(
    @CurrentUser('id') userId: string,
    @Query('limit') limit: number = 20,
  ) {
    return this.listConvsUC.execute(userId, +limit);
  }

  @Delete('conversations/:id')
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a conversation' })
  deleteConversation(
    @Param('id', ParseUUIDPipe) id: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.deleteConvUC.execute(id, userId);
  }

  // ============== Admin: Manage Intents ==============

  @Post('admin/intents')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create chatbot intent (Admin)' })
  createIntent(@Body() dto: CreateIntentDto) {
    return this.createIntentUC.execute(dto);
  }

  @Get('admin/intents')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'List all intents (Admin)' })
  listIntents() {
    return this.listIntentsUC.execute();
  }

  @Patch('admin/intents/:id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update intent (Admin)' })
  updateIntent(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: Partial<CreateIntentDto>,
  ) {
    return this.updateIntentUC.execute(id, dto);
  }

  @Delete('admin/intents/:id')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete intent (Admin)' })
  deleteIntent(@Param('id', ParseUUIDPipe) id: string) {
    return this.deleteIntentUC.execute(id);
  }
}
