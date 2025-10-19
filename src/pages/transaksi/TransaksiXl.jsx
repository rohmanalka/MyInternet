import { useState, useEffect } from "react";
import { Card, CardContent, MenuItem, Select, FormControl, TextField, Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const TransaksiXl = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [noTelp, setNoTelp] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageType, setPackageType] = useState("Jenis Paket");
  const [packages, setPackages] = useState([]);

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    fetch("http://localhost:3000/products?provider=xl")
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((err) => console.error("Error fetching products:", err));

    fetch("http://localhost:3000/paymentMethods")
      .then((res) => res.json())
      .then((data) => setPaymentMethods(data))
      .catch((err) => console.error("Error fetching payment methods:", err));

    if (user) {
      setEmail(user.username + "@example.com");
    }
  }, [user, navigate]);

  const handlePackageTypeChange = (event) => {
    setPackageType(event.target.value);
  };

  const handleCheckout = () => {
    if (!noTelp || !email || !selectedPackage || !selectedPaymentMethod) {
      alert("Silakan lengkapi semua data");
      return;
    }

    fetch("http://localhost:3000/transactions")
      .then((res) => res.json())
      .then((allTransactions) => {
        const maxId = allTransactions.reduce((max, trx) => Math.max(max, trx.id), 0);

        const newTransaction = {
          id: maxId + 1,
          userId: user.id,
          noTelp,
          email,
          product: selectedPackage,
          paymentMethod: selectedPaymentMethod,
          total: selectedPackage.price,
          date: new Date().toISOString(),
        };

        return fetch("http://localhost:3000/transactions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTransaction),
        });
      })
      .then((res) => res.json())
      .then((data) => {
        alert(`Transaksi berhasil! ID: ${data.id}`);
        setNoTelp("");
        setSelectedPackage(null);
        setSelectedPaymentMethod(null);
      })
      .catch((err) => {
        console.error("Error menyimpan transaksi:", err);
        alert("Transaksi gagal, silakan coba lagi.");
      });
  };

  return (
    <main className="mx-[100px] mt-[100px]">
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">

            {/* Tentang Provider */}
            <Card className="shadow-md rounded-lg" sx={{ bgcolor: "rgba(255,255,255,0.4)", backdropFilter: "blur(8px)" }}>
              <CardContent className="flex items-center gap-6 p-6">
                <div className="flex-shrink-0">
                  <img src="/src/assets/provider/xl.png" alt="XL" className="w-25 h-25 rounded-lg object-cover"/>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-2">XL</h2>
                  <p className="text-gray-700 text-sm">
                    provider telekomunikasi digital terkemuka di Indonesia yang telah 
                    melayani masyarakat sejak tahun 1995. XL dikenal dengan 
                    komitmennya dalam menyediakan layanan berkualitas tinggi dan 
                    jangkauan jaringan terluas.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Input Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="shadow-md" sx={{ bgcolor: "rgba(255,255,255,0.4)", backdropFilter: "blur(8px)" }}>
                <CardContent className="p-4">
                  <TextField
                    label="No.Telp"
                    placeholder="Masukkan No.Telp ..."
                    value={noTelp}
                    onChange={(e) => setNoTelp(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "rgba(255,255,255,0.4)",
                        backdropFilter: "blur(4px)"
                      }
                    }}
                  />
                </CardContent>
              </Card>
              <Card className="shadow-md" sx={{ bgcolor: "rgba(255,255,255,0.4)", backdropFilter: "blur(8px)" }}>
                <CardContent className="p-4">
                  <TextField
                    label="Email"
                    placeholder="Masukkan Email ..."
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "rgba(255,255,255,0.4)",
                        backdropFilter: "blur(4px)"
                      }
                    }}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Pilihan Paket */}
            <Card className="shadow-md" sx={{ bgcolor: "rgba(255,255,255,0.4)", backdropFilter: "blur(8px)" }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Pilih Paket Data</h3>
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <Select
                      value={packageType}
                      onChange={handlePackageTypeChange}
                      displayEmpty
                    >
                      <MenuItem value="Jenis Paket">Jenis Paket</MenuItem>
                      <MenuItem value="Bulanan">Bulanan</MenuItem>
                      <MenuItem value="Harian">Harian</MenuItem>
                      <MenuItem value="Penawaran">Penawaran</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {packages
                    .filter(pkg => 
                      packageType === "Jenis Paket" || 
                      (Array.isArray(pkg.packageType) && pkg.packageType.includes(packageType))
                    )
                    .map((pkg) => (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`cursor-pointer rounded-lg p-4 transition-all ${selectedPackage?.id === pkg.id ? "ring-2 ring-blue-500" : ""}`}
                        style={{ background: "linear-gradient(135deg, #5433FF 0%, #20BDFF 100%)" }}
                      >
                        <p className="text-white text-xs mb-1">{pkg.name}</p>
                        <div className="flex items-baseline gap-2 mb-1">
                          <p className="text-white text-2xl font-bold">{pkg.size}</p>
                          <p className="text-white/90 text-xs">{pkg.duration}</p>
                        </div>
                        {pkg.packageType.includes("Penawaran") && pkg.priceOld && pkg.priceNew ? (
                          <div className="mb-2">
                            {pkg.priceOld && <p className="text-white/70 text-sm line-through">{pkg.priceOld}</p>}
                            <p className="text-white text-sm font-bold">{pkg.priceNew}</p>
                          </div>
                        ) : (
                          <p className="text-white text-sm font-semibold">{pkg.price}</p>
                        )}
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Pilihan Pembayaran */}
            <Card
              className="shadow-md"
              sx={{
                bgcolor: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(10px)",
              }}
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Pilih Metode Pembayaran</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method)}
                      className={`cursor-pointer rounded-2xl p-4 text-center transition-all border flex flex-col items-center justify-center
                        ${
                          selectedPaymentMethod?.id === method.id
                            ? "ring-2 ring-red-400 bg-white/40"
                            : "bg-white/10 border-white/20 hover:bg-white/20"
                        } 
                        backdrop-blur-md text-gray-800 shadow-inner`}
                    >
                      <img
                        src={`../src/assets/payment/${method.logo}`}
                        alt={method.name}
                        className="w-10 h-10 object-contain mb-2 opacity-90"
                      />
                      <p className="text-sm font-semibold">{method.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout */}
          <div className="lg:col-span-1">
            <Card className="shadow-md sticky top-6" sx={{ bgcolor: "rgba(255,255,255,0.4)", backdropFilter: "blur(8px)" }}>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Checkout</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">No.Telp</span>
                    <span className="font-medium">{noTelp || "-"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Email</span>
                    <span className="font-medium">{email || "-"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Item</span>
                    <span className="font-medium">{selectedPackage?.name || "-"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Payment</span>
                    <span className="font-medium">{selectedPaymentMethod?.name || "-"}</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold">{selectedPackage
                      ? selectedPackage.packageType.includes("Penawaran")
                        ? selectedPackage.priceNew
                        : selectedPackage.price
                      : "-"}
                    </span>
                  </div>
                </div>

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={handleCheckout}
                >
                  Bayar Sekarang
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TransaksiXl;
