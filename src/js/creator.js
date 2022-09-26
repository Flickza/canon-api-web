const fetch_creators = () => {
    axios
      .get("/storage/creators")
      .then((response) => {
        var data;
        response.data.map((item) => {
          data += `<option class="form-select" value="${item}">${item}</option>`;
        });
          $("#creatorFolders").html(data);
          fetch_projects($("#creatorFolders").val());
      })
      .catch((error) => {
        console.log(error);
      });
};
fetch_creators();
$("#project").attr("hidden", false);
$("#new_creator").on("click", (e) => {
  var creator_name = $("#creator_name").val();
  if (creator_name.length > 0) {
    axios
      .post(`/storage/new/creator/${creator_name}`)
      .then((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        fetch_creators();
        $("#creator_name").val("");
      })
      .catch((err) => {
        console.log(err);
      });
  }
});