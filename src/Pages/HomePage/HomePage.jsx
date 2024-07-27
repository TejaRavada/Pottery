import React from 'react'
import HomeSlider from './Components/HomeSlider/HomeSlider'
import CategaryMini from './Components/FeaturedCat/CategaryMini'
import Categories from './Components/Categories-Shop/Categories'
import PopularNow from './Components/PopularNow/PopularNow'
import MostProducts from './Components/MoustUsedProducts/MostProducts'
import LearnMore from './Components/LearnMore/LearnMore'

const HomePage = () => {
  return (
    <>
      <HomeSlider />
      <CategaryMini />
      <Categories />
      <MostProducts />
      <PopularNow />
      <LearnMore />

    </>
  )
}

export default HomePage