import UserModel from '../entity/User.js';

export default async function handleRankUpdate(props) {
    const user = await UserModel.findByIdAndUpdate(props.userId, {
        rank: props.rank,
    }).exec();

    if (!user) {
        return props.res
            .status(404)
            .json({ message: 'Пользователь не найден' });
    }

    const { passwordHash, ...userData } = user._doc;
    return props.res
        .status(200)
        .json({ data: userData, message: 'Ранг успешно изменен' });
}
