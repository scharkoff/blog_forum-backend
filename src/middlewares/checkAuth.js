import validateAccessToken from '../domain/token/handlers/validateAccessToken.js';

export default (req, res, next) => {
    const accessToken = req.cookies['token'];

    if (accessToken) {
        try {
            const userData = validateAccessToken(accessToken);

            if (!userData) {
                return res.status(403).json({ message: 'Нет доступа' });
            }

            req.userId = userData.id;

            next();
        } catch (error) {
            return res.status(403).json({ message: 'Нет доступа' });
        }
    } else {
        return res.status(403).json({ message: 'Нет доступа' });
    }
};
