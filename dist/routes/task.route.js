"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controllers/task.controller");
const router = (0, express_1.Router)();
router.route("/api/v1").get(task_controller_1.getAllTask).post(task_controller_1.postTask);
router.route("api/v1/:id").get(task_controller_1.getTask).put(task_controller_1.updateTask).delete(task_controller_1.deleteTask);
exports.default = router;
