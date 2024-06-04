import { useSearchParams } from 'react-router-dom'
import './main.css'
import { getChicago, getEuropeana} from '../api';
import {useEffect, useState} from 'react'

export default function ({searchQuery}){
    const [searchParams, setSearchParams] = useSearchParams();
    const [images, setImages] = useState({})
    const [imagesChicago, setImagesChicago] = useState([])
    const [imagesEuropeana, setImagesEuropeana] = useState([])
    const [imageCount, setImageCount] = useState()
    const [totalResults, setTotalResults] = useState([])

    useEffect(()=>{
        Promise.all(
                [getChicago(searchParams.get("q")).then((res)=>{
                    return({data:res.data,total:res.pagination.total})
                }),
                getEuropeana(searchParams.get("q")).then((res)=>{
                    return({data:res.items,total:res.totalResults})
                })]
        ).then((res)=>{
            console.log(res)
            setImagesChicago(res[0].data)
            setImagesEuropeana(res[1].data)
            setTotalResults(res[0].total+res[1].total)
        })
    }, [])
    useEffect(()=>{
        setImageCount(imagesChicago.length+imagesEuropeana.length)
    }, [imagesChicago, imagesEuropeana])
    
    return (
        <div>
        <div className="gallery">
            {imagesChicago.map((data)=>
            <div className='imgBox'><img src={"https://www.artic.edu/iiif/2/"+data.image_id+"/full/843,/0/default.jpg"}/></div>)}
            {imagesEuropeana.map((data)=>
                <div className='imgBox'><img src={data.edmIsShownBy}/></div>)}
        </div>
        <p>There are currently... {imageCount} images on display</p>
            <br/>
            <p>There are currently... {totalResults} images in the search</p>
        </div>
    )
}
