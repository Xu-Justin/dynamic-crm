import RadioInput from "@/components/asbtract-input/RadioInput";
import { FieldVariant, Value } from "@/libs/model";
import TextInput from "@/components/asbtract-input/TextInput";
import TextAreaInput from "@/components/asbtract-input/TextAreaInput";
import NumberInput from "@/components/asbtract-input/NumberInput";
import PhoneNumberInput from "@/components/asbtract-input/PhoneNumberInput";

export interface AbstractInputProps {
    value?: Value;
    onChange: (value: Value) => void;
    params?: string;
}

interface Props extends AbstractInputProps {
    variant: FieldVariant;
}

export default function AbstractInput({ variant, ...inputProps }: Props) {
    switch (variant) {
        case 'text':
            return <TextInput {...inputProps}/>
        case 'text-area':
            return <TextAreaInput {...inputProps}/>
        case 'number':
            return <NumberInput {...inputProps} />
        case 'phone-number':
            return <PhoneNumberInput {...inputProps}/>
        case 'radio':
            return <RadioInput {...inputProps}/>
        default:
            return <div></div>;
    }
}