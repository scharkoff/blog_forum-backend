import jwt from 'jsonwebtoken';

const validateAccessToken = (accessToken) => {
    try {
        const userData = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET_KEY,
        );
        return userData;
    } catch (error) {
        return null;
    }
};

export default validateAccessToken;
