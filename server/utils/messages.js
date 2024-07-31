const errorMessage = (message) => {
  return {
    status: "error",
    message,
  };
};

const successMessage = (message) => {
  return {
    status: "success",
    message,
  };
};

module.exports = {
  errorMessage,
  successMessage,
};
