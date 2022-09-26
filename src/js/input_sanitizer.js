//replace invalid characters while typing
$("input").on("input", function (e) {
    $(this).val($(this).val().replace(/\W/, ""));
  });