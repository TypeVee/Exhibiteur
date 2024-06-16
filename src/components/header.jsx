import { Link } from 'react-router-dom'
import '../App.css'

export default function () {
    return (
        <div className="header">
            <Link to='/'><button>Home</button></Link>
            <Link to='/lists'><button>My lists</button></Link>
        </div>
    )
}