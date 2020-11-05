import React, { Fragment } from 'react'
import Navigation from "./Navigation.js"
import Sidebar from "./Sidebar.js"
function Layout(props) {
    return (
        <Fragment>
            <Navigation></Navigation>
            <div className="container-fluid">
                <div className="row">
                    <Sidebar></Sidebar>
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            {props.children}
                        </div>
                    </main>
                </div>
            </div>

        </Fragment>
    )
}

export default Layout
