import { Injectable, NotFoundException } from '@nestjs/common';
import { IntentRepository } from '../repositories/intent.repository';
import { CreateIntentDto } from '../dtos/create-intent.dto';

@Injectable()
export class CreateIntentUseCase {
  constructor(private readonly repo: IntentRepository) {}
  execute(dto: CreateIntentDto) {
    return this.repo.create(dto);
  }
}

@Injectable()
export class ListIntentsUseCase {
  constructor(private readonly repo: IntentRepository) {}
  execute() {
    return this.repo.findAll();
  }
}

@Injectable()
export class UpdateIntentUseCase {
  constructor(private readonly repo: IntentRepository) {}
  async execute(id: string, dto: Partial<CreateIntentDto>) {
    const exists = await this.repo.findById(id);
    if (!exists) throw new NotFoundException('Intent not found');
    return this.repo.update(id, dto);
  }
}

@Injectable()
export class DeleteIntentUseCase {
  constructor(private readonly repo: IntentRepository) {}
  async execute(id: string) {
    const exists = await this.repo.findById(id);
    if (!exists) throw new NotFoundException('Intent not found');
    await this.repo.delete(id);
  }
}
