import UserModel from '../entity/User.js';

export async function handleEmailUpdate(props) {
  const checkNewUserEmail = await UserModel.findOne({ email: props.email });

  if (checkNewUserEmail) {
    return props.res
      .status(400)
      .json({ message: 'Данная почта уже используется' });
  }

  const user = await UserModel.findByIdAndUpdate(props.userId, {
    email: props.email,
  }).exec();

  if (!user) {
    return props.res.status(404).json({ message: 'Пользователь не найден' });
  }

  const { passwordHash, ...userData } = user._doc;
  return props.res
    .status(200)
    .json({ userData, message: 'Почта успешно изменена' });
}
