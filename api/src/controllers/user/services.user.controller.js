const createHttpError = require("http-errors");
const Service = require("../../models/Service.model");

const BrowseServices = async (req, res, next) => {
  try {
    const services = await Service.find({});

    if (!services)
      return next(createHttpError(500, "Error retrieving Services from Db"));

    return res.status(200).json({
      message: "Services Fetched successfully",
      data: services,
    });
  } catch (error) {
    return next(createHttpError(500, "Error retrieving services:" + error));
  }
};

const SearchServices = async (req, res, next) => {
  try {
    if (!req.body.search)
      return next(createHttpError(400, "Invalid Parameters"));

    const services = await Service.find({
      title: new RegExp(req.body.search, "i"),
    });

    if (!services)
      return next(createHttpError(500, "Error retrieving Services from Db"));

    return res.status(200).json({
      message: "Services Fetched successfully",
      data: services,
    });
  } catch (error) {
    return next(createHttpError(500, "Error Searching services:" + error));
  }
};

const QueryService = async (req, res, next) => {
  try {
    //     parameters={price:{
    //       $lt:1000,$gt:0
    //     },
    //   availability:"booked",rating:{
    //     $lt:5.0,$gt:0.0
    //   },
    //   serviceType:"catering",
    // }

    if (!req.body.parameters)
      return next(createHttpError(400, "Invalid Parameters"));
    const services = await Service.find(req.body.parameters);
    // console.log(`services`, services);
    if (!req.body.searchData) {
      return res.status(200).json({
        message: "Services Filtered successfully",
        data: services,
      });
    }
    if (!services)
      return next(createHttpError(500, "Error retrieving Services from Db"));

    const title_array = req.body.searchData.map((element) => element.title);
    // console.log(`title_array`, title_array);
    const result = services.filter((service) => {
      return title_array.includes(service.title);
    });

    // console.log(`result`, result);
    return res.status(200).json({
      message: "Services Filtered successfully",
      data: result,
    });
  } catch (error) {
    return next(createHttpError(500, "Error filtering services:" + error));
  }
};

module.exports = { BrowseServices, SearchServices, QueryService };
