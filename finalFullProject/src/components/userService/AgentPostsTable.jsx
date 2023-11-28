import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { BiMessageSquareDetail } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";



function AgentPostsTable(args) {
  const { propertyData, setEditRow, setDeleteRow } = args;

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

  return (
    <div className="p-2 max-w-5xl mx-auto text-black fill-gray-400">
      <table className="border border-gray-700 w-full">
        <thead className="bg-slate-600 text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="capitalize px-3.5 py-2 text-center">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
              <th className="px-3.5 py-2 text-center">Details</th>
              <th className="px-3.5 py-2 text-center">Delete</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length
            ? table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`
                            ${i % 2 === 0 ? "bg-slate-50" : "bg-white"}
                         text-center`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3.5 py-2">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                  <td>
                    <button 
                      onClick={() => {setEditRow(row.id)}}
                    >
                      <BiMessageSquareDetail className="text-gray-400 hover:text-slate-600"/>
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => {setDeleteRow(row.id)}}
                    >
                      <MdDeleteOutline className="text-gray-400 hover:text-slate-600"/>
                    </button>
                  </td>
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
            ))
            }
        </select>
      </div>
    </div>
  );
}

export default AgentPostsTable;
