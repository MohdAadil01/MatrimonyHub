const express = require("express");
const { userAuthRoute } = require("./user");
const { vendorAuthRoute } = require("./vendor");
const { adminAuthRoute } = require("./admin");
const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: userAuthRoute,
  },
  {
    path: "/vendor",
    route: vendorAuthRoute,
  },
  {
    path: "/admin",
    route: adminAuthRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
