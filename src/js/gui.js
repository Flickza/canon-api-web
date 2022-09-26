import * as dat from "/scripts/dat.gui.module.js";
//object containing all GUI elements
var foo = {};
//object containing all GUI labels property names
var settings_name = {};
//generate camera settings gui
var camera_settings = async () => {
  //fetch camera settings from settings route
  var settings = await axios.get("/camera/settings").then((response) => {
    return response.data.main.children;
  });
  //loop over settings for parent labels
  for (var i in settings) {
    var parent = settings[i];
    if (settings[i].type === "section") {
      //create gui folder
      var parent = gui.addFolder(parent.label);
    }
    //loop over children of parent labels and values
    for (var x in settings[i].children) {
      var child = settings[i].children[x];
      //create gui element in parent folder with child and value
      if (child.type === "string" || child.type === "date") {
        foo[child.label] = child.value;
        settings_name[child.label] = x;
        parent.add(foo, child.label).onFinishChange(function () {
          //change setting of camera on change in gui
          change_setting(
            this,
            settings_name[this.property],
            foo[this.property]
          );
        });
      } else if (child.type === "toggle") {
        foo[child.label] = child.value;
        settings_name[child.label] = x;
        parent.add(foo, child.label, 0, 1, 1).onFinishChange(function () {
          change_setting(
            this,
            settings_name[this.property],
            foo[this.property]
          );
        });
      } else if (child.type === "choice") {
        foo[child.label] = child.value;
        settings_name[child.label] = x;
        parent
          .add(foo, child.label, child.choices)
          .onFinishChange(function () {
            change_setting(
              this,
              settings_name[this.property],
              foo[this.property]
            );
          });
      }
    }
  }
};
var change_setting = (t, name, value) => {
  if (t.isModified()) {
    t.initialValue = foo[t.property];
    gui.domElement.style.pointerEvents = "none";
    gui.domElement.style.opacity = 0.8;
    axios
      .put(`/camera/settings/${name}`, { newValue: value })
      .then((response) => {
        console.log(response);
        gui.domElement.style.pointerEvents = "";
        gui.domElement.style.opacity = 1;
      })
      .catch((err) => {
        if (err) {
          console.log(err);
          gui.domElement.style.pointerEvents = "";
          gui.domElement.style.opacity = 1;
        }
      });
  }
};

var gui = new dat.GUI({
  closed: true,
  closeOnTop: true,
});
await camera_settings();