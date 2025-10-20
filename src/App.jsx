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
import ScrollToTop from "./components/ScrollToTop.jsx";
import CustomerDashboard from "./pages/CustomerDashboard";

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<CustomerDashboard />} />
          <Route path="/transaksi/telkom" element={<TransaksiTelkom />} />
          <Route path="/transaksi/xl" element={<TransaksiXl />} />
          <Route path="/transaksi/tri" element={<TransaksiTri />} />
          <Route path="/riwayat" element={<RiwayatTransaksi />} />
        </Routes>
        <ToastContainer />
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
