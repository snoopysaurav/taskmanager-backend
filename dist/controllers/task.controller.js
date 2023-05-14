"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.postTask = exports.getTask = exports.getAllTask = void 0;
const getAllTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(`Wow it's working fine`);
});
exports.getAllTask = getAllTask;
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getTask = getTask;
const postTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.postTask = postTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.deleteTask = deleteTask;
