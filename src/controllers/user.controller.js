import { UserService } from "../domain/user/user.service.js";

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

  async updateUserLogin(req, res) {
    return await this._userService.updateUserLogin(req, res);
  }

  async updateUserPassword(req, res) {
    return await this._userService.updateUserPassword(req, res);
  }

  async updateUserEmail(req, res) {
    return await this._userService.updateUserEmail(req, res);
  }

  async updateUserAvatar(req, res) {
    return await this._userService.updateUserAvatar(req, res);
  }

  async updateUserRank(req, res) {
    return await this._userService.updateUserRank(req, res);
  }
}

