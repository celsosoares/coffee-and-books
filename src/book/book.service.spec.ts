import { NotFoundException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BookService } from "./book.service";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { Book } from "./entities/book.entity";

const bookEntityList: Book[] = [
  new Book({
    id: "570b218d-3572-4a68-8e36-776f966da3bc",
    updateAt: new Date(),
    title: "Harry Potter",
    author: "Celso",
    genre: "Adventure",
    quantity: 3,
    isAvailable: true,
    locality: "University",
  }),
  new Book({
    id: "3a172ee8-d57b-416d-9e60-10fcd38a7e58",
    updateAt: new Date(),
    title: "Narnia",
    author: "Celso",
    genre: "Adventure",
    quantity: 1,
    isAvailable: true,
    locality: "University",
  }),
  new Book({
    id: "157cc9d7-18ba-4a72-a051-6d01e15be189",
    updateAt: new Date(),
    title: "Interstellar",
    author: "Celso",
    genre: "Adventure",
    quantity: 5,
    isAvailable: true,
    locality: "University",
  }),
];

// foi colocado para vermos o cenario de mockar novamente la no update
// ja que os valores se save e preload estao divergindo
const updatedBookEntityItem = new Book({
  id: "570b218d-3572-4a68-8e36-776f966da3bc",
  updateAt: new Date(),
  title: "Harry Potter",
  author: "Celso",
  genre: "SciFy",
  quantity: 3,
  isAvailable: true,
  locality: "University",
});

describe("BookService", () => {
  let bookService: BookService;
  let bookRepository: Repository<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getRepositoryToken(Book),
          useValue: {
            create: jest.fn().mockResolvedValue(bookEntityList[0]),
            save: jest.fn().mockResolvedValue(bookEntityList[0]),
            find: jest.fn().mockResolvedValue(bookEntityList),
            findOne: jest.fn().mockResolvedValue(bookEntityList[0]),
            preload: jest.fn().mockResolvedValue(updatedBookEntityItem),
            remove: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    bookService = module.get<BookService>(BookService);
    bookRepository = module.get<Repository<Book>>(getRepositoryToken(Book));
  });

  it("should be defined", () => {
    expect(bookService).toBeDefined();
    expect(bookRepository).toBeDefined();
  });

  describe("findAll", () => {
    it("should return a book list successfully", async () => {
      // Act
      const result = await bookService.findAll();

      // Assert
      expect(result).toEqual(bookEntityList);
      expect(bookRepository.find).toHaveBeenCalledTimes(1);
    });

    it("should throw an excepetion", () => {
      // Arrange
      jest.spyOn(bookRepository, "find").mockRejectedValueOnce(new Error());

      // Assert
      expect(bookService.findAll()).rejects.toThrowError();
    });
  });

  describe("findOnde", () => {
    it("should return a book successfully", async () => {
      // Act
      const result = await bookService.findOne(
        "570b218d-3572-4a68-8e36-776f966da3bc"
      );

      // Assert
      expect(result).toEqual(bookEntityList[0]);
      expect(bookRepository.findOne).toHaveBeenCalledTimes(1);
    });

    it("should throw a not found excepetion", () => {
      // Arrange
      jest.spyOn(bookRepository, "findOne").mockRejectedValueOnce(new Error());

      // Assert
      expect(
        bookService.findOne("570b218d-3572-4a68-8e36-776f966da3bc")
      ).rejects.toThrowError();
      // tambem pode-se colocar um error especifico dentro desse toThrowError(NotFoundException)
    });
  });

  describe("create", () => {
    it("should create a new book entity successfully", async () => {
      // Arrange
      const data: CreateBookDto = {
        title: "Senhore dos Aneis",
        author: "Celso",
        genre: "RPG",
        quantity: 1,
        isAvailable: true,
        locality: "University",
      };

      // Act
      const result = await bookService.create(data);

      // Assert
      expect(result).toEqual(bookEntityList[0]);
      expect(bookRepository.create).toHaveBeenCalledTimes(1);
      expect(bookRepository.save).toHaveBeenCalledTimes(1);
    });

    it("should throw an exception", () => {
      // Arrange
      const data: CreateBookDto = {
        title: "Senhore dos Aneis",
        author: "Celso",
        genre: "RPG",
        quantity: 1,
        isAvailable: true,
        locality: "University",
      };

      jest.spyOn(bookRepository, "save").mockRejectedValueOnce(new Error());

      // Assert
      expect(bookService.create(data)).rejects.toThrowError();
    });
  });

  describe("update", () => {
    it("should update a book entity item successfully", async () => {
      // Arrange
      const data: UpdateBookDto = {
        title: "Harry Potter",
        author: "Celso",
        genre: "Adventure",
        quantity: 3,
        isAvailable: true,
        locality: "University",
      };

      // mock necessario ja que save e preload tinham valores divergentes
      // save no beforeEach tinha sido mocado com um valor diferente
      jest
        .spyOn(bookRepository, "save")
        .mockResolvedValueOnce(updatedBookEntityItem);

      // Act
      const result = await bookService.update(
        "570b218d-3572-4a68-8e36-776f966da3bc",
        data
      );

      // Assert
      expect(result).toEqual(updatedBookEntityItem);
    });

    // it("should throw a not found exception", () => {
    //   // Arrange
    //   jest.spyOn(bookRepository, "findOne").mockRejectedValueOnce(new Error());

    //   const data: UpdateBookDto = {
    //     title: "Harry Potter",
    //     author: "Celso",
    //     genre: "Adventure",
    //     quantity: 3,
    //     isAvailable: true,
    //     locality: "University",
    //   };

    //   // Assert
    //   expect(
    //     bookService.update("570b218d-3572-4a68-8e36-776f966da3bc", data)
    //   ).rejects.toThrowError(NotFoundException);
    // });

    it("should throw an exception", () => {
      // Arrange
      jest.spyOn(bookRepository, "save").mockRejectedValueOnce(new Error());

      const data: UpdateBookDto = {
        title: "Harry Potter",
        author: "Celso",
        genre: "Adventure",
        quantity: 3,
        isAvailable: true,
        locality: "University",
      };

      // Assert
      expect(
        bookService.update("570b218d-3572-4a68-8e36-776f966da3bc", data)
      ).rejects.toThrowError();
    });
  });

  describe("remove", () => {
    it("should delete a book entity item successfully", async () => {
      // Act
      const result = await bookService.remove(
        "570b218d-3572-4a68-8e36-776f966da3bc"
      );

      // Assert
      expect(result).toBeUndefined();
      expect(bookRepository.findOne).toHaveBeenCalledTimes(1);
      expect(bookRepository.remove).toHaveBeenCalledTimes(1);
    });

    it("should throw an exception", () => {
      // Arrange
      jest.spyOn(bookRepository, "remove").mockRejectedValueOnce(new Error());

      // Assert
      expect(
        bookService.remove("570b218d-3572-4a68-8e36-776f966da3bc")
      ).rejects.toThrowError();
    });
  });
});
