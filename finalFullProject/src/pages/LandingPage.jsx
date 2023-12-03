// Purpose: Landing page for the application

import React from 'react'
import PropertySearch from '../components/propertyService/PropertySearch.jsx'
import SampleProperty from '../components/propertyService/SampleProperty.jsx'
import Header from '../components/landingPageHeader/header.jsx'

function LandingPage() {
  return (
    <div>
      <Header/>
      <SampleProperty/>
      <PropertySearch/>
    </div>
  )
}

export default LandingPage
