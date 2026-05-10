// 1. Import hàm thay vì import toàn bộ file
import { initTracing } from './tracing.js';

// 2. Kích hoạt Tracing (đã được bảo vệ bởi try-catch)
initTracing();
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
