import { Link } from 'react-router-dom'

import './error.css'

function Error() {
    return (
        <main className="main error-page">
            <div className='error-div'>
                <h1 className='h1-error'>⚠️ 404 Error ⚠️</h1>
                <h5>The page you're looking for does not exist.</h5>
                <Link className='home-button' to="/">Go back to home page</Link>
            </div>
        </main>
    )
}

export default Error;