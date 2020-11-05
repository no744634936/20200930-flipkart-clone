import React, { Fragment } from 'react'
import Layout from "../layout/Layout.js"

function Home() {
    return (
        <Fragment>
            <Layout>
                <div class="jumbotron">
                    <h1 class="display-4">Hello, world!</h1>
                    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                </div>
            </Layout>
        </Fragment>
    )
}

export default Home
