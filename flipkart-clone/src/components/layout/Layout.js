import React from 'react'
import Header from "../header/Header.js"
import MenuHeader from "../menuHeader/MenuHeader.js"

const Layout = (props) => {
    return (
        <>
            <Header></Header>
            <MenuHeader></MenuHeader>
            {props.children}
        </>
    )
}

export default Layout
