import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../user/entity/User.js';
import { AuthService } from './auth.service';

const authService = new AuthService();

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Register module', () => {
  let req, res, mockUser, mockToken;

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

    mockUser = {
      _id: 'mockUserId',
      rank: 'user',
      email: req.body.email,
      fullName: req.body.fullName,
      avatarUrl: '../../../uploads/noavatar.png',
      passwordHash: 'mockPasswordHash',
      _doc: {
        ...req.body,
        _id: 'mockUserId',
        passwordHash: 'mockPasswordHash',
      },
    };

    mockToken = 'mockToken';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should register a new user', async () => {
    jest.spyOn(UserModel, 'findOne').mockResolvedValue(null);
    UserModel.prototype.save = jest.fn().mockResolvedValue(mockUser);
    bcrypt.genSalt.mockResolvedValueOnce('mockSalt');
    bcrypt.hash.mockResolvedValueOnce('mockPasswordHash');
    jwt.sign.mockReturnValueOnce(mockToken);

    await authService.register(req, res);

    expect(bcrypt.genSalt).toHaveBeenCalledWith(10);
    expect(bcrypt.hash).toHaveBeenCalledWith(req.body.password, 'mockSalt');
    expect(jwt.sign).toHaveBeenCalledWith(
      { _id: 'mockUserId' },
      'secrethash123',
      { expiresIn: '30d' },
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      userData: { ...req.body, _id: 'mockUserId' },
      token: mockToken,
    });
  });

  it('Should return an error if the email is already in use', async () => {
    jest.spyOn(UserModel, 'findOne').mockResolvedValue('Some user data');

    await authService.register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Данная почта уже используется',
    });
  });
});
