import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import LandingPage from "./pages/landingpage.jsx";
import TransaksiTelkom from "./pages/transaksi/TransaksiTelkom.jsx";
import TransaksiXl from "./pages/transaksi/TransaksiXl.jsx";
import TransaksiTri from "./pages/transaksi/TransaksiTri.jsx";
import RiwayatTransaksi from "./pages/RiwayatTransaksi.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/transaksi/telkom" element={<TransaksiTelkom />} />
          <Route path="/transaksi/xl" element={<TransaksiXl />} />
          <Route path="/transaksi/tri" element={<TransaksiTri />} />
          <Route path="/riwayat" element={<RiwayatTransaksi />} />
        </Routes>
        <ToastContainer />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
