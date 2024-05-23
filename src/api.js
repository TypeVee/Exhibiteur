const apiChicago = "https://api.artic.edu/api/v1/"
const apiMetro = "https://collectionapi.metmuseum.org/public/"

export const countAll = (()=>{
    const ChicagoPromise = fetch(apiChicago+"artworks").then((res)=>{
        return res.json().then((res)=>{
            return res.pagination.total
        })
})
    const MetroPromise = fetch(apiMetro+"")
    Promise.all([ChicagoPromise, MetroPromise])
//     return fetch(apiChicago+"artworks").then((res)=>{
//         return res.json().then((res)=>{
//             return res.pagination.total
//         })
// })
})