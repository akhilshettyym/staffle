import { jest, describe, test, expect, beforeEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/user.model.js", () => ({
    default: {
        findOne: jest.fn(),
        create: jest.fn(),
        countDocuments: jest.fn(),
    },
}));

jest.unstable_mockModule("../../../src/models/org.model.js", () => ({
    default: {
        findById: jest.fn(),
    },
}));

const { addEmployeeController } = await import("../../../src/controllers/AdminControllers/addEmployee.controller.js");
const { default: userModel } = await import("../../../src/models/user.model.js");
const { default: orgModel } = await import("../../../src/models/org.model.js");

describe("addEmployeeController - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            body: {
                firstName: "John",
                lastName: "Doe",
                email: "john@test.com",
                password: "password123",
                dateOfBirth: "1995-01-01",
                designation: "Developer",
            },
            user: {
                organizationId: "org123",
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    test("should add employee successfully", async () => {
        userModel.findOne.mockResolvedValue(null);
        orgModel.findById.mockResolvedValue({
            _id: "org123",
            status: "ACTIVE",
        });

        userModel.create.mockResolvedValue({ _id: "emp123" });

        await addEmployeeController(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
    });
});