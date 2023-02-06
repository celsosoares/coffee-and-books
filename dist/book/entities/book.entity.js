"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const typeorm_1 = require("typeorm");
let Book = class Book extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Book.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'update_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], Book.prototype, "updateAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Book.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'author', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Book.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'genre', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], Book.prototype, "genre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity', type: 'int' }),
    __metadata("design:type", Number)
], Book.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'isAvailable', type: 'boolean' }),
    __metadata("design:type", Boolean)
], Book.prototype, "isAvailable", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'locality', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], Book.prototype, "locality", void 0);
Book = __decorate([
    (0, typeorm_1.Entity)()
], Book);
exports.Book = Book;
//# sourceMappingURL=book.entity.js.map