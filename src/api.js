const apiChicago = "https://api.artic.edu/api/v1/"
const apiMetro = "https://collectionapi.metmuseum.org/public/collection/v1/"

export const countAll = (()=>{
    const ChicagoPromise = fetch(apiChicago+"artworks").then((res)=>{
        return res.json().then((res)=>{
            return res.pagination.total
        })
    })
    const MetroPromise = fetch(apiMetro+"objects").then((res)=>{
        return res.json().then((res)=>{
            return res.total
        })
    })
    return Promise.all([ChicagoPromise, MetroPromise]).then((values)=>{return values[0] + values[1]})
})


export const metCheck = ((metIdArr) => {
    if(Array.isArray(metIdArr) == false){
        console.log(Array.isArray(metIdArr))
        return []
    }
    let metPromiseArr = []
    let metPromiseFixed = []
    metIdArr.forEach((id, index)=>{
        metPromiseArr.push(fetch(apiMetro+"objects/"+id))
    })
    return Promise.all(metPromiseArr).then((values)=>{
        metPromiseFixed = values.filter((data)=>data.status == 200)
        return Promise.all((
            metPromiseFixed.map((promise)=>{
            return promise.json()
            }))
        ).then((data)=>{
            return data.filter((specimens)=>specimens.primaryImage !== "")
        })
    })
})