import { Link } from "react-router"
export default function ErrorPage(){
    return (
        <div>
            <h2>This route doesn't exist</h2>
            <Link to='/'>
                Go back to home page
            </Link>
        </div>
    )
}