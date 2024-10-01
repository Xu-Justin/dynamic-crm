export type FieldVariant = 'text' | 'text-area' | 'number' | 'radio' | 'phone-number';

export interface Value {
    varchar?: string;
    text?: string;
    number?: number;
    datetime?: Date;
}

export interface Field {
    fieldId: number;
    fieldName: string;
    fieldVariant: FieldVariant;
    fieldParams?: string;
}

export interface Organization {
    organizationId: number;
    organizationName: string;
}

export interface OrganizationField {
    organization: Organization;
    fields: Field[];
}
