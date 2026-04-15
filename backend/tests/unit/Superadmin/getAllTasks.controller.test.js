import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/task.model.js", () => ({
    default: {
        find: jest.fn(),
    },
}));

const { getAllTasksDetails } = await import("../../../src/controllers/SuperAdminControllers/getAllTasks.controller.js");
const { default: taskModel } = await import("../../../src/models/task.model.js");

describe("getAllTasksDetails - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    afterEach(() => jest.restoreAllMocks());

    test("should return tasks", async () => {
        const mockQuery = {
            select: jest.fn().mockResolvedValue([{ task: "t1" }]),
        };

        taskModel.find.mockReturnValue(mockQuery);

        await getAllTasksDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});