import jwt from 'jsonwebtoken';
import TokenModel from './entity/Token.js';
import mongoose from 'mongoose';

export default class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(
            payload,
            process.env.ACCESS_TOKEN_SECRET_KEY,
            {
                expiresIn: '15m',
            },
        );

        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_SECRET_KEY,
            {
                expiresIn: '30d',
            },
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    async save(userId, refreshToken) {
        const tokenData = await TokenModel.findOne({
            user: mongoose.Types.ObjectId(userId),
        });

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }

        const token = await TokenModel.create({
            user: mongoose.Types.ObjectId(userId),
            refreshToken,
        });
        return token;
    }

    async removeToken(refreshToken) {
        const tokenData = await TokenModel.deleteOne({ refreshToken });

        if (tokenData.deletedCount === 0) {
            throw new Error('Refresh token was not found');
        }
    }

    async findToken(refreshToken) {
        const tokenData = await TokenModel.findOne({ refreshToken });

        if (!tokenData) {
            throw new Error('Refresh token was not found');
        }
    }
}
