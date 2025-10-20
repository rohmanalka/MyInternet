import { useState } from "react";
import { Card, CardContent, MenuItem, Select, FormControl, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProviderPackages } from "../../hooks/useProviderPackages";
import { useFetch } from "../../hooks/useFetch";
import { useCheckout } from "../../hooks/useCheckout";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const TransaksiXl = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [noTelp, setNoTelp] = useLocalStorage("noTelp", "");
  const [email, setEmail] = useLocalStorage("email", user ? `${user.username}@example.com` : "");

  const { filteredPackages, packageType, setPackageType } = useProviderPackages("xl");
  const { data: paymentMethods } = useFetch("http://localhost:3000/paymentMethods");
  const { handleCheckout } = useCheckout(user);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  if (!user) {
    navigate("/");
    return null;
  }

  const onCheckout = () =>
    handleCheckout({
      noTelp,
      email,
      selectedPackage,
      selectedPaymentMethod,
      onSuccess: () => {
        setNoTelp("");
        setSelectedPackage(null);
        setSelectedPaymentMethod(null);
      },
    });

  return (
    <main className="mx-[100px] mt-[100px]">
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">

            {/* Provider Card */}
            <Card className="shadow-md rounded-lg" sx={{ bgcolor: "rgba(255,255,255,0.4)", backdropFilter: "blur(8px)" }}>
              <CardContent className="flex items-center gap-6 p-6">
                <img src="/src/assets/provider/xl.png" alt="Xl" className="w-25 h-25 rounded-lg object-cover"/>
                <div>
                  <h2 className="text-2xl font-bold mb-2">Xl</h2>
                  <p className="text-gray-700 text-sm">
                    Provider telekomunikasi digital terkemuka di Indonesia yang dikenal dengan jangkauan jaringan terluas dan layanan berkualitas tinggi.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="shadow-md" sx={{ bgcolor: "rgba(255,255,255,0.4)", backdropFilter: "blur(8px)" }}>
                <CardContent className="p-4">
                  <TextField
                    label="No.Telp"
                    placeholder="Masukkan No.Telp ..."
                    value={noTelp}
                    onChange={(e) => setNoTelp(e.target.value)}
                    fullWidth
                    size="small"
                  />
                </CardContent>
              </Card>

              <Card className="shadow-md" sx={{ bgcolor: "rgba(255,255,255,0.4)", backdropFilter: "blur(8px)" }}>
                <CardContent className="p-4">
                  <TextField
                    label="Email"
                    placeholder="Masukkan Email ..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    size="small"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Paket Data */}
            <Card className="shadow-md" sx={{ bgcolor: "rgba(255,255,255,0.4)", backdropFilter: "blur(8px)" }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Pilih Paket Data</h3>
                  <FormControl size="small" sx={{ minWidth: 150 }}>
                    <Select value={packageType} onChange={(e) => setPackageType(e.target.value)}>
                      <MenuItem value="Jenis Paket">Jenis Paket</MenuItem>
                      <MenuItem value="Bulanan">Bulanan</MenuItem>
                      <MenuItem value="Harian">Harian</MenuItem>
                      <MenuItem value="Penawaran">Penawaran</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {filteredPackages.map((pkg) => (
                    <div
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`cursor-pointer rounded-lg p-4 shadow-md hover:-translate-y-2 transition-transform duration-300 ${
                        selectedPackage?.id === pkg.id ? "ring-1 ring-black" : ""
                      }`}
                      style={{ background: "linear-gradient(135deg, #5433FF 0%, #20BDFF 100%)" }}
                    >
                      <p className="text-white text-xs mb-1">{pkg.name}</p>
                      <div className="flex items-baseline gap-2 mb-1">
                        <p className="text-white text-2xl font-bold">{pkg.size}</p>
                        <p className="text-white/90 text-xs">{pkg.duration}</p>
                      </div>
                      {pkg.packageType.includes("Penawaran") && pkg.priceOld && pkg.priceNew ? (
                        <div className="mb-2">
                          <p className="text-white/70 text-sm line-through">{pkg.priceOld}</p>
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

            {/* Pembayaran */}
            <Card className="shadow-md" sx={{ bgcolor: "rgba(255,255,255,0.25)", backdropFilter: "blur(10px)" }}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Pilih Metode Pembayaran</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method)}
                      className={`cursor-pointer rounded-2xl p-4 text-center border flex flex-col items-center justify-center
                        shadow-md hover:-translate-y-2 transition-transform duration-300
                        ${selectedPaymentMethod?.id === method.id
                          ? "ring-2 ring-white bg-white/40"
                          : "bg-white/10 border-white/20 hover:bg-white/20"} 
                        backdrop-blur-md text-gray-800`}
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
                  <div className="flex justify-between items-center"><span className="text-gray-500">No.Telp</span><span>{noTelp || "-"}</span></div>
                  <div className="flex justify-between items-center"><span className="text-gray-500">Email</span><span>{email || "-"}</span></div>
                  <div className="flex justify-between items-center"><span className="text-gray-500">Item</span><span>{selectedPackage?.name || "-"}</span></div>
                  <div className="flex justify-between items-center"><span className="text-gray-500">Payment</span><span>{selectedPaymentMethod?.name || "-"}</span></div>
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold">
                      {selectedPackage
                        ? selectedPackage.packageType.includes("Penawaran")
                          ? selectedPackage.priceNew
                          : selectedPackage.price
                        : "-"}
                    </span>
                  </div>
                </div>
                <Button fullWidth variant="contained" onClick={onCheckout}>Bayar Sekarang</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default TransaksiXl;
