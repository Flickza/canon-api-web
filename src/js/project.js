//fetch projects from route /storage/:creator/projects
const fetch_projects = (creator) => {
  axios
    .get(`/storage/${creator}/projects`)
    .then((response) => {
      var data;
      //if there is projects for :creator, list them in select
      if (response.data.length > 0) {
        response.data.map((item) => {
          data += `<option class="form-select" value="${item}">${item}</option>`;
        });
        $("#projectFolders").html(data);
      } else {
        $("#projectFolders").html("");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

//fetch projects when creator is changed
$("#creatorFolders").on("change", (e) => {
  fetch_projects($("#creatorFolders").val());
});

//new project handler function
$("#new_project").on("click", (e) => {
  var project_name = $("#project_name").val();
  var creator_name = $("#creatorFolders").val();
  //if project name is not empty
  if (project_name.length > 0) {
    //send post request to route /storage/new/project/:creator/:project with project name
    axios
      .post(`/storage/new/project/${creator_name}/${project_name}`)
      .then((response) => {
        //fire notification to user
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: response.data.message,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
        });
        fetch_projects($("#creatorFolders").val());
        $("#project_name").val("");
      })
      .catch((err) => {
        //fire notification to user
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: err.response.data.message,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 2000,
        });
      });
  }
});
