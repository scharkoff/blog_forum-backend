import jwt from 'jsonwebtoken';

const validateRefreshToken = (refreshToken) => {
    try {
        const userData = jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET_KEY,
        );
        return userData;
    } catch (error) {
        return null;
    }
};

export default validateRefreshToken;
