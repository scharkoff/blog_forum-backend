import bcrypt from "bcrypt";
import UserModel from "../entity/User.js";

export async function handlePasswordUpdate(props) {
    const password = props.password,
        salt = await bcrypt.genSalt(10),
        phash = await bcrypt.hash(password, salt);

    const user = await UserModel.findByIdAndUpdate(props.userId, {
        passwordHash: phash,
    }).exec();

    if (!user) {
        return props.res.status(404).json({ message: "Пользователь не найден", statusCode: 404 })
    }

    const { passwordHash, ...userData } = user._doc;
    return props.res.status(200).json({ userData, message: "Пароль успешно изменен", statusCode: 200 })
}