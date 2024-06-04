import keys from "../apikeys"

// CURRENTLY SUPPORTING: apiChicago & apiEuropeana
// NO LONGER SUPPORTING: apiMetro, Rijkmuseum, Cooper Hewitt Or Harvard Art Museum

const apiChicago = "https://api.artic.edu/api/v1/artworks/"
// const apiMetro = "https://collectionapi.metmuseum.org/public/collection/v1/"
//apiMetro's hasImages parameter appears to be severely incorrect and should not be used as it misses many images.
//we are no longer supporting apiMetro
const apiEuropeana = "https://api.europeana.eu/record/v2/search.json"
const apiEuropeanaHeader = {"X-API-Key": keys.Europeana}
const apiEuropeanaFields = "profile=minimal&rows=10&has_thumbnail=true"
const apiChicagoFields = "fields=id,title,image_id"



export const countAll = (()=>{
    const ChicagoPromise = fetch(apiChicago).then((res)=>{
        return res.json().then((res)=>{
            return res.pagination.total
        })
    })
    // console.log(apiEuropeanaHeader.read("X-API-Key"))
    // const MetroPromise = fetch(apiMetro+"objects").then((res)=>{
    //     return res.json().then((res)=>{
    //         return res.total
    //     })
    // })
    const EuropeanaPromise = fetch(apiEuropeana + "?query=* TYPE:IMAGE", {headers: apiEuropeanaHeader}).then((res)=>{
        return res.json().then((res)=>{
            return res.totalResults
        })
    })
    return Promise.all([ChicagoPromise, EuropeanaPromise]).then((values)=>{return values[0] + values[1]})
})

export const getChicago = ((searchquery)=>{
    if(searchquery === ""){
    }
    else{
        return fetch(apiChicago+`search?q=${searchquery}`+"&"+apiChicagoFields).then((res)=>{
            return res.json().then((res)=>{
                    return res
            })
        })
    }
})

export const getEuropeana = ((searchquery)=>{
    if(searchquery === ""){}
    else{
        return fetch(apiEuropeana+`?query=${searchquery} TYPE:IMAGE&${apiEuropeanaFields}`, {headers: apiEuropeanaHeader}).then((res)=>{
            return res.json().then((res)=>{
                return res
            })
        }).catch((err)=>{console.log(err)})
    }
})


// 
// export const metCheck = ((metIdArr) => {
//     if(Array.isArray(metIdArr) == false){
//         console.log(Array.isArray(metIdArr))
//         return []
//     }
//     let metPromiseArr = []
//     let metPromiseFixed = []
//     metIdArr.forEach((id, index)=>{
//         metPromiseArr.push(fetch(apiMetro+"objects/"+id))
//     })
//     return Promise.all(metPromiseArr).then((values)=>{
//         metPromiseFixed = values.filter((data)=>data.status == 200)
//         return Promise.all((
//             metPromiseFixed.map((promise)=>{
//             return promise.json()
//             }))
//         ).then((data)=>{
//             return data.filter((specimens)=>specimens.primaryImage !== "")
//         })
//     })
// })