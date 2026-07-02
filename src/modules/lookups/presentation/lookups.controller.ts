import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from '../../../shared/decorators/public.decorator';

@ApiTags('Lookups')
@Controller()
export class LookupsController {
  @Public()
  @Get('community/categories')
  @ApiOperation({ summary: 'Get community post categories' })
  getCommunityCategories(): string[] {
    return ['General', 'Admissions', 'Study Groups', 'Events', 'Questions'];
  }

  @Public()
  @Get('news/categories')
  @ApiOperation({ summary: 'Get news categories' })
  getNewsCategories() {
    return [
      { key: 'EVENTS', label: 'Events', labelAr: 'فعاليات', color: 'bg-blue-500' },
      { key: 'DEADLINES', label: 'Deadlines', labelAr: 'مواعيد هامة', color: 'bg-red-500' },
      { key: 'ANNOUNCEMENTS', label: 'Announcements', labelAr: 'إعلانات', color: 'bg-amber-500' },
      { key: 'GENERAL', label: 'General', labelAr: 'عام', color: 'bg-gray-500' },
      { key: 'ACADEMIC', label: 'Academic', labelAr: 'أكاديمي', color: 'bg-green-500' },
      { key: 'ADMISSIONS', label: 'Admissions', labelAr: 'قبول', color: 'bg-purple-500' },
      { key: 'RESEARCH', label: 'Research', labelAr: 'بحث علمي', color: 'bg-indigo-500' },
      { key: 'STUDENT_LIFE', label: 'Student Life', labelAr: 'حياة طلابية', color: 'bg-pink-500' },
      { key: 'CAREER', label: 'Career', labelAr: 'مهني', color: 'bg-teal-500' },
      { key: 'ACHIEVEMENTS', label: 'Achievements', labelAr: 'إنجازات', color: 'bg-orange-500' },
      { key: 'PARTNERSHIPS', label: 'Partnerships', labelAr: 'شراكات', color: 'bg-cyan-500' },
    ];
  }
}
