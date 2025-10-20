import { Card, CardContent, Avatar, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HistoryIcon from "@mui/icons-material/History";
import { useEffect, useState } from "react";

const CustomerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const handleProviderClick = (provider) => {
    navigate(`/transaksi/${provider}`);
  };

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((err) => console.error("Gagal memuat db.json:", err));
  }, []);

  if (!user) {
    navigate("/", { replace: true });
    return null;
  }

  return (
    <main className="min-h-screen mt-[30px] flex flex-col items-center py-16 px-6">
      {/* Profil Card */}
      <Card
        className="shadow-xl rounded-3xl backdrop-blur-lg bg-white/60 border border-white/30"
        sx={{ width: "100%", maxWidth: 800 }}
      >
        <CardContent className="p-8 flex flex-col items-center">
          <Avatar
            src="/src/assets/profile/default.png"
            alt={user.username}
            sx={{ width: 90, height: 90, mb: 3 }}
          />
          <h2 className="text-2xl font-semibold text-gray-800">
            Halo, {user.username}! 👋
          </h2>
          <p className="text-gray-500 mt-1 text-center">
            Selamat datang di Dashboard MyInternet.  
            Nikmati berbagai promo dan paket data terbaik setiap minggu! 🌟
          </p>
          <Divider className="!my-6 w-full" />

          {/* Provider Section */}
          <div className="rounded-3xl w-full">
            <section className="text-center p-8 mt-6 rounded-3xl bg-white/40">
              <h2 className="text-2xl md:text-2xl font-semibold text-gray-800 mb-4">
                Pilih Provider Favoritmu 🚀
              </h2>
              <p className="text-gray-600 mb-10 italic">
                Ayo belanja paket data sekarang dan rasakan koneksi super cepat! ⚡
              </p>
              <div className="flex flex-wrap justify-center gap-20">
                {["telkom", "xl", "tri"].map((prov) => (
                  <img
                    key={prov}
                    src={`src/assets/provider/${prov}.png`}
                    alt={prov}
                    onClick={() => handleProviderClick(prov)}
                    className="w-25 h-25 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                  />
                ))}
              </div>
            </section>
          </div>
        </CardContent>
      </Card>

      {/* Penawaran Spesial */}
      <Card
        className="mt-16 shadow-md rounded-3xl bg-white/40 backdrop-blur-lg border border-white/30"
        sx={{ width: "100%", maxWidth: 900 }}
      >
        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            <HistoryIcon color="primary" />
            <h3 className="text-xl font-semibold text-gray-800">
              Penawaran Spesial Minggu Ini 🎉
            </h3>
          </div>
          <p className="text-gray-600 text-center mb-8 italic">
            Dapatkan harga termurah untuk paket internet favoritmu — promo terbatas! ⏰
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            {products.filter((p) => p.priceOld).length > 0 ? (
              products
                .filter((p) => p.priceOld)
                .map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleProviderClick(item.provider)}
                    className="bg-white rounded-2xl shadow-lg w-48 p-4 relative overflow-hidden 
                    hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
                  >
                    <div
                      className={`absolute top-0 left-0 w-full py-1 text-xs text-white font-semibold flex items-center justify-center ${
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
                      <p className="text-gray-400 line-through text-sm">
                        {item.priceOld}
                      </p>
                      <p
                        className={`text-lg font-bold ${
                          item.provider === "telkom"
                            ? "text-red-500"
                            : item.provider === "xl"
                            ? "text-blue-500"
                            : item.provider === "tri"
                            ? "text-yellow-400"
                            : "text-gray-500"
                        }`}
                      >
                        {item.priceNew}
                      </p>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-500">Memuat penawaran...</p>
            )}
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default CustomerDashboard;
