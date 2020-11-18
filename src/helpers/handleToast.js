const defaultObj = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const handleToast = (toast, message, status = true) => {
  if (status) {
    return toast.success(message, {
      ...defaultObj,
    });
  }
  return toast.error(message, {
    ...defaultObj,
  });
};

export default handleToast;
