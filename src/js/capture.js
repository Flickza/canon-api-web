import { saver } from "/js/saver.js";
const request = async (req, creator, project, prefix) => {
  return await axios
    .get(`/camera/${req}/${creator}/${project}/${prefix}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};
const viewer_options = {
  inline: true,
  backdrop: false,
  focus: true,
  fullscreen: true,
  loading: true,
  keyboard: true,
  movable: true,
  navbar: false,
  rotatable: false,
  scalabe: false,
  slideOnTouch: true,
  title: true,
  toggleOnDblclick: true,
  toolbar: false,
  tooltop: true,
  transition: true,
  zoomable: true,
  zoomOnTouch: true,
  zoomOnWheel: true,
  viewed() {
    viewer.zoomTo(0.2);
  },
};
$("#capture_image").click(async () => {
  var prefix = $("#prefix");
  var creator = $("#creatorFolders");
  var project = $("#projectFolders");
  const response = await request(
    "capture",
    creator.val(),
    project.val(),
    prefix.val()
  );
  console.log(response);
  if (response) {
    //save image?
    //show section yes_no_wrapper
    $("#yes_no_wrapper").attr("hidden", false);

    $("#save_yes").click((e) => {
      saver("yes", $("#creatorFolders").val(), $("#projectFolders").val());
      $("#yes_no_wrapper").attr("hidden", true);
    });
    $("#save_no").click((e) => {
      saver("no", $("#creatorFolders").val(), $("#projectFolders").val());
      $("#yes_no_wrapper").attr("hidden", true);
    });
    $("#image_container").html(response.data.img);
    const viewer = new Viewer(document.getElementById("image"), viewer_options);
  }
});

const viewer = new Viewer(document.getElementById("image"), viewer_options);
