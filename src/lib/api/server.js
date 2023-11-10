
import { CapacitorHttp } from '@capacitor/core';

export async function getgames(){
  const gamesData = []

  const options = {
    url: "https://store-site-backend-static.ak.epicgames.com/freeGamesPromotions",
  }

  let res = await CapacitorHttp.get(options) // call using native http api


  let json = res.data // returns json (unlike string from node-http)
  

    await json?.data?.Catalog?.searchStore?.elements?.forEach((el) => {
        if (el.promotions) {
          gamesData.push(el)
        }
    })
    

    

  
  return parseGames(gamesData)

}










function parseGames (gamesData) {
  const gamesInfo = []
  const currents = []
  const nexts = []
  
  gamesData.forEach((game) => {
    
    let gameInfo = ifFree(game)
    if (gameInfo.free) {
      gamesInfo.push(gameInfo.data)
    }
  })


  gamesInfo.forEach((el) => {
    if (el?.is_available) {
      currents.push(el)
    } else {
      nexts.push(el)
    }
  })

  const currentStartDate = currents[0]?.start_date.toISOString()
  const currentEndDate = currents[0]?.end_date.toISOString()
  const nextStartDate = nexts[0]?.start_date.toISOString()
  const nextEndDate = nexts[0]?.end_date.toISOString()

  return {
    currents,
    nexts,
    currentStartDate,
    currentEndDate,
    nextStartDate,
    nextEndDate
  }
}

function ifFree (game) {
  let date
  let isaval
  let free = false


  if (game?.promotions?.upcomingPromotionalOffers[0]?.promotionalOffers[0]?.discountSetting?.discountPercentage === 0) {
    date = game?.promotions?.upcomingPromotionalOffers
    isaval = false
    free = true
  } else if (game?.promotions?.promotionalOffers.length && game?.price?.totalPrice?.discountPrice === 0) {
    date = game?.promotions?.promotionalOffers
    isaval = true
    free = true
  }

  if (Array.isArray(date)) {
    date = date[0]?.promotionalOffers[0]
  }

  let img
  game?.keyImages.forEach((game) => {
    if (game?.type === 'Thumbnail') {
      img = game?.url
    }
  })

  game?.keyImages?.forEach((game) => {
    if (!img) {
      if (game?.type === 'VaultClosed') {
        img = game?.url
      }
    }
  })

  return {
    data:{
      name: game?.title,
      desc: game?.description,
      link: game?.productSlug
        ? game?.productSlug
        : game?.offerMappings[0]?.pageSlug
          ? game?.offerMappings[0]?.pageSlug
          : '',
      start_date: new Date(date?.startDate),
      end_date: new Date(date?.endDate),
      is_available: isaval,
      img,
    },
    free
  }
}
