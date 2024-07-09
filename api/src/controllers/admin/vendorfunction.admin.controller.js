const createHttpError = require("http-errors");



const { Vendor } = require("../../models");

const { Service } = require("../../models");

const dummy = (req, res) => {
  res.send("Working route on the above url");
};

/****************View All Vendors****************/

const fetchAllVendors = async (req, res, next) => {
    try {
      const vendors = await Vendor.find();
      if (vendors.length === 0) {
        return res.status(404).json({ message: "No vendor found." });
      }
      res.status(200).json(vendors);
    } catch (error) {
      return next(createHttpError(400, "Error in fetching vendors. " + error));
    }
  };
  
  /****************Add Vendor******************/
  const addVendors = async(req, res, next)=>{
    const { businessName, email, phone, password, address } = req.body;
  
    try {
      // Check if all required fields are provided
      if (!businessName || !email || !phone || !password || !address) {
        return next(createHttpError(400, "Please provide all required fields."));
      }
  
      // Check if the email is already registered
      const existingVendor = await Vendor.findOne({ email });
      if (existingVendor) {
        return next(createHttpError(400, "Email is already registered."));
      }
  
      // Create new vendor instance
      const newVendor = new Vendor({
        businessName,
        email,
        phone,
        password,
        address,
      });
  
      // Save vendor to database
      await newVendor.save();
  
      res.status(201).json({ message: "Vendor created successfully", vendor: newVendor });
    } catch (error) {
      return next(createHttpError(500, `Error in creating vendor: ${error.message}`));
    }
  };
  
  /********************Remove Vendor**********************/
  
  const removeVendor = async (req, res, next) => {
    const { id } = req.params;
    try {
      const vendor = await Vendor.findByIdAndDelete(id);
      if (!vendor) {
        return next(createHttpError(404, "vendor not found."));
      }
      res.status(200).json({ message: "vendor deleted by admin successfully.", vendor });
    } catch (error) {
      return next(
        createHttpError(400, "Error in deleting vendor by admin. " + error)
      );
    }
  };

/***********View services of particular vendors***********/

const fetchServices = async (req, res, next) => {
    try {
        const { vendorId } = req.params;
        const services = await Service.find({ vendor: vendorId});
        if (services.length === 0) {
          return next(createHttpError(404, "No services found for this vendor"));
        }
        res.status(200).json(services);
      } catch (error) {
        return next(createHttpError(500, `Error fetching services: ${error.message}`));
      }
    };


/***************************Create a service for a particular vendor********************************/

const createService = async (req, res, next) => {
    const { VendorId } = req.params;
    const { title, description, price, availability, serviceType } = req.body;
  
    try {
        console.log(`Received vendorId: ${VendorId}`);
      const vendors = await Vendor.findById(VendorId);
      if (!vendors) {
        return next(createHttpError(404, "Vendor not found"));
      }
  
      const newService = new Service({
        vendor: VendorId,
        title,
        description,
        price,
        availability,
        serviceType
      });
  
      const savedService = await newService.save();
  
      vendors.services.push(savedService._id);
      await vendors.save();
  
      res.status(201).json({ message: "Service created successfully", service: savedService });
    } catch (error) {
      return next(createHttpError(500, `Error creating service: ${error.message}`));
    }
  } ;
  
  
/****************Update a service of a particular vendor**********************************/


  const updateService = async (req, res, next) => {
    const { serviceId } = req.params;
    const { title, description, price, availability, serviceType } = req.body;
  
    try {
      const updatedService = await Service.findByIdAndUpdate(
        serviceId,
        { title, description, price, availability, serviceType },
        { new: true }
      );
  
      if (!updatedService) {
        return next(createHttpError(404, "Service not found"));
      }
  
      res.status(200).json({ message: "Service updated successfully", service: updatedService });
    } catch (error) {
      return next(createHttpError(500, `Error updating service: ${error.message}`));
    }
  };


/************Delete a service of a particular vendor************************/

  const deleteService = async (req, res, next) => {
    const { serviceId } = req.params;
  
    try {
      const deletedService = await Service.findByIdAndDelete(serviceId);
  
      if (!deletedService) {
        return next(createHttpError(404, "Service not found"));
      }
  
      // Remove the service from the vendor's services array
      await Vendor.updateOne(
        { services: serviceId },
        { $pull: { services: serviceId } }
      );
  
      res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
      return next(createHttpError(500, `Error deleting service: ${error.message}`));
    }
  }
module.exports = {
    dummy,
    fetchAllVendors,
    addVendors,
    removeVendor,
    fetchServices,
    createService,
    updateService,
    deleteService
  };
  