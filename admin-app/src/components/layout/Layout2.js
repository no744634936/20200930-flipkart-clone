import React, { Fragment } from 'react'
import Navigation from "./Navigation.js"
function Layout2(props) {
    return (
        <Fragment>
            <Navigation></Navigation>
            {props.children}
        </Fragment>
    )
}

export default Layout2
