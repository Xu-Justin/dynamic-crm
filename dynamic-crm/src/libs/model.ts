export interface Organization {
    organizationId: number;
    organizationName: string | null;
}

export interface Customer {
    customerId: number;
    organizationId: number;
    fields: Record<number, CustomerField>;
}

export type FieldType = 'TEXT' | 'NUMBER' | 'EMAIL' | 'PHONE_NUMBER' | 'DATE' | 'GENDER';

export interface OrganizationField {
    organizationId: number;
    fieldId: number;
    fieldName: string;
    fieldType: FieldType;
}

export interface CustomerField {
    customerId: number;
    fieldId: number;
    fieldName: string;
    fieldType: FieldType;
    fieldValue: string;
}
