import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Audio, Messages, Carousal } from "./pages";
import { AudioProvider } from "./context";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <>
      <AudioProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Audio />} />
            <Route path="/birthday" element={<Messages />} />
            <Route path="/wish" element={<Carousal />} />
          </Routes>
        </BrowserRouter>
      </AudioProvider>
      <Analytics />
      <SpeedInsights />
    </>
  );
}

export default App;