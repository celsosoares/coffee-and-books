import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private readonly respository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto) {
    const book = this.respository.create(createBookDto);
    return this.respository.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.respository.find();
  }

  findOne(id: string): Promise<Book> {
    return this.respository.findOne({where: {id: id}});
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    const book = await this.respository.preload({
      id: id,
      ...updateBookDto,
    });
    if (!book) {
      throw new NotFoundException(`Book ${id} not found`);
    }
    return this.respository.save(book);
  }

  async remove(id: string) {
    const book = await this.findOne(id);
    return this.respository.remove(book);
  }
}
