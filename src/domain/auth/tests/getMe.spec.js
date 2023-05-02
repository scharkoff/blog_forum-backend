import UserModel from '../../user/entity/User.js';
import AuthService from '../auth.service.js';

const authService = new AuthService();

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Get me module', () => {
    let req, res, mockUser, mockUserData;

    beforeEach(() => {
        req = {
            body: {
                userId: 'mockUserId',
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
            passwordHash: 'mockPasswordHash',
        };

        mockUser = {
            ...mockUserData,
            _doc: mockUserData,
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Should return user data', async () => {
        jest.spyOn(UserModel, 'findOne').mockResolvedValue(mockUser);

        await authService.getMe(req, res);

        expect(res.status).toHaveBeenCalledWith(200);

        const { passwordHash, ...userData } = mockUser._doc;
        expect(res.json).toHaveBeenCalledWith({
            userData,
        });
    });

    it('Should return 404 user not found', async () => {
        jest.spyOn(UserModel, 'findOne').mockResolvedValue(null);

        await authService.getMe(req, res);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Пользователь не найден!',
        });
    });
});
