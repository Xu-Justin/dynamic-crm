import { createSafeActionClient, returnValidationErrors } from "next-safe-action";
import { Schema } from "next-safe-action/adapters/types";

export const actionClient = createSafeActionClient();


export class ValidationErrors<S extends Schema | (() => Promise<Schema>)> {
    private schema: S;
    private validationError: any;
    private hasError: boolean;

    constructor(schema: S) {
        this.schema = schema;
        this.validationError = {};
        this.hasError = false;
    }

    validate(verdict: boolean, key: string, message: string) {
        if (!verdict) {
            this.hasError = true;
            if (!this.validationError[key]) {
                this.validationError[key] = { _errors: [] };
            }
            this.validationError[key]._errors.push(message);
        }
        return this;
    }

    return(): never | void {
        if (this.hasError) {
            returnValidationErrors(this.schema, this.validationError);
        }
    }
}

export function validationErrors(result: any, key: string): string[] {
    return result?.validationErrors?.[key]?._errors || [];
}
