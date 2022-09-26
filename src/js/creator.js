/*
Fetch creators from route /storage/creators
expected response:
[
  "CREATOR NAME",
  "CREATOR NAME",
  "CREATOR NAME"
]
*/
const fetch_creators = () => {
  axios
    .get("/storage/creators")
    .then((response) => {
      var data;
      //if creators fetched successfully add to select
      if (response.data) {
        response.data.map((item) => {
          data += `<option class="form-select" value="${item}">${item}</option>`;
        });
        $("#creatorFolders").html(data);
        fetch_projects($("#creatorFolders").val());
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
//fetch creators
fetch_creators();
//show project section in DOM
$("#project").attr("hidden", false);

//new creator handler
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
          timerProgressBar: true,
          timer: 2000,
        });
        fetch_creators();
        $("#creator_name").val("");
      })
      .catch((err) => {
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
