import { toast, Bounce } from "react-toastify";

export const useNotify = () => {
    const notifySuccess = (message) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
            transition: Bounce,
        });
    };

    const notifyError = (message) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "colored",
            transition: Bounce,
        });
    };

    const notifyInfo = (message) => {
        toast.info(message, {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            theme: "light",
            transition: Bounce,
        });
    };

  return { notifySuccess, notifyError, notifyInfo };
};
