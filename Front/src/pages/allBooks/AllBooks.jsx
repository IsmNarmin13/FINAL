import React, { useState } from 'react'

import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
const AllBooks = () => {
  // const [selectedFilters, setSelectedFilters] = useState([])

  // const addFilter = (filter) => {
  //   if (!selectedFilters.includes(filter)) {
  //     setSelectedFilters((prevFilters) => [...prevFilters, filter])
  //   }
  // }

  // const removeFilter = (filter) => {
  //   setSelectedFilters((prevFilters) => prevFilters.filter((f) => f !== filter))
  // }

  // const clearAllFilters = () => {
  //   setSelectedFilters([])
  // }

  return (
    <div>

      <Navbar />
     
      <Footer/>
    </div>
  )
}

export default AllBooks