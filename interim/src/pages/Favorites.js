import React, { useState } from "react";
import Display from '../Components/Display.js';
import Navi from "../Components/Navi";
import Table from "../Components/Table";

const Favorites = () => {
  // custom btn
  const [enabled, setEnabled] = useState(false);

  return (
    <div>
      <Navi />

      {/* btn */}
      <div className="flex relative items-center justify-between mx-10 my-5">
        <div className="relative"></div>
        <div className="flex flex-row gap-5 items-center">
          <label className="text-sm text-gray-500">Compare Properties</label>
          <input
            type="checkbox"
            onChange={() => {
              setEnabled(!enabled);
            }}
            className='
                relative appearance-none inline-block h-2 w-[52px] cursor-pointer 
                rounded-full bg-slate-300 shadow-md transition-all
                after:content-[""] after:absolute after:-top-2 after:left-0.5 after:h-6 after:w-6 
                after:rounded-full after:bg-slate-800 after:shadow-sm after:transition-all
                checked:bg-slate-500 checked:after:translate-x-6'
          />
        </div>
      </div>
      
      {/* if comparison mode is on, show the table, else show the map */}
      {enabled ? <Table /> : <div><Display /></div>}
    </div>
  );
};

export default Favorites;
