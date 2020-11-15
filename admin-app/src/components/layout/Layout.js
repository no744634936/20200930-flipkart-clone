import React, { Fragment } from 'react'
import Navigation from "./Navigation.js"
import Sidebar from "./Sidebar.js"
function Layout(props) {
    return (
        <Fragment>
            <Navigation></Navigation>
            {
                props.sidebar ?
                (<Sidebar>{props.children}</Sidebar>)
                :
                props.children
            }

        </Fragment>
    )
}

export default Layout
