export class ApiError extends Error {
    constructor(
        public statusCode: number,
        message: string
    ) {
        super(message)
        this.name = "ApiError"
    }
}

export class BadRequestError extends ApiError {
    constructor(message = "Bad request") {
        super(400, message)
        this.name = "BadRequestError"
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message = "Unauthorized") {
        super(401, message)
        this.name = "UnauthorizedError"
    }
}

export class ForbiddenError extends ApiError {
    constructor(message = "Forbidden") {
        super(403, message)
        this.name = "ForbiddenError"
    }
}

export class NotFoundError extends ApiError {
    constructor(message = "Not found") {
        super(404, message)
        this.name = "NotFoundError"
    }
}

export class ConflictError extends ApiError {
    constructor(message = "Conflict") {
        super(409, message)
        this.name = "ConflictError"
    }
}

export class InternalServerError extends ApiError {
    constructor(message = "Internal server error") {
        super(500, message)
        this.name = "InternalServerError"
    }
}
