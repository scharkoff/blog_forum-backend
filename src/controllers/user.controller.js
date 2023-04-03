import { UserService } from '../domain/user/user.service.js';

export class UserController {
  constructor() {
    this._userService = new UserService();
  }

  async findAll(req, res) {
    return await this._userService.findAll(req, res);
  }

  async findOneById(req, res) {
    return await this._userService.findOneById(req, res);
  }

  async delete(req, res) {
    return await this._userService.delete(req, res);
  }

  async updateByCondition(req, res) {
    return await this._userService.updateByCondition(req, res);
  }
}
