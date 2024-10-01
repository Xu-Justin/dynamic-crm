import { AbstractInputProps } from "@/components/asbtract-input/AbstractInput";

export interface TextParams {
    placeholder?: string;
    type?: string;
}

export default function TextInput(props: AbstractInputProps) {
    const params = props.params !== undefined ? JSON.parse(props.params) as TextParams : undefined;

    const handleChange = (value: string) => {
        props.onChange({ varchar: value });
    }

    let currentValue = props.value?.varchar;
    if (currentValue === undefined) currentValue = "";

    if (currentValue !== props.value?.varchar) {
        handleChange(currentValue);
    }

    return (
        <input
            className={'px-4 py-2 rounded-lg border outline-0'}
            onChange={(event) => handleChange(event.target.value)}
            value={currentValue}
            placeholder={params?.placeholder}
            type={params?.type}
        />
    )
}