/* eslint-disable prettier/prettier */




const LocalAPI = {
    getX:(data)=>{
      return   window.api.RequestMainProcess({
        url: "/SDAS",
        data: data
    })
}
}
 export  default LocalAPI