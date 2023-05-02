import bcrypt from 'bcrypt';
import UserModel from '../../user/entity/User.js';
import AuthService from '../auth.service.js';
import defaultAvatar from '../../../utils/consts.js';
import TokenService from '../../../services/token/token.service.js';

const authService = new AuthService();

jest.mock('bcrypt');

describe('Login module', () => {
    let req, res, mockUser, mockUserData, mockTokens, mockTokenService;

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
            cookie: jest.fn(),
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

        mockTokens = {
            accessToken: 'mockAccessToken',
            refreshToken: 'mockRefreshToken',
        };

        mockTokenService = {
            generateTokens: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should return user data and token', async () => {
        jest.spyOn(UserModel, 'findOne').mockResolvedValue(mockUser);
        bcrypt.compare.mockResolvedValueOnce(true);
        const authService = new AuthService(mockTokenService);
        authService._tokenService.generateTokens = jest
            .fn()
            .mockReturnValue(mockTokens);
        TokenService.prototype.save = jest.fn();

        await authService.login(req, res);

        expect(authService._tokenService.generateTokens).toHaveBeenCalledWith({
            id: mockUser._id,
        });
        expect(TokenService.prototype.save).toHaveBeenCalledWith(
            mockUser._id,
            mockTokens.refreshToken,
        );
        expect(bcrypt.compare).toHaveBeenCalledWith(
            req.body.password,
            'mockPasswordHash',
        );
        expect(res.cookie).toHaveBeenCalledWith(
            'refreshToken',
            mockTokens.refreshToken,
            {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: 'none',
            },
        );
        expect(res.status).toHaveBeenCalledWith(200);
        const { passwordHash, ...userData } = mockUser._doc;
        expect(res.json).toHaveBeenCalledWith({
            userData,
            accessToken: mockTokens.accessToken,
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
