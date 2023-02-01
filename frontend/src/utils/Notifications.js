import { toast } from "react-toastify";

export const info = (message, position = null, autoclose = null) => {
  toast.info(message, {
    position: position,
    autoClose: autoclose,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
  });
};
export const danger = (message, position = null, autoclose = null) => {
  toast.danger(message, {
    position: position,
    autoClose: autoclose,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
  });
};
export const success = (message, position = null, autoclose = null) => {
  toast.success(message, {
    position: position,
    autoClose: autoclose,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
  });
};
export const warning = (message, position = null, autoclose = null) => {
  toast.warning(message, {
    position: position,
    autoClose: autoclose,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
  });
};
