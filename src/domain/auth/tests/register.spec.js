import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../../user/entity/User.js';
import { AuthService, defaultAvatar } from '../auth.service.js';

const authService = new AuthService();

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Register module', () => {
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

    it('Should register new user with token', async () => {
        jest.spyOn(UserModel, 'findOne').mockResolvedValue(null);
        UserModel.prototype.save = jest.fn().mockResolvedValue(mockUser);
        bcrypt.genSalt.mockResolvedValueOnce('mockSalt');
        bcrypt.hash.mockResolvedValueOnce('mockPasswordHash');
        jwt.sign.mockReturnValueOnce(mockToken);

        await authService.register(req, res);

        expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
        expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 'mockSalt');
        expect(jwt.sign).toHaveBeenCalledWith(
            {
                _id: 'mockUserId',
            },
            'secrethash123',
            {
                expiresIn: '30d',
            },
        );
        expect(res.status).toHaveBeenCalledWith(200);

        const { passwordHash, ...userData } = mockUser._doc;
        expect(res.json).toHaveBeenCalledWith({
            userData,
            token: mockToken,
        });
    });

    it('Should return error if the email is already in use', async () => {
        jest.spyOn(UserModel, 'findOne').mockResolvedValue('Some user data');

        await authService.register(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Данная почта уже используется',
        });
    });
});
