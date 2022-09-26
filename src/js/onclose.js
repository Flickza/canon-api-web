import { saver } from "/js/saver.js";

$(window).on('beforeunload', function (e) {
    e.preventDefault();
    /* 
    if there is a YES / NO PROMPT FOR IMAGE AND USER CLOSES BROWSER DELETE IMAGE
    */
    if ($("#yes_no_wrapper:hidden").length === 0) {
        saver("no", $("#creatorFolders").val(), $("#projectFolders").val());
    }
});

