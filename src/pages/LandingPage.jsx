import { useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import WifiIcon from "@mui/icons-material/Wifi";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user, showAuth } = useAuth();
  const [products, setProducts] = useState([]);

  const handleProviderClick = (provider) => {
    if (user) {
      navigate(`/transaksi/${provider}`);
    } else {
      showAuth(1);
    }
  };

useEffect(() => {
  fetch("/db.json")
    .then((res) => res.json())
    .then((data) => {
      setProducts(data.products);
    })
    .catch((err) => console.error(err));
}, []);

  return (
    <main className="mx-[100px]">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 min-h-screen" id="beranda">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
          Selamat Datang di{" "}
          <img src="src/assets/images/Logo.png" alt="MyInternet" className="inline-block w-50 h-12 mb-1" />
        </h1>
        <p className="max-w-2xl text-gray-700 text-sm md:text-base leading-relaxed">
          Solusi cerdas untuk menghemat pengeluaran internet Anda. Dengan
          beragam provider seperti Telkomsel, Indosat, XL, hingga Tri. MyInternet
          punya harga rahasia yang tidak Anda temukan di tempat lain.
        </p>
        <div className="mt-8 bg-white/40 shadow-lg text-[#003366] text-sm md:text-base italic font-medium px-6 py-4 rounded-xl max-w-xl">
          <q>
            Berhenti Bayar Mahal! Temukan Paket Data Termurah, Beragam Provider,
            Hanya di Satu Tempat.
          </q>
        </div>
      </section>

      {/* Cara Membeli Section */}
      <div className="shadow-lg rounded-2xl">
        <section className="rounded-2xl bg-white/40 shadow-inner mb-20 p-8 text-center" id="bantuan">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-10">
            Cara Membeli Paket Data di{" "}
            <img src="src/assets/images/Logo.png" alt="MyInternet" className="inline-block w-50 h-10 mb-1" />
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:-translate-y-2 transition-transform duration-300">
              <LoginIcon className="!text-4xl mx-auto mb-3" color="primary" />
              <h3 className="font-semibold text-lg mb-2 text-gray-800">
                1. Registrasi / Login
              </h3>
              <p className="text-sm text-gray-700">
                Daftar akun MyInternet atau login jika sudah memiliki akun.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:-translate-y-2 transition-transform duration-300">
              <WifiIcon className="!text-4xl mx-auto mb-3" color="primary" />
              <h3 className="font-semibold text-lg mb-2 text-gray-800">
                2. Pilih Paket Provider
              </h3>
              <p className="text-sm text-gray-700">
                Pilih provider dan paket data yang ingin Anda beli.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:-translate-y-2 transition-transform duration-300">
              <CreditCardIcon className="!text-4xl mx-auto mb-3" color="primary" />
              <h3 className="font-semibold text-lg mb-2 text-gray-800">
                3. Pembayaran
              </h3>
              <p className="text-sm text-gray-700">
                Lakukan pembayaran sesuai harga tertera dengan berbagai metode.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Provider Section */}
      <div className="shadow-lg rounded-3xl">
        <section className="text-center p-8 mt-30 rounded-3xl bg-white/40 shadow-inner">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-10">
            Provider yang Tersedia
          </h2>
          <div className="flex flex-wrap justify-center gap-20">
            {["telkom", "xl", "tri"].map((prov) => (
              <img
                key={prov}
                src={`src/assets/provider/${prov}.png`}
                alt={prov}
                onClick={() => handleProviderClick(prov)}
                className="w-35 h-35 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            ))}
          </div>
        </section>
      </div>

    {/* Penawaran Section */}
    <div className="shadow-lg rounded-3xl">
      <section className="text-center p-8 mt-30 bg-white/40 rounded-3xl shadow-inner">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-10">
              Penawaran Spesial Minggu Ini
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
              {products.filter(p => p.priceOld).length > 0 ? (
              products
                  .filter(p => p.priceOld)
                  .map((item, idx) => (
                  <div
                      key={idx}
                      className="bg-white rounded-2xl shadow-lg w-48 p-4 relative overflow-hidden 
                      hover:-translate-y-2 transition-transform duration-300"
                  >
                  <div
                      className={`absolute top-0 left-0 w-full py-1 text-xs text-white font-semibold ${
                          item.provider === "telkom"
                          ? "bg-red-500"
                          : item.provider === "xl"
                          ? "bg-blue-500"
                          : item.provider === "tri"
                          ? "bg-yellow-400"
                          : "bg-gray-500"
                      }`}
                      >
                      Penawaran
                      </div>
                      <div className="mt-6 text-start">
                      <h3 className="font-semibold text-md">{item.name}</h3>
                      <div className="flex items-baseline gap-12">
                          <p className="text-2xl font-bold">{item.size}</p>
                          <p className="text-sm text-gray-500">{item.duration}</p>
                      </div>
                      <hr className="border-gray-300 my-2" />
                      <p className="text-gray-400 line-through text-sm">{item.priceOld}</p>
                      <p className={`text-lg font-bold ${
                          item.provider === "telkom"
                          ? "text-red-500"
                          : item.provider === "xl"
                          ? "text-blue-500"
                          : item.provider === "tri"
                          ? "text-yellow-400"
                          : "text-gray-500"
                      }`}>{item.priceNew}</p>
                      </div>
                  </div>
                  ))
              ) : (
              <p className="text-gray-500">Memuat penawaran...</p>
              )}
          </div>
      </section>
    </div>
    </main>
  );
};

export default LandingPage;
