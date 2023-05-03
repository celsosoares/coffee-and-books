import { Test, TestingModule } from "@nestjs/testing";
import { BookController } from "./book.controller";
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

const newBookEntity = new Book({
  title: "Senhore dos Aneis",
  author: "Celso",
  genre: "RPG",
  quantity: 1,
  isAvailable: true,
  locality: "University",
});

const updatedBookEntity = new Book({
  title: "Senhore dos Aneis as Duas Torres",
  author: "Celso",
  genre: "RPG",
  quantity: 1,
  isAvailable: true,
  locality: "University",
});

describe("BookController", () => {
  let bookController: BookController;
  let bookService: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(bookEntityList),
            findOne: jest.fn().mockResolvedValue(bookEntityList[0]),
            create: jest.fn().mockResolvedValue(newBookEntity),
            update: jest.fn().mockResolvedValue(updatedBookEntity),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    bookController = module.get<BookController>(BookController);
    bookService = module.get<BookService>(BookService);
  });

  it("should be defined", () => {
    expect(bookController).toBeDefined();
    expect(bookService).toBeDefined();
  });

  describe("findAll", () => {
    it("should return a book list entity successfuly", async () => {
      // Act
      const result = await bookController.findAll();

      // Assert
      expect(result).toEqual(bookEntityList);
    });

    it("should throw an exeception", () => {
      // Arrange
      jest.spyOn(bookService, "findAll").mockRejectedValueOnce(new Error());

      // Assert
      expect(bookController.findAll()).rejects.toThrowError();
    });
  });

  describe("findOne", () => {
    it("should return a book successfuly", async () => {
      // Act
      const result = await bookController.findOne(
        "570b218d-3572-4a68-8e36-776f966da3bc"
      );

      // Assert
      expect(result).toEqual(bookEntityList[0]);
    });

    it("should throw an exeception", () => {
      // Arrange
      jest.spyOn(bookService, "findOne").mockRejectedValueOnce(new Error());

      // Assert
      expect(
        bookController.findOne("570b218d-3572-4a68-8e36-776f966da3bc")
      ).rejects.toThrowError();
    });
  });

  describe("create", () => {
    it("should create a new book successfully", async () => {
      // Arrange
      const body: CreateBookDto = {
        title: "Senhore dos Aneis",
        author: "Celso",
        genre: "RPG",
        quantity: 1,
        isAvailable: true,
        locality: "University",
      };

      jest.spyOn(bookService, "create").mockRejectedValueOnce(new Error());

      // Assert
      expect(bookController.create(body)).rejects.toThrowError();
    });
  });

  describe("update", () => {
    it("should update a book successfully", async () => {
      // Arrange
      const body: UpdateBookDto = {
        title: "Senhore dos Aneis as Duas Torres",
        author: "Celso",
        genre: "RPG",
        quantity: 1,
        isAvailable: true,
        locality: "University",
      };

      // Act
      const result = await bookController.update(
        "157cc9d7-18ba-4a72-a051-6d01e15be189",
        body
      );

      // Assert
      expect(result).toEqual(updatedBookEntity);
    });

    it("should throw an exception", () => {
      // Arrange
      const body: UpdateBookDto = {
        title: "Senhore dos Aneis as Duas Torres",
        author: "Celso",
        genre: "RPG",
        quantity: 1,
        isAvailable: true,
        locality: "University",
      };

      jest.spyOn(bookService, "update").mockRejectedValueOnce(new Error());

      // Assert
      expect(
        bookController.update("157cc9d7-18ba-4a72-a051-6d01e15be189", body)
      ).rejects.toThrowError();
    });
  });

  describe("remove", () => {
    it("should remove a book successfully", async () => {
      // Act
      const result = await bookController.remove(
        "570b218d-3572-4a68-8e36-776f966da3bc"
      );

      // Assert
      expect(result).toBeUndefined();
    });

    it("should throw an exception", () => {
      // Arrange
      jest.spyOn(bookService, "remove").mockRejectedValueOnce(new Error());

      // Assert
      expect(
        bookController.remove("570b218d-3572-4a68-8e36-776f966da3bc")
      ).rejects.toThrowError();
    });
  });
});
