import mongoose from "mongoose";
import crypto from "node:crypto";

const organizationSchema = new mongoose.Schema(
    {
        uuid: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },

        orgName: {
            type: String,
            required: [true, "Organization name is required"],
            trim: true,
            minlength: [3, "Organization name must be at least 3 characters"],
            maxlength: [50, "Organization name cannot exceed 50 characters"],
        },

        orgDomain: {
            type: String,
            required: [true, "Organization domain is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}$/i, "Please enter a valid domain"],
        },

        orgCountry: {
            type: String,
            default: null,
            trim: true,
            enum: {
                values: ["IN", "CA", "UK", "US"],
                message: "Country name is required"
            }
        },

        orgDescription: {
            type: String,
            required: [true, "Organization description is required"],
            trim: true,
            minlength: [10, "Description must be at least 10 characters"],
            maxlength: [500, "Description cannot exceed 500 characters"],
        },

        status: {
            type: String,
            enum: {
                values: ["PENDING", "ACTIVE", "REJECTED"],
                message: "{VALUE} is not a valid status. Must be PENDING, ACTIVE or REJECTED",
            },
            default: "PENDING",
            uppercase: true,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            // required: [true, "Organization must have a creator"],
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// organizationSchema.index({ orgDomain: 1 });
// organizationSchema.index({ uuid: 1 });
organizationSchema.index({ createdBy: 1 });

organizationSchema.pre("save", function (next) {
    if (this.isNew && !this.uuid) {
        this.uuid = crypto.randomUUID();
    }
    next();
});

const orgModel = mongoose.model("Organization", organizationSchema);

export default orgModel;