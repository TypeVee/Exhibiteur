import './main.css'
import {useEffect, useState} from 'react'
import {countAll} from "../api"

export default function () {
    const [totalCount, setTotalCount] = useState('...')
    useEffect(()=>{
        countAll().then((count)=>{
            setTotalCount(count)})
    }, [])

    function handleSubmit(e){
        e.preventDefault()
        const searchString = (new FormData(e.target)).get('searchQuery')
        
    }
    return (
        <div className="window">
            <h3 className="centered">Welcome to Exhibiteur</h3>
            <p className="centered">An art browser with {totalCount} specimens to view</p>
            <br></br>
            <form className='centered' onSubmit={handleSubmit}>
                <input name="searchQuery" style={{"maxWidth":"500px", "width":"80vw"}}/>
                <br/>
                <button>Search</button>
            </form>
        </div>
    )
}