import React, { FunctionComponent } from 'react'
import Link from "next/link";
import { HeaderProps } from "../../types";

const Header: FunctionComponent<HeaderProps> = ({ isAuth }) => {
    const UserProfile = () => {
        if (isAuth) {
            return (
                <>
                    <Link href="profile">
                        <a>Профиль - { isAuth.username }</a>
                    </Link>{' '}
                    |{' '}
                    <Link href="signout">
                        <a>Выход</a>
                    </Link>
                </>
            )
        }
        else {
            return (
                <>
                    <Link href="signup">
                        <a>Регистрация</a>
                    </Link>{' '}
                    |{' '}
                    <Link href="signin">
                        <a>Вход</a>
                    </Link>
                </>
            )
        }
    }

    return (
        <header>
            <nav>
                <Link href="/">
                    <a>Главная</a>
                </Link>{' '}
                |{' '}
                <Link href="about">
                    <a>О нас</a>
                </Link>{' '}
                |{' '}
                <UserProfile />
            </nav>
        </header>
    )
}

export default Header
