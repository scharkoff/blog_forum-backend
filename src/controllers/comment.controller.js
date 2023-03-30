import { CommentService } from "../domain/comment/comment.service.js";

export class CommentController {
  constructor() {
    this._commentService = new CommentService();
  }

  async findAll(req, res) {
    return await this._commentService.findAll(req, res);
  }

  async create(req, res) {
    return await this._commentService.create(req, res);
  }

  async delete(req, res) {
    return await this._commentService.delete(req, res);
  }

  async update(req, res) {
    return await this._commentService.update(req, res);
  }

}

