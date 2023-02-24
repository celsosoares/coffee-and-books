import { Test, TestingModule } from "@nestjs/testing";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
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

describe("BookController", () => {
  let controller: BookController;
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(bookEntityList),
            findOne: jest.fn().mockResolvedValue(bookEntityList[0]),
          },
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe("findAll", () => {
    it("should return a book list entity successfuly", async () => {
      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(bookEntityList);
    });

    it("should throw an exeception", () => {
      // Arrange
      jest.spyOn(service, "findAll").mockRejectedValueOnce(new Error());

      // Assert
      expect(controller.findAll()).rejects.toThrowError();
    });
  });

  describe("findOne", () => {
    it("should return a book successfuly", async () => {
      // Act
      const result = await controller.findOne(
        "570b218d-3572-4a68-8e36-776f966da3bc"
      );

      // Assert
      expect(result).toEqual(bookEntityList[0]);
    });

    it("should throw an exeception", () => {
      // Arrange
      jest.spyOn(service, "findOne").mockRejectedValueOnce(new Error());

      // Assert
      expect(
        controller.findOne("570b218d-3572-4a68-8e36-776f966da3bc")
      ).rejects.toThrowError();
    });
  });
});
