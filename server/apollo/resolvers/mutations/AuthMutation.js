const { UserInputError } = require('apollo-server-micro');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const AuthMutation = {
    signUp: async(_parent, _args, { models }) => {
        try {
            const { username, email, password, confirmPassword } = _args.input;

            const findUser = await models.User.findOne({ username });
            if (findUser) {
                throw 'USER_EXISTS';
            }

            if (password !== confirmPassword) {
                throw 'PASSWORD_MISMATCH';
            }

            const user = await new models.User({
                email: email.toLowerCase(),
                username,
                password
            });
            await user.save();

            return { user }
        } catch (e) {
            if (e === 'USER_EXISTS') {
                throw new UserInputError("Пользователь с таким именем уже существует");
            }
            else if (e === 'PASSWORD_MISMATCH') {
                throw new UserInputError("Пароли не совпадают");
            }
            else{
                console.error(e);
            }
        }
    },

    signIn: async(_parent, _args, { res, models }) => {
        try {
            const { email, password } = _args.input;

            const user = await models.User.findOne({ email });
            if (!user) {
                throw 'USER_NO_EXISTS';
            }

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                throw 'INCORRECT_PASSWORD'
            }

            const token = jwt.sign({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    time: new Date()
                },
                process.env.JWT_SECRET, {
                    expiresIn: '6h',
                }
            );

            res.setHeader(
                'Set-Cookie',
                cookie.serialize('token', token, {
                    httpOnly: true,
                    maxAge: 6 * 60 * 60,
                    path: '/',
                    sameSite: 'lax',
                    secure: process.env.NODE_ENV === 'production',
                })
            );

            return { user }
        } catch (e) {
            if (e === 'USER_NO_EXISTS') {
                throw new UserInputError("Пользователя с таким email не существует");
            }
            else if (e === 'INCORRECT_PASSWORD'){
                throw new UserInputError("Неверный пароль");
            }
            else {
                console.error(e);
            }
        }
    },

    signOut: async(_parent, _args, { res }) => {
        res.setHeader(
            'Set-Cookie',
            cookie.serialize('token', '', {
                httpOnly: true,
                maxAge: -1,
                path: '/',
                sameSite: 'lax',
                secure: process.env.NODE_ENV === 'production',
            })
        );
        return true
    }
};

module.exports = AuthMutation;
