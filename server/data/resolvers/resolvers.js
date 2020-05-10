const { AuthenticationError, UserInputError } = require('apollo-server-micro');
const cookie = require('cookie');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const User = require("../../models/user");
require('dotenv').config();

function createUser(data) {
    const salt = bcrypt.genSaltSync(10);

    return {
        id: uuidv4(),
        email: data.email,
        username: data.username,
        password: bcrypt.hashSync(data.password, salt)
    }
}

function validPassword(user, password) {
    return bcrypt.compareSync(password, user.password)
}

const resolvers = {
    Query: {
        async viewer(_parent, _args, context, _info) {
            const { token } = cookie.parse(context.req.headers.cookie != null ? context.req.headers.cookie : '')
            if (token) {
                try {
                    const { id, email, username } = jwt.verify(token, process.env.JWT_SECRET)
                    return User.findOne({id, email, username})
                } catch {
                    throw new AuthenticationError('Токен аутентификации неправильный, пожалуйста, войдите')
                }
            }
        },
    },
    Mutation: {
        async signUp(_parent, _args) {
            try {
                const user = await new User(createUser(_args.input));
                await user.save();
                return { user }
            } catch (e) {
                console.log(e)
            }
        },

        async signIn(_parent, _args, context) {
            try {
                const user = await User.findOne({email: _args.input.email});
                console.log("user: " + user)

                if (user && validPassword(user, _args.input.password)) {
                    const token = jwt.sign({
                            email: user.email,
                            id: user.id,
                            username: user.username,
                            time: new Date()
                        },
                        process.env.JWT_SECRET, {
                            expiresIn: '6h',
                        }
                    );
                    context.res.setHeader(
                        'Set-Cookie',
                        cookie.serialize('token', token, {
                            httpOnly: true,
                            maxAge: 6 * 60 * 60,
                            path: '/',
                            sameSite: 'lax',
                            secure: process.env.NODE_ENV === 'production',
                        })
                    );
                    console.log("Успешный вход: ", user.username);
                    return { user }
                }
            } catch {
                throw new UserInputError('Неверная комбинация email и пароля');
            }
        },

        async signOut(_parent, _args, context) {
            context.res.setHeader(
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
        },
    },
};

module.exports = resolvers;
