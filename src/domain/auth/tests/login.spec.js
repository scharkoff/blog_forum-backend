import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../../user/entity/User.js';
import { AuthService, defaultAvatar } from '../auth.service.js';

const authService = new AuthService();

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Login module', () => {
    let req, res, mockUser, mockUserData, mockToken;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                fullName: 'Test User',
                password: '123456',
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockUserData = {
            _id: 'mockUserId',
            rank: 'user',
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: defaultAvatar,
            passwordHash: 'mockPasswordHash',
        };

        mockUser = {
            ...mockUserData,
            _doc: mockUserData,
        };

        mockToken = 'mockToken';
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should return user data and token', async () => {
        jest.spyOn(UserModel, 'findOne').mockResolvedValue(mockUser);

        bcrypt.compare.mockResolvedValueOnce(true);
        jwt.sign.mockReturnValueOnce(mockToken);

        await authService.login(req, res);

        expect(jwt.sign).toHaveBeenCalledWith(
            { _id: 'mockUserId' },
            'secrethash123',
            { expiresIn: '30d' },
        );
        expect(bcrypt.compare).toHaveBeenCalledWith(
            req.body.password,
            'mockPasswordHash',
        );
        expect(res.status).toHaveBeenCalledWith(200);

        const { passwordHash, ...userData } = mockUser._doc;
        expect(res.json).toHaveBeenCalledWith({
            userData,
            token: mockToken,
        });
    });

    it('Should return error if email is incorrect', async () => {
        jest.spyOn(UserModel, 'findOne').mockResolvedValue(null);

        await authService.login(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Неверный логин или пароль!',
        });
    });

    it('Should return error if password is incorrect', async () => {
        bcrypt.compare.mockResolvedValueOnce(false);

        await authService.login(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Неверный логин или пароль!',
        });
    });
});
