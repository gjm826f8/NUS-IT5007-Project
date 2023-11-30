// Purpose: Displays all properties in a table

import React, { useEffect, useState } from 'react'
// import graphql queries and components
import { PropertyTable, getAllPropertiesQuery } from '/src/components/'

const Properties = () => {
    const [properties, setProperties] = useState([])

    // fetch data on load
    useEffect(() => {
        handleGetAllProperties()
    }, [])

    const handleGetAllProperties = async () => {
        // send the request to the GraphQL API
        try {
            const result = await getAllPropertiesQuery()
            if (result) {
                setProperties(result.getAllProperties)
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
      <PropertyTable propertyData={properties} />
    </div>
  )
}

export default Properties
