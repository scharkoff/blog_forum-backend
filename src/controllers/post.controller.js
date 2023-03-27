import { PostService } from "../domain/post/post.service.js";


export class PostController {
  constructor() {
    this._postService = new PostService();
  }

  async getAll(req, res) {
    return await this._postService.getAll(req, res);
  }

  async getLastTags(req, res) {
    return await this._postService.getLastTags(req, res);
  }

  async getOne(req, res) {
    return await this._postService.getOne(req, res);
  }

  async remove(req, res) {
    return await this._postService.remove(req, res);
  }

  async create(req, res) {
    return await this._postService.create(req, res);
  }

  async update(req, res) {
    return await this._postService.update(req, res);
  }

}