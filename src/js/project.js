const fetch_projects = (creator) => {
  axios
    .get(`/storage/${creator}/projects`)
    .then((response) => {
      var data;
      console.log(response);
      response.data.map((item) => {
        data += `<option class="form-select" value="${item}">${item}</option>`;
      });
      $("#projectFolders").html(data);
    })
    .catch((error) => {
      console.log(error);
    });
};
$("#creatorFolders").on("change", (e) => {
  fetch_projects($("#creatorFolders").val());
});


$("#new_project").on("click", (e) => {
  var project_name = $("#project_name").val();
  var creator_name = $("#creatorFolders").val();
  if (project_name.length > 0) {
    axios
      .post(`/storage/new/project/${creator_name}/${project_name}`)
      .then((response) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        fetch_projects($("#creatorFolders").val());
        $("#project_name").val("");
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
