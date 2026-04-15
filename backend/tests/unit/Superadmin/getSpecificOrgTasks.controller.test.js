import { jest, describe, test, expect, beforeEach, afterEach } from "@jest/globals";

jest.unstable_mockModule("../../../src/models/task.model.js", () => ({
    default: { find: jest.fn() },
}));

const { getOrgSpecificTasksDetails } = await import("../../../src/controllers/SuperAdminControllers/getSpecificOrgTasks.controller.js");
const { default: taskModel } = await import("../../../src/models/task.model.js");

describe("getOrgSpecificTasksDetails - Unit", () => {
    let req, res;

    beforeEach(() => {
        jest.clearAllMocks();

        req = { params: { orgId: "org123" } };
        res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    });

    afterEach(() => jest.restoreAllMocks());

    test("should return tasks", async () => {
        const mockQuery = {
            select: jest.fn().mockReturnThis(),
            populate: jest.fn().mockResolvedValue([]),
        };

        taskModel.find.mockReturnValue(mockQuery);

        await getOrgSpecificTasksDetails(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
    });
});