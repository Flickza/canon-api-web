var prefix = $("#prefix");
var creator = $("#creatorFolders");
var project = $("#projectFolders");
prefix.on("input", () => {
  if (creator.val() === null || project.val() === null || prefix.val() === "") {
    $("#capture_image").attr("disabled", true);
    return;
  }
  $("#capture_image").attr("disabled", false);
  $("#prefixExample").html(
    creator.val() +
      "-" +
      project.val() +
      "-" +
      prefix.val() +
      "-DATO-IDENTIFIKATOR.jpg"
  );
});
