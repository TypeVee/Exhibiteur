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
//     return fetch(apiChicago+"artworks").then((res)=>{
//         return res.json().then((res)=>{
//             return res.pagination.total
//         })
// })
})