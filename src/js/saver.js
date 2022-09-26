export const saver = (yes_no, creator, project) => {
  axios
    .get("/camera/save/" + yes_no + "/" + creator + "/" + project)
    .then((response) => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: response.data.message,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
    })
    .catch((error) => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: response.data.error_message,
        showConfirmButton: false,
        timerProgressBar: true,
        timer: 2000,
      });
    });
};
