import { PostService } from "../domain/post/post.service.js";


export class PostController {
  constructor() {
    this._postService = new PostService();
  }

  async findAll(req, res) {
    return await this._postService.findAll(req, res);
  }

  async findByPage(req, res) {
    return await this._postService.findByPage(req, res);
  }

  async getLastTags(req, res) {
    return await this._postService.getLastTags(req, res);
  }

  async findOneById(req, res) {
    return await this._postService.findOneById(req, res);
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