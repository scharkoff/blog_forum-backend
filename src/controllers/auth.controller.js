import AuthService from 'domain/auth/auth.service.js';

export default class AuthController {
    constructor() {
        this._authService = new AuthService();
    }

    async register(req, res) {
        return await this._authService.register(req, res);
    }

    async activate(req, res) {
        return await this._authService.activate(req, res);
    }

    async login(req, res) {
        return await this._authService.login(req, res);
    }

    async logout(req, res) {
        return await this._authService.logout(req, res);
    }

    async refresh(req, res) {
        return await this._authService.refresh(req, res);
    }

    async getMe(req, res) {
        return await this._authService.getMe(req, res);
    }
}
