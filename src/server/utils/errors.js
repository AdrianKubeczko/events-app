const paramsMod = params => (typeof params === 'string' ? { message: params } : params)

export class CustomError extends Error {
  constructor({ message, statusCode, details, name, stack, noLog, props }) {
    super();
    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
    this.details = details;
    this.props = props;
    if (stack) this.stack = stack;
    Object.setPrototypeOf(this, Error.prototype);
  }
}

export class PayloadSchemaError extends CustomError {
	constructor(params) {
		super({
			name: 'PayloadSchemaError',
			statusCode: 400,
			details: null,
			...paramsMod(params),
		})
		Object.setPrototypeOf(this, CustomError.prototype)
	}
}

export class ResponseSchemaError extends CustomError {
	constructor(params) {
		super({
			name: 'ResponseSchemaError',
			statusCode: 500,
			details: null,
			...paramsMod(params),
		})
		Object.setPrototypeOf(this, CustomError.prototype)
	}
}