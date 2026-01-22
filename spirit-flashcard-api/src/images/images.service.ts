import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { UpdateImageDto } from './dto/update-image.dto';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(file: Express.Multer.File): Promise<Image> {
    const newImage = this.imageRepository.create({
      filename: file.originalname,
      url: `/uploads/${file.filename}`,
      mimetype: file.mimetype,
      size: file.size,
    });
    return this.imageRepository.save(newImage);
  }

  findAll() {
    return this.imageRepository.find();
  }

  async findOne(id: number): Promise<Image> {
    const image = await this.imageRepository.findOne({ where: { id } });
    if (!image) {
      throw new NotFoundException(`Image with ID #${id} not found.`);
    }
    return image;
  }

  async update(id: number, newFile: Express.Multer.File): Promise<Image> {
    const imageToUpdate = await this.findOne(id);
    const oldFilename = imageToUpdate.filename;

    // Update entity properties with new file info
    imageToUpdate.filename = newFile.filename;
    imageToUpdate.url = `/uploads/${newFile.filename}`;
    imageToUpdate.mimetype = newFile.mimetype;
    imageToUpdate.size = newFile.size;

    const updatedImage = await this.imageRepository.save(imageToUpdate);

    // After DB is updated, delete the old file from disk
    try {
      const filePath = path.join(process.cwd(), 'uploads', oldFilename);
      await fs.unlink(filePath);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`Failed to delete old image file: ${oldFilename}`, error);
      }
    }

    return updatedImage;
  }

  async delete(id: number): Promise<void> {
    const image = await this.findOne(id);

    try {
      const filePath = path.join(process.cwd(), 'uploads', image.filename);
      await fs.unlink(filePath);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        console.error(`Failed to delete image file: ${image.filename}`, error);
      }
    }

    await this.imageRepository.delete(id);
  }
}
