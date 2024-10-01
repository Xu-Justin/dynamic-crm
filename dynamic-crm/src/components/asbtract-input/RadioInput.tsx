import { AbstractInputProps } from "@/components/asbtract-input/AbstractInput";

export interface RadioParams {
    options?: { key: string, value: string }[];
}

export default function RadioInput(props: AbstractInputProps) {
    const params = props.params !== undefined ? JSON.parse(props.params) as RadioParams : undefined;

    const handleChange = (key: string) => {
        props.onChange({ varchar: key });
    }

    return (
        <div className={'flex flex-row gap-4'}>
            {params?.options && params.options.map(option => (
                <button
                    key={option.key}
                    className={`px-6 py-2 rounded-lg border transition-all ${props.value?.varchar === option.key ? 'bg-slate-200' : ''}`}
                    onClick={() => handleChange(option.key)}
                >
                    {option.value}
                </button>
            ))}
        </div>
    )
}