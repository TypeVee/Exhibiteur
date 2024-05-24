import './main.css'
import {useEffect, useState} from 'react'
import {countAll, metCheck} from "../api"

export default function () {
    const [totalCount, setTotalCount] = useState('...')
    useEffect(()=>{
        countAll().then((count)=>{
            setTotalCount(count.toLocaleString())})
        
    }, [])
    function checkIDs(){
        const testIDArr = [900518,
            903437,
            903438,
            903440,
            903442,
            903443,
            903447,
            903448,
            903450,
            903452,
            903455,
            903457,
            903459,
            903460,
            903462,
            903463,
            903465,
            903466,
            903467,
            903468,
            903469,
            903470,
            903471,
            903472,
            903473,
            903474,
            903475,
            903476,
            903477,
            903478,
            903479,
            903480,
            903481,
            903482,
            903483,
            903484,
            903485,
            903486,
            903487,
            903488,
            903490,
            903491,
            903493,
            903494,
            903495,
            903496,
            903497,
            903498,
            903499,
            903500,
            903501,
            903513,
            903514,
            903515,
            903516,
            903517,
            903518,
            903523,
            903524,
            903525,
            903526,
            903527,
            903528,
            903529,
            903530,
            903531,
            903532,
            903533,
            903534,
            903535,
            903536,
            903537,
            903538,
            903539,
            903540,
            895506,
            895507,
            895508,
            895509,
            895511,
            895512,
            895513,
            895514,
            895515,
            895518,
            895519,
            895520,
            895521,
            895523,
            895524,
            895526,
            895531,
            895534,
            895535,
            895555,
            895556,
            895557,
            895559,
            898635,
            898637,
            898639,
            898643,
            898644,
            898646,
            898649,
            898650,
            898651,
            898653,
            898655,
            898657,
            898659,
            898661,
            898662,
            898663,
            898664,
            898665,
            898666,
            898667,
            898668,
            898671,
            898678,
            898690,
            898692,
            898693,
            898695,
            898696,
            898698,
            898700,
            898701,
            898702,
            898703,
            898704,
            898705,
            898706,
            898707,
            898708,
            898709,
            898710,
            898711,
            898712,
            898713,
            898714,
            898715,
            898716,
            898717,
            898718]
        metCheck(testIDArr).then((a)=>{
            if(a == undefined){console.log("The array did not return in time")}
            else{console.log("Out of the "+testIDArr.length+" IDs you sent, only " + a.length + " even had images")
            }
            })
    }
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
            <button onClick={checkIDs}>Little dev button</button>
        </div>
    )
}