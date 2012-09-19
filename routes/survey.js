exports.index = function(req, res) {
  return res.render("survey", {
    title: "Survey"
  });
};
