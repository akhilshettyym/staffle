import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        uuid: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
            minlength: [2, "First name must be at least 2 characters"],
            maxlength: [50, "First name cannot exceed 50 characters"]
        },

        lastName: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
            minlength: [2, "Last name must be at least 2 characters"],
            maxlength: [50, "Last name cannot exceed 50 characters"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please enter a valid email address"],
            maxlength: [100, "Email cannot exceed 100 characters"]
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            select: false
        },

        role: {
            type: String,
            enum: {
                values: ["SUPER_ADMIN", "ADMIN", "EMPLOYEE"],
                message: "{VALUE} is not a valid role. Must be SUPER_ADMIN, ADMIN, or EMPLOYEE",
            },
            required: [true, "User role is required"],
            uppercase: true
        },

        organizationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            default: null,
            index: true,
        },

        permissions: {
            type: [String],
            default: [],
            // add enum if permissions are fixed set
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                delete ret.password;
                return ret;
            },
        },
        toObject: { virtuals: true },
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    // console.log(candidatePassword, this.password);
    return bcrypt.compare(candidatePassword, this.password);
};

// userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ organizationId: 1, role: 1 });

userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`.trim();
});

userSchema.methods.belongsToOrganization = function (orgId) {
    return this.organizationId?.equals(orgId);
};

const userModel = mongoose.model("User", userSchema);

export default userModel;