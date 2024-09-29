import { Customer, CustomerField, Organization, OrganizationField } from "@/libs/model";
import { connection, queryDatabase } from "@/libs/config/mysql";

interface SelectOrganizationProps {
    organizationId?: number;
    limit?: number;
}

export async function selectOrganizations(props?: SelectOrganizationProps): Promise<Organization[]> {
    return queryDatabase(`
        SELECT
            org.ORGANIZATION_ID as organizationId,
            org.ORGANIZATION_NAME as organizationName
        FROM TBL_ORGANIZATION org
        WHERE 1 = 1
            ${props?.organizationId !== undefined ? `AND org.ORGANIZATION_ID = ${connection.escape(props.organizationId)}` : ''}    
        ${props?.limit !== undefined ? `LIMIT ${connection.escape(props.limit)}` : ''}
    `);
}

interface SelectCustomersProps {
    customerId?: number;
    organizationId?: number;
    limit?: number;
}

export async function selectCustomers(props?: SelectCustomersProps): Promise<Customer[]> {
    return queryDatabase(`
        SELECT
           customer.CUSTOMER_ID as customerId,
           customer.ORGANIZATION_ID as organizationId
        FROM TBL_CUSTOMER customer
        WHERE 1 = 1
            ${props?.customerId !== undefined ? `AND customer.CUSTOMER_ID = ${connection.escape(props.customerId)}` : ''}
            ${props?.organizationId !== undefined ? `AND customer.ORGANIZATION_ID = ${connection.escape(props.organizationId)}` : ''}
        ${props?.limit !== undefined ? `LIMIT ${connection.escape(props.limit)}` : ''}
    `).then(async (customers: Customer[]) => {
        return Promise.all(
            customers.map(async customer => {
                const customerFields = await selectCustomerFields({ customerId: customer.customerId });
                const fields: Record<number, CustomerField> = {};
                customerFields.forEach(customerField => fields[customerField.fieldId] = customerField);
                customer.fields = fields;
                return customer;
            })
        );
    });
}

interface SelectCustomerFieldsProps {
    customerId: number;
    limit?: number;
}

export async function selectCustomerFields(props: SelectCustomerFieldsProps): Promise<CustomerField[]> {
    return queryDatabase(`
        SELECT
            customerField.CUSTOMER_ID as customerId,
            customerField.FIELD_ID as fieldId,
            organizationField.FIELD_NAME as fieldName,
            organizationField.FIELD_TYPE as fieldType,
            customerField.FIELD_VALUE as fieldValue
        FROM TBL_CUSTOMER_FIELD customerField
        CROSS JOIN TBL_ORGANIZATION_FIELD organizationField ON organizationField.FIELD_ID = customerField.FIELD_ID
        WHERE 1 = 1
            AND customerField.CUSTOMER_ID = ${connection.escape(props.customerId)}
        ${props?.limit !== undefined ? `LIMIT ${connection.escape(props.limit)}` : ''}
    `);
}

interface SelectOrganizationFieldsProps {
    organizationId: number;
    limit?: number;
}

export async function selectOrganizationFields(props: SelectOrganizationFieldsProps): Promise<OrganizationField[]> {
    return queryDatabase(`
        SELECT
            organizationField.ORGANIZATION_ID as organizationId,
            organizationField.FIELD_ID as fieldId,
            organizationField.FIELD_NAME as fieldName,
            organizationField.FIELD_TYPE as fieldType
        FROM TBL_ORGANIZATION_FIELD organizationField
        WHERE 1 = 1
            AND organizationField.ORGANIZATION_ID = ${connection.escape(props.organizationId)}
        ${props?.limit !== undefined ? `LIMIT ${connection.escape(props.limit)}` : ''}
    `);
}