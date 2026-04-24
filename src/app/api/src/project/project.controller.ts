import { Controller, Post, Body } from '@nestjs/common';
import { ProjectService } from './project.service';

@Controller('api/v8/projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('underwrite')
  async underwriteProject(@Body() payload: any) {
    // We instantly offload the math to the Service
    return this.projectService.processUnderwriting(payload);
  }
}