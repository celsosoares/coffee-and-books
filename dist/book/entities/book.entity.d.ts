import { BaseEntity } from 'typeorm';
export declare class Book extends BaseEntity {
    id: string;
    updateAt: Date;
    title: string;
    author: string;
    genre: string;
    quantity: number;
    isAvailable: boolean;
    locality: string;
    constructor(book?: Partial<Book>);
}
