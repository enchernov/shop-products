import React, { FunctionComponent } from 'react'

const Footer: FunctionComponent = () => {
    return <footer>&copy; { new Date().getFullYear() }</footer>;
}

export default Footer;
