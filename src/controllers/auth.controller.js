import { AuthService } from '../domain/auth/auth.service.js';

export class AuthController {
    constructor() {
        this._authService = new AuthService();
    }

    async register(req, res) {
        return await this._authService.register(req, res);
    }

    async login(req, res) {
        return await this._authService.login(req, res);
    }

    async getMe(req, res) {
        return await this._authService.getMe(req, res);
    }
}
