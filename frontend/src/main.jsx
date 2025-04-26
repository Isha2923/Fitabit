import React from "react";
import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; //!imported dev tools
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; //!imported few things to be used from react query
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store/store.js";

//! create instance of react query - this process is same as creating store in react redux
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* //!provider added to use react redux */}
      <QueryClientProvider client={queryClient}>
        {/* //!provider added to use react query, provide props called client and use imports. */}
        <App />
        <ReactQueryDevtools initialIsOpen={false} />
        {/* //!provide this also and here prop = initialIsOpen is set to false */}
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
