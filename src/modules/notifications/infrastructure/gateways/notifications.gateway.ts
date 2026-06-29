import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userRole?: string;
}

@WebSocketGateway({
  namespace: '/notifications',
  cors: {
    origin: '*',
    credentials: true,
  },
})
export class NotificationsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(NotificationsGateway.name);

  // Map of userId -> Set of socketIds
  private readonly userSockets = new Map<string, Set<string>>();

  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  afterInit() {
    this.logger.log('🔔 Notifications WebSocket Gateway initialized');
  }

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const token =
        client.handshake.auth?.token ||
        client.handshake.query?.token ||
        client.handshake.headers?.authorization?.replace('Bearer ', '');

      if (!token) {
        this.logger.warn(`Connection rejected: No token (${client.id})`);
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token as string, {
        secret: this.config.get('JWT_SECRET'),
      });

      const userId: string = payload.sub;
      const userRole: string = payload.role;

      client.userId = userId;
      client.userRole = userRole;

      // Track user's sockets
      if (!this.userSockets.has(userId)) {
        this.userSockets.set(userId, new Set());
      }
      this.userSockets.get(userId)!.add(client.id);

      // Join user-specific room
      client.join(`user:${userId}`);

      this.logger.log(`✅ User ${userId} connected (${client.id})`);

      client.emit('connected', {
        message: 'Connected to notifications',
        userId,
      });
    } catch (error: any) {
      this.logger.error(`Connection error: ${error?.message || error}`);
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    const userId = client.userId;
    if (userId) {
      const sockets = this.userSockets.get(userId);
      if (sockets) {
        sockets.delete(client.id);
        if (sockets.size === 0) {
          this.userSockets.delete(userId);
        }
      }
      this.logger.log(`❌ User ${userId} disconnected (${client.id})`);
    }
  }

  // ============== Public Methods ==============

  sendToUser(userId: string, event: string, data: any) {
    this.server.to(`user:${userId}`).emit(event, data);
    this.logger.debug(`📤 Sent '${event}' to user ${userId}`);
  }

  broadcast(event: string, data: any) {
    this.server.emit(event, data);
  }

  isUserOnline(userId: string): boolean {
    return this.userSockets.has(userId);
  }

  getOnlineUsersCount(): number {
    return this.userSockets.size;
  }

  // ============== Subscribe Events ==============

  @SubscribeMessage('ping')
  handlePing(@ConnectedSocket() client: Socket) {
    return { event: 'pong', data: { time: new Date().toISOString() } };
  }

  @SubscribeMessage('subscribe:notifications')
  handleSubscribe(@ConnectedSocket() client: AuthenticatedSocket) {
    if (!client.userId) return { error: 'Not authenticated' };
    return {
      event: 'subscribed',
      data: { userId: client.userId, message: 'Subscribed successfully' },
    };
  }
}
