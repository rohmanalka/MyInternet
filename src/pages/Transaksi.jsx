import { useState, useEffect } from "react";
import { Card, CardContent, MenuItem, Select, FormControl, TextField, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Transaksi = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [noTelp, setNoTelp] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packageType, setPackageType] = useState("Jenis Paket");
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((err) => console.error("Error fetching products:", err));

    if (user) {
      setEmail(user.username + "@example.com");
    }
  }, [user, navigate]);

  const handlePackageTypeChange = (event) => {
    setPackageType(event.target.value);
  };

  const handleCheckout = () => {
    if (!noTelp || !email || !selectedPackage) {
      alert("Silakan lengkapi semua data");
      return;
    }
    alert(`Pembayaran untuk ${selectedPackage.name} (${selectedPackage.price}) akan dilakukan`);
  };

  return (
    <main className="mx-[100px] mt-[100px]">
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prvider Section */}
            <Card className="shadow-md">
                <CardContent className="p-6">
                    <div className="flex">

                    </div>
                </CardContent>
            </Card>
            {/* Input Form */}
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <TextField
                    label="No.Telp"
                    placeholder="Masukkan No.Telp ..."
                    value={noTelp}
                    onChange={(e) => setNoTelp(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    label="Email"
                    placeholder="Masukkan Email ..."
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    variant="outlined"
                    size="small"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Package Selection */}
            <Card className="shadow-md">
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
                      <MenuItem value="Combo">Bulanan</MenuItem>
                      <MenuItem value="Harian">Mingguan</MenuItem>
                      <MenuItem value="Bulanan">Harian</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {packages
                    .filter(pkg => packageType === "Jenis Paket" || pkg.name.includes(packageType))
                    .map((pkg) => (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`cursor-pointer rounded-lg p-4 transition-all ${
                          selectedPackage?.id === pkg.id ? "ring-2 ring-blue-500" : ""
                        }`}
                        style={{
                          background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
                        }}
                      >
                        <p className="text-white text-xs mb-1">{pkg.name}</p>
                        <p className="text-white text-2xl font-bold mb-1">{pkg.size}</p>
                        <p className="text-white/90 text-xs mb-2">{pkg.duration}</p>
                        <p className="text-white text-sm font-semibold">{pkg.price}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Selection */}
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Pilih Metode Pembayaran</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {packages
                    .filter(pkg => packageType === "Jenis Paket" || pkg.name.includes(packageType))
                    .map((pkg) => (
                      <div
                        key={pkg.id}
                        onClick={() => setSelectedPackage(pkg)}
                        className={`cursor-pointer rounded-lg p-4 transition-all ${
                          selectedPackage?.id === pkg.id ? "ring-2 ring-blue-500" : ""
                        }`}
                        style={{
                          background: "linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%)",
                        }}
                      >
                        <p className="text-white text-xs mb-1">{pkg.name}</p>
                        <p className="text-white text-2xl font-bold mb-1">{pkg.size}</p>
                        <p className="text-white/90 text-xs mb-2">{pkg.duration}</p>
                        <p className="text-white text-sm font-semibold">{pkg.price}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Checkout Section */}
          <div className="lg:col-span-1">
            <Card className="shadow-md sticky top-6">
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
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold">{selectedPackage?.price || "-"}</span>
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

export default Transaksi;
