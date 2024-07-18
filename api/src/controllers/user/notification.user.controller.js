const createHttpError = require("http-errors");
const mongoose = require("mongoose");
const { Notification } = require("../../models");

const AddNotification = async (req, res, next) => {
  try {
    if (!req.body.title || !req.body.message)
      return next(createHttpError(400, "Missing Parameters"));

    const userId = req.user;

    const NewNotif = new Notification({
      title: req.body.title,
      message: req.body.message,
      userId: userId,
    });
    await NewNotif.save();

    return res.status(200).json({
      success: true,
      message: "Notification added successfully",
      data: NewNotif,
    });
  } catch (error) {
    return next(createHttpError(500, "Error Adding notification: " + error));
  }
};

const GetUserNotification = async (req, res, next) => {
  try {
    const userId = req.user;

    const notifications = await Notification.find({ userId: userId });

    if (!notifications)
      return next(
        createHttpError(400, "Error fetching notification: " + error)
      );

    return res.status(200).json({
      success: true,
      message: "User Notification fetched successfully",
      data: notifications,
    });
  } catch (error) {
    return next(createHttpError(500, "Error Adding notification: " + error));
  }
};

module.exports = { AddNotification, GetUserNotification };
