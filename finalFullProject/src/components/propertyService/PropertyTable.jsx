// Purpose: Provide a table to display the property data, and allow the user to like/dislike properties and contact agents.

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
// import icons
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { HiOutlineMailOpen } from "react-icons/hi";
// import auth
import { AuthData } from "../AuthWrapper.jsx";
// import graphql queries and mutations
import {
  getAgentByIdQuery,
  getTenantQuery,
  updateTenantMutation
} from "../FetchCmd.js";
// import modal to show agent contact info
import AgentContactInfo from "./AgentContactInfo.jsx";

function PropertyTable({ propertyData }) {
  const { auth } = AuthData();
  const [favoritesList, setFavoritesList] = useState([]); // store the ids of the properties that the tenant likes
  const [historyList, setHistoryList] = useState([]); // store the ids of the properties that the tenant has viewed
  const [modalVisible, setModalVisible] = useState(false); // control the visibility of the modal
  const [agentInfo, setAgentInfo] = useState({ name: "", email: "" }); // store the agent contact info

  // get the tenant's favorites and history lists
  useEffect(() => {
    if (auth.isAuthenticated && auth.asTenant) {
      handleGetTenant();
    }
  }, []);

  const handleGetTenant = async () => {
    // define the variables required for the query
    const variables = {
      email: auth.email,
    };
    // send the request to the GraphQL API
    try {
      const result = await getTenantQuery(variables);
      if (result.getTenant) {
        setFavoritesList(result.getTenant.favorites);
        setHistoryList(result.getTenant.history);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // construct the table columns
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("", {
      id: "No.",
      cell: (info) => <span>{info.row.index + 1}</span>,
      header: "No.",
    }),
    columnHelper.accessor("display_address", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Display Address",
    }),
    columnHelper.accessor("price", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Price",
    }),
    columnHelper.accessor("type", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Type",
    }),
    columnHelper.accessor("bedrooms", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Bedrooms",
    }),
    columnHelper.accessor("bathrooms", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Bathrooms",
    }),
    columnHelper.accessor("area", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Area",
    }),
    columnHelper.accessor("postal_code", {
      cell: (info) => <span>{info.getValue()}</span>,
      header: "Postal Code",
    }),
  ];

  // create react table
  const table = useReactTable({
    data: propertyData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // handle like
  const handleLike = (id) => async () => {
    // add id to favoritesList
    const favoriteIds = favoritesList;
    favoriteIds.push(id);
    // add id to historyList, remove duplicates if any
    const historyIds = historyList;
    historyIds.push(id);
    const historyIdsSet = new Set(historyIds);
    const historyIdsNoDup = [...historyIdsSet];
    // define the variables required for the query
    const variables = {
      id: auth.id,
      favorites: favoriteIds,
      history: historyIdsNoDup,
    };
    // send the request to the GraphQL API
    try {
      const result = await updateTenantMutation(variables);
      if (result) {
        handleGetTenant();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // handle dislike
  const handleDislike = (id) => async () => {
    // remove id from favoritesList
    const favoriteIds = favoritesList;
    const index = favoriteIds.indexOf(id);
    if (index > -1) {
      favoriteIds.splice(index, 1);
    }
    // add id to historyList, remove duplicates if any
    const historyIds = historyList;
    historyIds.push(id);
    const historyIdsSet = new Set(historyIds);
    const historyIdsNoDup = [...historyIdsSet];
    // define the variables required for the query
    const variables = {
      id: auth.id,
      favorites: favoriteIds,
      history: historyIdsNoDup,
    };
    // send the request to the GraphQL API
    try {
      const result = await updateTenantMutation(variables);
      if (result) {
        handleGetTenant();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAgent = (id) => async () => {
    // define the variables required for the query
    const variables = {
      id: id,
    };
    // send the request to the GraphQL API
    try {
      const result = await getAgentByIdQuery(variables);
      if (result.getAgentById) {
        setAgentInfo({
          name: result.getAgentById.name,
          email: result.getAgentById.email,
        });
        setModalVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-2 max-w-5xl mx-auto text-black fill-gray-400 py-10">
      <table className="border border-gray-700 w-full">
        <thead className="bg-slate-600 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="capitalize px-3.5 py-2 text-center"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
              {auth.asTenant && auth.isAuthenticated && (
                <th className="px-3.5 py-2 text-center">Like</th>
              )}
              {auth.asTenant && auth.isAuthenticated && (
                <th className="px-3.5 py-2 text-center">Contact</th>
              )}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length
            ? table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`
                            ${
                              i % 2 === 0 ? "bg-slate-50" : "bg-white"
                            } text-center
                        `}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3.5 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                  {auth.isAuthenticated && auth.asTenant && (
                    <td>
                      {favoritesList.includes(
                        table.getRowModel().rows[i].original.id
                      ) ? (
                        <div
                          className="flex items-center justify-center"
                          onClick={handleDislike(
                            table.getRowModel().rows[i].original.id
                          )}
                        >
                          <FcLike className="w-6 h-6 cursor-pointer" />
                        </div>
                      ) : (
                        <div
                          className="flex items-center justify-center"
                          onClick={handleLike(
                            table.getRowModel().rows[i].original.id
                          )}
                        >
                          <FcLikePlaceholder className="w-6 h-6 cursor-pointer" />
                        </div>
                      )}
                    </td>
                  )}
                  {auth.isAuthenticated && auth.asTenant && (
                    <td>
                      <div
                        className="flex items-center justify-center"
                        onClick={handleGetAgent(table.getRowModel().rows[i].original.manager_id)}
                      >
                        <HiOutlineMailOpen className="w-6 h-6 cursor-pointer text-gray-200 hover:text-slate-600" />
                      </div>
                    </td>
                  )}
                </tr>
              ))
            : null}
        </tbody>
      </table>
      {/* pagination */}
      <div className="flex items-center justify-end mt-2 gap-2">
        <button
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
          className="p-1 border border-slate-500 px-2 disabled:opacity-30"
        >
          {"<"}
        </button>
        <button
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
          className="p-1 border border-slate-500 px-2 disabled:opacity-30"
        >
          {">"}
        </button>
        {/* page no */}
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        {/* go to page */}
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
          />
        </span>
        {/* show how many items in one page */}
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
          className="p-2 bg-transparent"
        >
          {[10, 20, 30, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      {/* modal: agent contact info */}
      {modalVisible && (
        <AgentContactInfo
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          name={agentInfo.name}
          email={agentInfo.email}
        />
      )}
    </div>
  );
}

export default PropertyTable;
