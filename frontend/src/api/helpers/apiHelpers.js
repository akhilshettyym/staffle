export function validateId(id, name = "ID") {
    if (!id) {
        throw new Error(`${name} is required`);
    }
}

export function validatePayload(payload) {
    if (!payload || Object.keys(payload).length === 0) {
        throw new Error("No data provided");
    }
}


export function handleAuthError(error) {
    const status = error.response?.status;

    if (status === 400) {
        throw new Error("Invalid request");
    }

    if (status === 401) {
        throw new Error("Invalid credentials");
    }

    if (status === 403) {
        throw new Error("You don't have permission to perform this action");
    }

    if (status === 404) {
        throw new Error("Resource not found");
    }

    if (status >= 500) {
        throw new Error("Server error. Please try again later");
    }

    throw new Error(error.message || "Something went wrong");
}

export function handleAdminError(error) {
    const status = error.response?.status;

    if (status === 404) {
        throw new Error("Resource not found");
    }

    if (status === 403) {
        throw new Error("You don't have permission to perform this action");
    }

    if (status >= 500) {
        throw new Error("Server error. Please try again later");
    }

    throw new Error(error.message || "Something went wrong");
}

export function handleApiError(error) {
    const status = error.response?.status;

    if (status === 404) {
        throw new Error("Resource not found");
    }

    if (status === 403) {
        throw new Error("You don't have permission to perform this action");
    }

    if (status === 401) {
        throw new Error("Unauthorized access");
    }

    if (status >= 500) {
        throw new Error("Server error. Please try again later");
    }

    throw new Error(error.message || "Something went wrong");
}