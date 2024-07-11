const express = require("express");
const {
  userAuthRoute,
  userProfileRoute,
  userServiceRoute,
  userVendorRoute,
  userBookingROute,
  userReviewRoute,
  userNotificationRoute,
  userPaymentRoute,
} = require("./user");
const { vendorAuthRoute } = require("./vendor");
const { adminAuthRoute } = require("./admin");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: userAuthRoute,
  },
  {
    path: "/vendor/auth",
    route: vendorAuthRoute,
  },
  {
    path: "/admin",
    route: adminAuthRoute,
  },
  {
    path: "/user",
    route: userProfileRoute,
  },
  {
    path: "/services",
    route: userServiceRoute,
  },
  {
    path: "/vendors",
    route: userVendorRoute,
  },
  {
    path: "/bookings",
    route: userBookingROute,
  },
  {
    path: "/reviews",
    route: userReviewRoute,
  },
  {
    path: "/notifications",
    route: userNotificationRoute,
  },
  {
    path: "/payment",
    route: userPaymentRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
