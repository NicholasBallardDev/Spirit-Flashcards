import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File, newKey: string) {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }
    return this.imagesService.create(file, newKey);
  }

  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    newKey: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }
    return this.imagesService.update(+id, file, newKey);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.delete(+id);
  }
}
