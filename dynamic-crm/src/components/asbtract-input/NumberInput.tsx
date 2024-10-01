import { AbstractInputProps } from "@/components/asbtract-input/AbstractInput";
import { useEffect } from "react";

export interface NumberParams {
    minValue?: number;
    maxValue?: number;
}

export default function NumberInput(props: AbstractInputProps) {
    const params = props.params !== undefined ? JSON.parse(props.params) as NumberParams : undefined;

    const handleChange = (value: number) => {
        if (params?.maxValue !== undefined && value > params.maxValue) {
            value = params.maxValue;
        }
        if (params?.minValue !== undefined && value < params.minValue) {
            value = params.minValue;
        }
        props.onChange({ number: value });
    }

    let currentValue = props.value?.number;
    if (currentValue === undefined) currentValue = params?.minValue;
    if (currentValue === undefined) currentValue = params?.maxValue;
    if (currentValue === undefined) currentValue = 0;

    useEffect(() => {
        if (currentValue !== props.value?.number) {
            handleChange(currentValue);
        }
    });

    return (
        <div className={'flex flex-row justify-start items-center gap-2'}>
            <button
                type={'button'}
                className={'flex flex-row justify-center items-center size-10 rounded-lg border'}
                onClick={() => handleChange(currentValue - 1)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14"/>
                </svg>
            </button>
            <input
                className={'px-4 py-2 rounded-lg border w-16 text-center outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'}
                onChange={(event) => handleChange(Number(event.target.value))}
                value={currentValue}
                type={'number'}
            />
            <button
                type={'button'}
                className={'flex flex-row justify-center items-center size-10 rounded-lg border'}
                onClick={() => handleChange(currentValue + 1)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                </svg>
            </button>
        </div>
    )
}