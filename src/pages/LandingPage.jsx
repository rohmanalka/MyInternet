import LoginIcon from "@mui/icons-material/Login";
import WifiIcon from "@mui/icons-material/Wifi";
import CreditCardIcon from "@mui/icons-material/CreditCard";

const LandingPage = () => {
  return (
    <main className="mx-[24px]">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 min-h-screen">
        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
          Selamat Datang di{" "}
          <span className="text-[#1F51FF] font-extrabold italic">
            MyInternet
          </span>
        </h1>
        <p className="max-w-2xl text-gray-700 text-sm md:text-base leading-relaxed">
          Solusi cerdas untuk menghemat pengeluaran internet Anda. Dengan
          beragam provider seperti Telkomsel, Indosat, XL, hingga Tri.
          MyInternet punya harga rahasia yang tidak Anda temukan di tempat lain.
        </p>
        <div className="mt-8 bg-[#E0ECF9] text-[#003366] text-sm md:text-base italic font-medium px-6 py-4 rounded-xl shadow-md max-w-xl">
          <q>
            Berhenti Bayar Mahal! Temukan Paket Data Termurah, Beragam Provider,
            Hanya di Satu Tempat.
          </q>
        </div>
      </section>
      {/* End Hero Section */}

      {/* Provider Section */}
      <section className="text-center py-16 px-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-10">
          Provider yang Tersedia
        </h2>
        <div className="flex flex-wrap justify-center gap-20">
          <img
            src="src/assets/provider/telkom.png"
            alt="Telkomsel"
            className="w-35 h-35 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
          />
          <img
            src="src/assets/provider/xl.png"
            alt="XL"
            className="w-35 h-35 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
          />
          <img
            src="src/assets/provider/tri.jpg"
            alt="Tri"
            className="w-35 h-35 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>
      </section>
      {/* End Provider Section */}

      {/* Cara Membeli Section */}
      <section className="bg-white/40 backdrop-blur-md rounded-br-4xl rounded-tl-4xl shadow-lg mx-8 md:mx-20 mb-20 py-10 px-8 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-10">
          Cara Membeli Paket Data di{" "}
          <span className="text-[#1F51FF] italic font-extrabold">
            MyInternet
          </span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-md hover:-translate-y-2 transition-transform duration-300">
            <LoginIcon className="!text-4xl mx-auto mb-3 text-[#1F51FF]" />
            <h3 className="font-semibold text-lg mb-2 text-gray-800">
              1. Registrasi / Login
            </h3>
            <p className="text-sm text-gray-700">
              Daftar akun MyInternet atau login jika sudah memiliki akun.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:-translate-y-2 transition-transform duration-300">
            <WifiIcon className="!text-4xl mx-auto mb-3 text-[#1F51FF]" />
            <h3 className="font-semibold text-lg mb-2 text-gray-800">
              2. Pilih Paket Provider
            </h3>
            <p className="text-sm text-gray-700">
              Pilih provider dan paket data yang ingin Anda beli.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-md hover:-translate-y-2 transition-transform duration-300">
            <CreditCardIcon className="!text-4xl mx-auto mb-3 text-[#1F51FF]" />
            <h3 className="font-semibold text-lg mb-2 text-gray-800">
              3. Pembayaran
            </h3>
            <p className="text-sm text-gray-700">
              Lakukan pembayaran sesuai harga tertera dengan berbagai metode.
            </p>
          </div>
        </div>
      </section>
      {/* End Cara Membeli Section */}
    </main>
  );
};

export default LandingPage;
