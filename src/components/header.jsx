import { Link } from 'react-router-dom'
import '../App.css'

export default function () {
    return (
        <div className="header">
            <Link to='/'><button>Home</button></Link>
            <Link to='/'><button>Beepo</button></Link>
            <Link to='/'><button>About Us</button></Link>
        </div>
    )
}