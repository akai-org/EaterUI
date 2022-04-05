import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const defualtToastSettings = {
  position: "bottom-center",
  autoClose: 3000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: "colored",
};

const toastStyles = {
  padding: "2em",
  marginBottom: "4em",
};

function ToastBox() {
  return <ToastContainer style={toastStyles} />;
}

function ToastError(msg, options = {}) {
  toast.error(msg, {
    ...defualtToastSettings,
    ...options,
  });
}

function ToastSucess(msg, options = {}) {
  toast.success(msg, {
    ...defualtToastSettings,
    ...options,
  });
}

function ToastInfo(msg, options = {}) {
  toast.info(msg, {
    ...defualtToastSettings,
    ...options,
  });
}

export { ToastBox, ToastError, ToastSucess, ToastInfo };
