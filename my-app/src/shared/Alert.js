import { ToastContainer, toast } from "react-toastify";

export const success = (message) => {
  const notify = () => toast.success(message, { hideProgressBar: false });
  notify();
};

export const error = (message) => {
  const notify = () => toast.error(message, { hideProgressBar: false });
  notify();
};

export const info = (message) => {
  const notify = () => toast.info(message, { hideProgressBar: false });
  notify();
};

export const warning = (message) => {
  const notify = () => toast.warning(message, { hideProgressBar: false });
  notify();
};
