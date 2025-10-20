import { useNotify } from "./useNotify";

export const useCheckout = (user) => {
  const { notifySuccess, notifyError, notifyInfo } = useNotify();

  const handleCheckout = async ({ noTelp, email, selectedPackage, selectedPaymentMethod, onSuccess }) => {
    if (!noTelp || !email || !selectedPackage || !selectedPaymentMethod) {
      notifyInfo("Silakan lengkapi semua data");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/transactions");
      const allTransactions = await res.json();
      const maxId = allTransactions.reduce((max, trx) => Math.max(max, trx.id), 0);

      const newTransaction = {
        id: maxId + 1,
        userId: user.id,
        noTelp,
        email,
        product: selectedPackage,
        paymentMethod: selectedPaymentMethod,
        total: selectedPackage.packageType.includes("Penawaran")
          ? selectedPackage.priceNew
          : selectedPackage.price,
        date: new Date().toISOString(),
      };

      const postRes = await fetch("http://localhost:3000/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTransaction),
      });

      const data = await postRes.json();
      notifySuccess(`Transaksi berhasil! ID: ${data.id}`);
      onSuccess?.();
    } catch (err) {
      console.error("Error saat checkout:", err);
      notifyError("Transaksi gagal, silakan coba lagi.");
    }
  };

  return { handleCheckout };
};
