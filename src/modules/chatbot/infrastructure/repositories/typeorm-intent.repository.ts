import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatIntent } from '../../domain/entities/chat-intent.entity';
import { IntentRepository } from '../../application/repositories/intent.repository';
import { CreateIntentDto } from '../../application/dtos/create-intent.dto';

@Injectable()
export class TypeOrmIntentRepository extends IntentRepository {
  constructor(
    @InjectRepository(ChatIntent)
    private readonly repo: Repository<ChatIntent>,
  ) {
    super();
  }

  async create(dto: CreateIntentDto): Promise<ChatIntent> {
    const intent = this.repo.create(dto as any);
    const saved = await this.repo.save(intent);
    return Array.isArray(saved) ? saved[0] : saved;
  }

  async findAll(): Promise<ChatIntent[]> {
    return this.repo.find({ order: { priority: 'DESC' } });
  }

  async findById(id: string): Promise<ChatIntent | null> {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: string, dto: Partial<CreateIntentDto>): Promise<ChatIntent> {
    await this.repo.update(id, dto as any);
    return (await this.findById(id))!;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
