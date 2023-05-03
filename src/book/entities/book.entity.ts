import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @Column({ name: 'title', type: 'varchar', length: 50 })
  title: string;

  @Column({ name: 'author', type: 'varchar', length: 20 })
  author: string;

  @Column({ name: 'genre', type: 'varchar', length: 20 })
  genre: string;

  @Column({ name: 'quantity', type: 'int' })
  quantity: number;

  @Column({ name: 'isAvailable', type: 'boolean' })
  isAvailable: boolean;

  @Column({ name: 'locality', type: 'varchar', length: 50 })
  locality: string;

  constructor(book?: Partial<Book>) {
    super();
    this.id = book?.id;
    this.updateAt = book?.updateAt;
    this.title = book?.title;
    this.author = book?.author;
    this.genre = book?.genre;
    this.quantity = book?.quantity;
    this.isAvailable = book?.isAvailable;
    this.locality = book?.locality;
  }
}
