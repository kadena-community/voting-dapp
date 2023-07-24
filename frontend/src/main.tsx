import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChainWebApiContext } from "./api/api.ts";
import "./index.css";
import { ChainWebApiImpl } from "./api/chainweb.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChainWebApiContext.Provider value={new ChainWebApiImpl()}>
      <App />
    </ChainWebApiContext.Provider>
  </React.StrictMode>
);
