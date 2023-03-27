import { UserService } from "../domain/user/user.service.js";

export class UserController {
  constructor() {
    this._userService = new UserService();
  }

  async getUsers(req, res) {
    return await this._userService.getUsers(req, res);
  }

  async getUserById(req, res) {
    return await this._userService.getUserById(req, res);
  }

  async deleteUser(req, res) {
    return await this._userService.deleteUser(req, res);
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

