/*******ALL APIS IN THIS FILE ARE TEMPERORARY AND THIS FILE WILL BE DELETED LATER********************/

  
  //update a particular user by admin
  
  const updateUserByAdmin = async (req, res, next) => {
    const { id } = req.params;
    const { email, firstName, lastName, phone, role } = req.body;
    try {
      if (!email || !firstName || !lastName || !phone || !role) {
        return next(createHttpError(400, "Please enter all fields."));
      }
  
      if (!FieldValidator.emailValidation(email)) {
        return next(createHttpError(500, "Enter a valid email."));
      }
      if (!FieldValidator.nameValidation(firstName, lastName)) {
        return next(createHttpError(500, "Enter a valid name."));
      }
      if (!FieldValidator.phoneValidation(phone)) {
        return next(createHttpError(500, "Enter a valid phone number."));
      }
  
      const user = await User.findById(id);
      if (!user) {
        return next(createHttpError(404, "User not found."));
      }
  
      user.email = email;
      user.firstName = firstName;
      user.lastName = lastName;
      user.phone = phone;
      user.role = role;
  
      await user.save();
      res.status(200).json({ message: "User updated by admin.", user });
    } catch (error) {
      return next(
        createHttpError(400, "Error in updating user by admin. " + error)
      );
    }
  };
  
  //delete users by admin
  
  const deleteUserByAdmin = async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
        return next(createHttpError(404, "User not found."));
      }
      res.status(200).json({ message: "User deleted by admin.", user });
    } catch (error) {
      return next(
        createHttpError(400, "Error in deleting user by admin. " + error)
      );
    }
  };
  
  /**************SERVICES CONTROLS****************/
  
  // Fetch all services
  const fetchAllServices = async (req, res, next) => {
    try {
      const services = await Service.find().populate("vendor_id", "name");
      res
        .status(200)
        .json({ message: "All services fetched successfully.", services });
    } catch (error) {
      return next(createHttpError(500, "Error in fetching services. " + error));
    }
  };
  
  // Create a new service by admin
  const createServiceByAdmin = async (req, res, next) => {
    const {
      vendor_id,
      title,
      description,
      price,
      availability,
      serviceType,
      imageUrl,
    } = req.body;
    try {
      if (
        !vendor_id ||
        !title ||
        !description ||
        !price ||
        !availability ||
        !serviceType ||
        !imageUrl
      ) {
        return next(createHttpError(400, "Please enter all fields."));
      }
  
      const vendor = await Vendor.findById(vendor_id);
      if (!vendor) {
        return next(createHttpError(404, "Vendor not found."));
      }
      if (!FieldValidator.priceValidation(price)) {
        return next(createHttpError(500, "Enter a valid price."));
      }
  
      const service = new Service({
        vendor_id,
        title,
        description,
        price,
        availability,
        serviceType,
        imageUrl,
      });
  
      await service.save();
      res.status(201).json({ message: "Service created by admin.", service });
    } catch (error) {
      return next(
        createHttpError(400, "Error in creating service by admin. " + error)
      );
    }
  };
  
  // Update a service by admin
  const updateServiceByAdmin = async (req, res, next) => {
    const { id } = req.params;
    const {
      vendor_id,
      title,
      description,
      price,
      availability,
      serviceType,
      imageUrl,
    } = req.body;
  
    try {
      // Check if all fields are provided
      if (
        !vendor_id ||
        !title ||
        !description ||
        !price ||
        !availability ||
        !serviceType ||
        !imageUrl
      ) {
        return next(createHttpError(400, "Please enter all fields."));
      }
  
      // Validate vendor_id
      const vendor = await Vendor.findById(vendor_id);
      if (!vendor) {
        return next(createHttpError(404, "Vendor not found."));
      }
  
      // Validate fields
      if (!FieldValidator.priceValidation(price)) {
        return next(createHttpError(500, "Enter a valid price."));
      }
  
      const service = await Service.findById(id);
      if (!service) {
        return next(createHttpError(404, "Service not found."));
      }
  
      // Update service fields
      service.vendor_id = vendor_id;
      service.title = title;
      service.description = description;
      service.price = price;
      service.availability = availability;
      service.serviceType = serviceType;
      service.imageUrl = imageUrl;
  
      await service.save();
      res.status(200).json({ message: "Service updated by admin.", service });
    } catch (error) {
      return next(
        createHttpError(400, "Error in updating service by admin. " + error)
      );
    }
  };
  
  // Delete a service by admin
  const deleteServiceByAdmin = async (req, res, next) => {
    const { id } = req.params;
  
    try {
      const service = await Service.findByIdAndDelete(id);
      if (!service) {
        return next(createHttpError(404, "Service not found."));
      }
      res.status(200).json({ message: "Service deleted successfully.", service });
    } catch (error) {
      return next(createHttpError(500, "Error in deleting service. " + error));
    }
  };