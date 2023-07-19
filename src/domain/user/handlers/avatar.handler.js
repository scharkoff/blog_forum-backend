import UserModel from '../entity/User.js';

export default async function handleAvatarUpdate(props) {
    const user = await UserModel.findByIdAndUpdate(props.userId, {
        avatarUrl: props.avatarUrl,
    }).exec();

    if (!user) {
        return props.res
            .status(404)
            .json({ message: 'Пользователь не найден' });
    }

    const { passwordHash, ...userData } = user._doc;
    return props.res
        .status(200)
        .json({ data: userData, message: 'Аватар успешно изменен' });
}
