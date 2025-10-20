import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useFetch } from "../hooks/useFetch";
import { useNotify } from "../hooks/useNotify";

const RiwayatTransaksi = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { notifySuccess, notifyError } = useNotify();

  const {
    data: transactions,
  } = useFetch(user ? `http://localhost:3000/transactions?userId=${user.id}` : null);

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus transaksi ini?")) return;

    try {
      const res = await fetch(`http://localhost:3000/transactions/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus transaksi");
      
      notifySuccess("Transaksi berhasil dihapus ✅");
      window.location.reload();
    } catch (err) {
      notifyError(err.message);
    }
  };

  return (
    <main className="flex justify-center items-start mt-30 min-h-screen px-4">
      <section className="bg-white/40 backdrop-blur-md rounded-br-4xl rounded-tl-4xl shadow-lg w-full max-w-3xl p-8">
        <div className="flex items-center justify-between mb-6">
          <IconButton onClick={() => navigate(-1)} className="text-gray-800">
            <ArrowBackIcon />
          </IconButton>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center flex-grow">
            Riwayat Transaksi
          </h1>
          <div className="w-10"></div>
        </div>
        {transactions.length === 0 ? (
          <p className="text-center text-gray-500">Belum ada transaksi.</p>
        ) : (
          <div className="space-y-4">
            {transactions.map((trx) => (
              <div
                key={trx.id}
                className="bg-white rounded-2xl p-4 shadow-md flex justify-between items-center hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="text-left">
                  <h2 className="font-semibold text-gray-800">{trx.product.name}</h2>
                  <p className="text-sm text-gray-600">
                    {trx.product.size} | {trx.product.duration}
                  </p>
                  <p className="text-sm text-gray-600">Metode: {trx.paymentMethod.name}</p>
                  <div className="text-xs text-gray-400 mt-1">
                    {new Date(trx.date).toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold text-gray-900">{trx.total}</span>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(trx.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default RiwayatTransaksi;
