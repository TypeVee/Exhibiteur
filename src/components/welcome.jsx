import './main.css'
import {useEffect, useState} from 'react'
import {countAll} from "../api"
import { Link, useNavigate } from 'react-router-dom'

export default function () {
    const [totalCount, setTotalCount] = useState('...')
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate();
    useEffect(()=>{
        countAll().then((count)=>{
            setTotalCount(count.toLocaleString())})
        
    }, [])
    // function checkIDs(){
    //     const testIDArr = []
    //     metCheck(testIDArr).then((a)=>{
    //         if(a == undefined){console.log("The array did not return in time")}
    //         else{console.log("Out of the "+testIDArr.length+" IDs you sent, only " + a.length + " even had images")
    //         }
    //         })
    // }
    function handleSubmit(e){
        e.preventDefault()
        const searchString = (new FormData(e.target)).get('searchQuery')
        navigate(`/search?q=${searchString}`)
    }
    return (
        <div className="window">
            <h3 className="centered">Welcome to Exhibiteur</h3>
            <p className="centered">An art browser with {totalCount} specimens to view</p>
            <br></br>
            <form className='centered' onSubmit={handleSubmit}>
                <input name="searchQuery" style={{"maxWidth":"500px", "width":"80vw"}}/>
                <br/>
                {/* <Link to={{
                pathname:"/search",
                search:"?q=" + searchQuery
                }}> */}
                    <button>Search</button>
                {/* </Link> */}
            </form>
            <button>Little dev button</button>
            {/* <Link to={{
                pathname:"/search",
                search:"?q=" + searchQuery
            }}
            >Search</Link> */}
        </div>
    )
}