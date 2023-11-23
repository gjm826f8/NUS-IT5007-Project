import React from "react";

function Slider({ enabled, setEnabled }) {
  return (
    <div className="flex relative items-center justify-between mx-10 my-5">
      <div className="relative"></div>
      <div className="flex flex-row gap-5 items-center">
        <label className="text-sm text-gray-500">Compare Properties</label>
        <label
          className={`w-12 text-sm p-2 rounded-lg text-center items-center border-2 border-slate-500 font-bold ${
            enabled ? "text-white bg-slate-500" : "text-slate-600 "
          }`}
        >
          {enabled ? "On" : "Off"}
        </label>
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
  );
}

export default Slider;
