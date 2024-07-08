const dummy = (req, res) => {
  res.send("wroking");
};

const view = async (req, res, next) => {
  res.send("view");
};
const update = async (req, res, next) => {
  res.send("update");
};
const remove = async (req, res, next) => {
  res.send("remove");
};

module.exports = { dummy, view, update, remove };
