import { Field, Organization, OrganizationField } from "@/libs/model";
import { RadioParams } from "@/components/asbtract-input/RadioInput";
import { TextParams } from "@/components/asbtract-input/TextInput";
import { TextAreaParams } from "@/components/asbtract-input/TextAreaInput";
import { NumberParams } from "@/components/asbtract-input/NumberInput";
import { PhoneNumberParams } from "@/components/asbtract-input/PhoneNumberInput";

export const organizations: Organization[] = [
    { organizationId: 0, organizationName: 'Acme Inc.' },
    { organizationId: 1, organizationName: 'Blue Inc.' },
]

const fullNameParams: TextParams = {
    placeholder: 'Full Name',
}

const emailParams: TextParams = {
    placeholder: 'Email',
    type: 'email',
}

const genderParams: RadioParams = {
    options: [
        { key: 'male', value: 'Male' },
        { key: 'female', value: 'Female' },
    ],
}

const descriptionParams: TextAreaParams = {
    placeholder: 'Description',
    rows: 3
}

const subscriptionLevelParams: NumberParams = {
    minValue: 1,
    maxValue: 5,
}

const phoneNumberParams: PhoneNumberParams = {
    placeholder: 'Phone Number',
    defaultDialCode: 62,
}

export const fields: Field[] = [
    { fieldId: 0, fieldName: 'Full Name', fieldVariant: 'text', fieldParams: JSON.stringify(fullNameParams) },
    { fieldId: 1, fieldName: 'Email', fieldVariant: 'text', fieldParams: JSON.stringify(emailParams) },
    { fieldId: 2, fieldName: 'Phone Number', fieldVariant: 'phone-number', fieldParams: JSON.stringify(phoneNumberParams) },
    { fieldId: 3, fieldName: 'Gender', fieldVariant: 'radio', fieldParams: JSON.stringify(genderParams) },
    { fieldId: 4, fieldName: 'Description', fieldVariant: 'text-area', fieldParams: JSON.stringify(descriptionParams) },
    { fieldId: 5, fieldName: 'Subscription Level', fieldVariant: 'number', fieldParams: JSON.stringify(subscriptionLevelParams) },
]

export const defaultFields: Field[] = [
    fields[0], fields[1], fields[2],
]

export const organizationFields: OrganizationField[] = [
    { organization: organizations[0], fields: [...defaultFields, fields[3], fields[4]] },
    { organization: organizations[1], fields: [...defaultFields, fields[5]] },
]
