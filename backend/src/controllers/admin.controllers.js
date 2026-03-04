import userModel from "../models/user.model.js";

export const updateAdminController = async (req, res) => {
   try {
       const loggedInUser = req.user;

       if (loggedInUser.role !== "ADMIN") {
           return res.status(403).json({
               success: false,
               message: "Only admins can update the details",
           });
       }

       const admin = await userModel.findById(loggedInUser._id);

       if (!admin) {
           return res.status(404).json({
               success: false,
               message: "Admin not found",
           });
       }

       if (admin.employmentStatus !== "ACTIVE") {
           return res.status(400).json({
               success: false,
               message: "Only active admin details can be updated",
           });
       }

       const { firstName, lastName, email, dateOfBirth, designation } = req.body;

       if (
           firstName === undefined &&
           lastName === undefined &&
           email === undefined &&
           designation === undefined &&
           dateOfBirth === undefined
       ) {
           return res.status(400).json({
               success: false,
               message: "No fields provided for update",
           });
       }

       if (email && email !== admin.email) {
           const existingEmail = await userModel.findOne({
               email,
               _id: { $ne: admin._id }
           });

           if (existingEmail) {
               return res.status(409).json({
                   success: false,
                   message: "Email already in use",
               });
           }

           admin.email = email;
       }

       if (firstName !== undefined) admin.firstName = firstName;
       if (lastName !== undefined) admin.lastName = lastName;
       if (designation !== undefined) admin.designation = designation;

       if (dateOfBirth !== undefined) {
           const parsedDate = new Date(dateOfBirth);
           if (isNaN(parsedDate.getTime())) {
               return res.status(400).json({
                   success: false,
                   message: "Invalid DOB format",
               });
           }
           admin.dateOfBirth = parsedDate;
       }

       await admin.save();

       return res.status(200).json({
           success: true,
           message: "Admin details updated successfully",
           admin,
       });

   } catch (error) {
       return res.status(500).json({
           success: false,
           message: "Error updating admin details",
           error: error.message
       });
   }
};