import { AbstractInputProps } from "@/components/asbtract-input/AbstractInput";

export interface TextAreaParams {
    placeholder?: string;
    rows?: number;
}

export default function TextAreaInput(props: AbstractInputProps) {
    const params = props.params !== undefined ? JSON.parse(props.params) as TextAreaParams : undefined;

    const handleChange = (value: string) => {
        props.onChange({ text: value });
    }

    let currentValue = props.value?.text;
    if (currentValue === undefined) currentValue = "";

    if (currentValue !== props.value?.text) {
        handleChange(currentValue);
    }

    return (
        <textarea
            className={'px-4 py-2 rounded-lg border outline-0'}
            onChange={(event) => handleChange(event.target.value)}
            value={currentValue}
            placeholder={params?.placeholder}
            rows={params?.rows}
        />
    )
}