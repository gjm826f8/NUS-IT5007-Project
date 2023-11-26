import React, { useEffect, useState } from 'react'
import { AuthData } from '/src/components/'

// to be replaced - listing components
import { AgentPostsTable, EditProperty, getAgentQuery, getPropertyQuery, DeleteProperty } from '/src/components/'

function MyPosts() {
  const { auth, setAuth } = AuthData()
  const [userPosts, setUserPosts] = useState([])
  const [editRow, setEditRow] = useState(null)
  const [editId, setEditId] = useState(null)
  const [deleteRow, setDeleteRow] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  
  // fetch agent data on load
  useEffect(() => {
    handleGetAgent()
  }, [])

  // fetch property data on change in auth -- delete property
  useEffect(() => {
    handleGetProperty()
  }, [auth])

  // fetch property data on change in editID -- edit property
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
        setAuth({
          ...auth,
          userData: result.getAgent,
        });
      } 
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetProperty = async () => {
    const variables = {
      idList: auth.userData.properties
    }
    try {
      const result = await getPropertyQuery(variables);
      if (result) {
        setUserPosts(result.getProperty)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (editRow !== null && editRow !== undefined) {
      setEditId(userPosts[editRow].id)
      setModalVisible(true)
    }
  }, [editRow])

  useEffect(() => {
    if (deleteRow !== null && deleteRow !== undefined) {
      setDeleteId(userPosts[deleteRow].id)
      setDeleteModalVisible(true)
    }
  }, [deleteRow])
  
  // // test
  // useEffect(() => {
  //   console.log(editId)
  // }, [editId])

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
