// Purpose: Login page component. 
// Allows the user to login as a tenant or agent, as well as sign up for an tenant account.

import React, { useState } from "react";
// import icons
import { FaRegUser } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
// import components
import { AgentLogin, TenantLogin } from "/src/components/";
// import styles
import "./styles/loginSignup.css";

function Login() {
  const [mode, setMode] = useState("tenant"); // mode state to determine which login component to render, agent/tenant
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center gap-2">
      {/* switch to change the login mode */}
      <div className="flex gap-2 justify-center">
        <button
          className={`flex justify-center items-center gap-4 border-slate-600 border-2 ${
            mode === "tenant"
              ? "bg-slate-600 text-white border-none"
              : "bg-slate-300 text-slate-600"
          } hover:text-white hover:bg-slate-600 font-semibold p-2 rounded-lg w-48 h-12`}
          onClick={() => setMode("tenant")}
        >
          {<FaRegUser className="text-3xl" />}Tenant
        </button>

        <button
          className={`flex justify-center items-center gap-4 border-slate-600 border-2 ${
            mode === "agent"
              ? "bg-slate-600 text-white border-none"
              : "bg-slate-300 text-slate-600"
          } hover:text-white hover:bg-slate-600 font-semibold p-2 rounded-lg w-48 h-12`}
          onClick={() => setMode("agent")}
        >
          {<MdSupportAgent className="text-4xl" />}Agent
        </button>
      </div>
      {/* render the login component based on the mode */}
      {mode === "tenant" && <TenantLogin />}
      {mode === "agent" && <AgentLogin />}
    </div>
  );
}

export default Login;
