const createHttpError = require("http-errors");

const { FieldValidator } = require("../../utils");
const { authMiddleware } = require("../../middlewares");
const { User } = require("../../models");
const { Service } = require("../../models");
const { Vendor } = require("../../models");
const { Admin } = require("../../models");

const dummy = (req, res) => {
  res.send("Working route on the above url");
};

/************ADMIN LOGIN AND REGISTER************/

const registerAdmin = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    //!CHECKING WHETHER ALL THE REQUIRED FIELDS ARE FILLED
    if (!email || !password || !name) {
      return next(createHttpError(400, "Please Enter all fields."));
    }

    // !CHECKING VALIDATION OF ALL THE FILEDS
    if (!FieldValidator.emailValidation(email)) {
      return next(createHttpError(500, "Enter valid email."));
    }
    if (!FieldValidator.passwordValidation(password)) {
      return next(
        createHttpError(500, "Password must be more than 6 character.")
      );
    }
    if (!FieldValidator.nameValidation(name)) {
      return next(createHttpError(500, "Enter valid Name."));
    }
    

    //!CHECKING WHETHER THE USER ALREADY EXIST OR NOT
    const adminAlreadyExists = await Admin.findOne({ email });
    if (adminAlreadyExists) {
      return next(createHttpError(400, "Admin already exists"));
    }

    // !CREATE NEW USER
    const admin = await Admin({
      email,
      password,
      name
    });
    await admin.save();
    const token = await authMiddleware.generateJwtToken(email, next);
    res.status(200).json({ message: "Registered new Admin.", admin, token });
  } catch (error) {
    return next(createHttpError(400, "Error in registering Admin. " + error));
  }
};

const loginAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //!CHECKING WHETHER ALL THE REQUIRED FIELDS ARE FILLED
    if (!email || !password) {
      return next(createHttpError(400, "Please Enter all fields."));
    }

    // !CHECKING WHETHER USER EXISIT OR NOT
    const adminAlreadyExists = await Admin.findOne({ email });
    if (!adminAlreadyExists) {
      return next(
        createHttpError(400, "Admin does not exists. Please Register first.")
      );
    }
    //CHECKING PASSWORD
    if (password !== adminAlreadyExists.password) {
      return next(createHttpError(400, "Invalid Password."));
    }
    const token = await authMiddleware.generateJwtToken(email, next);

    res.status(200).json({
      message: "Signed in",
      user: adminAlreadyExists,
      token,
    });
  } catch (error) {
    return next(createHttpError(400, "Error in signing in Admin. " + error));
  }
};


/****************View All Users****************/

// fetch all users by admin
const fetchAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });
    }
    res.status(200).json(users);
  } catch (error) {
    return next(createHttpError(400, "Error in fetching users. " + error));
  }
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
//Create new user by admin
const createUserByAdmin = async (req, res, next) => {
  const { email, password, firstName, lastName, phone, role } = req.body;
  try {
    if (!email || !password || !firstName || !lastName || !phone || !role) {
      return next(createHttpError(400, "Please enter all fields."));
    }

    if (!FieldValidator.emailValidation(email)) {
      return next(createHttpError(500, "Enter a valid email."));
    }
    if (!FieldValidator.passwordValidation(password)) {
      return next(
        createHttpError(500, "Password must be more than 6 characters.")
      );
    }
    if (!FieldValidator.nameValidation(firstName, lastName)) {
      return next(createHttpError(500, "Enter a valid name."));
    }
    if (!FieldValidator.phoneValidation(phone)) {
      return next(createHttpError(500, "Enter a valid phone number."));
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return next(createHttpError(400, "User already exists."));
    }

    const user = new User({
      email,
      password,
      firstName,
      lastName,
      phone,
      role,
    });
    await user.save();
    res.status(200).json({ message: "User created by admin.", user });
  } catch (error) {
    return next(
      createHttpError(400, "Error in creating user by admin. " + error)
    );
  }
};

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

module.exports = {
  dummy,
  registerAdmin,
  loginAdmin,
  fetchAllUsers,
  fetchAllVendors,
  addVendors,
  removeVendor,
  createUserByAdmin,
  updateUserByAdmin,
  deleteUserByAdmin,
  fetchAllServices,
  createServiceByAdmin,
  updateServiceByAdmin,
  deleteServiceByAdmin,
};
