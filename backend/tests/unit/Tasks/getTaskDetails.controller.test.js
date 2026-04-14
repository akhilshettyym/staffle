import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/task.model.js", () => ({
    default: {
        find: jest.fn(),
    },
}));

const { getTaskDetailsController } = await import("../../../src/controllers/TaskControllers/getTaskDetails.controller.js");
const { default: taskModel } = await import("../../../src/models/task.model.js");

describe("getTaskDetailsController - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        jest.spyOn(console, "error").mockImplementation(() => { });

        req = {
            user: {
                organizationId: "org123",
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("should fetch tasks successfully", async () => {
        const mockTasks = [
            { _id: "1", title: "Task 1" },
            { _id: "2", title: "Task 2" },
        ];

        const mockQuery = {
            select: jest.fn().mockReturnThis(),
            sort: jest.fn().mockResolvedValue(mockTasks),
        };

        taskModel.find.mockReturnValue(mockQuery);

        await getTaskDetailsController(req, res);

        expect(taskModel.find).toHaveBeenCalledWith({
            organizationId: "org123",
        });

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            count: 2,
            tasks: mockTasks,
        });
    });

    test("should return empty array if no tasks", async () => {
        const mockQuery = {
            select: jest.fn().mockReturnThis(),
            sort: jest.fn().mockResolvedValue([]),
        };

        taskModel.find.mockReturnValue(mockQuery);

        await getTaskDetailsController(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            count: 0,
            tasks: [],
        });
    });

    test("should handle server error", async () => {
        taskModel.find.mockImplementation(() => {
            throw new Error("DB error");
        });

        await getTaskDetailsController(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: "Failed to fetch task details",
        });
    });
});