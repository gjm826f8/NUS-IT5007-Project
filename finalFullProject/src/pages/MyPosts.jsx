// Purpose: MyPosts page component. 
// Displays the agent's property list and allows the agent to edit or delete their properties.
// Li Yueling
// First Create: 2023-11-20
// Function Complete: 2023-11-27

import React, { useEffect, useState } from 'react'
// import auth
import { AuthData } from '/src/components/'

// import components and necessary graphql queries
import { AgentPostsTable, DeleteProperty, EditProperty, getAgentQuery, getPropertyQuery } from '/src/components/'

function MyPosts() {
  const { auth } = AuthData()
  const [propertyList, setPropertyList] = useState([]) // agent's property list initialization
  const [userPosts, setUserPosts] = useState([]) // property data initialization
  const [editRow, setEditRow] = useState(null) // row that is being edited
  const [editId, setEditId] = useState(null) //  id of property being edited
  const [deleteRow, setDeleteRow] = useState(null) // row that is being deleted
  const [deleteId, setDeleteId] = useState(null) // id of property being deleted
  const [modalVisible, setModalVisible] = useState(false) // modal visibility control - edit function
  const [deleteModalVisible, setDeleteModalVisible] = useState(false) // modal visibility control - delete function
  
  // fetch agent data on load
  useEffect(() => {
    handleGetAgent()
  }, [])

  // fetch property data on change in propertyList -- delete property
  useEffect(() => {
    handleGetProperty()
  }, [propertyList])

  // fetch property data on change in editID/ deleteID
  useEffect(() => {
    if (!editId || !deleteId) {
      handleGetProperty()
    }
  }, [editId, deleteId])

  const handleGetAgent = async () => {
    // send the request to the GraphQL API
    try {
      const result = await getAgentQuery({email: auth.email})
      if (result.getAgent) {
        // set property list to agent's property list
        setPropertyList(result.getAgent.properties)
      } 
    } catch (error) {
      console.log(error);
    }
  };

  // fetch property data
  const handleGetProperty = async () => {
    const variables = {
      idList: propertyList
    }
    try {
      const result = await getPropertyQuery(variables);
      if (result) {
        // set property data to the result of the query
        setUserPosts(result.getProperty)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // set editId to the id of the property being edited on change in editRow
  useEffect(() => {
    if (editRow !== null && editRow !== undefined) {
      setEditId(userPosts[editRow].id)
      setModalVisible(true)
    }
  }, [editRow])

  // set deleteId to the id of the property being deleted on change in deleteRow
  useEffect(() => {
    if (deleteRow !== null && deleteRow !== undefined) {
      setDeleteId(userPosts[deleteRow].id)
      setDeleteModalVisible(true)
    }
  }, [deleteRow])

  return (
    <div>
      <AgentPostsTable propertyData={userPosts} setEditRow={setEditRow} setDeleteRow={setDeleteRow} />
      {editId &&
      <EditProperty propertyId={editId} setRow={setEditRow} setId={setEditId} modalVisible={modalVisible} setModalVisible={setModalVisible}/>}
      {deleteId &&
      <DeleteProperty propertyId={deleteId} setRow={setDeleteRow} setId={setDeleteId} modalVisible={deleteModalVisible} setModalVisible={setDeleteModalVisible}/>
      }
    </div>
  )
}

export default MyPosts
