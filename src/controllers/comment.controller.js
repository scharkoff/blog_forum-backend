import { CommentService } from "../domain/comment/comment.service.js";

export class CommentController {
  constructor() {
    this._commentService = new CommentService();
  }

  async getAll(req, res) {
    return await this._commentService.getAll(req, res);
  }

  async create(req, res) {
    return await this._commentService.create(req, res);
  }

  async remove(req, res) {
    return await this._commentService.remove(req, res);
  }

  async update(req, res) {
    return await this._commentService.update(req, res);
  }

}

