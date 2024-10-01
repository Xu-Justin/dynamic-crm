import { AbstractInputProps } from "@/components/asbtract-input/AbstractInput";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useEffect, useState } from "react";

const countryDialCodes: Record<number, string> = {
    62: 'Indonesia',
    86: 'China',
    91: 'India',
    81: 'Japan',
    82: 'South Korea',
    65: 'Singapore',
    60: 'Malaysia',
    63: 'Philippines',
    95: 'Myanmar',
    66: 'Thailand',
    84: 'Vietnam',
};

export interface PhoneNumberParams {
    placeholder?: string;
    defaultDialCode?: number;
}

export default function PhoneNumberInput(props: AbstractInputProps) {
    const params = props.params !== undefined ? JSON.parse(props.params) as PhoneNumberParams : undefined;

    const handleChange = (dialCode: number, phoneNumber: string) => {
        props.onChange({ number: Number(dialCode), varchar: phoneNumber.replace(/\D/g, '') });
    }

    let currentDialCode = props.value?.number;
    if (currentDialCode === undefined) currentDialCode = params?.defaultDialCode;
    if (currentDialCode === undefined) currentDialCode = 62;

    let currentPhoneNumber = props.value?.varchar;
    if (currentPhoneNumber === undefined) currentPhoneNumber = "";

    useEffect(() => {
        if (currentDialCode !== props.value?.number || currentPhoneNumber !== props.value.varchar) {
            handleChange(currentDialCode, currentPhoneNumber);
        }
    });

    return (
        <div className={'flex flex-row rounded-lg border'}>
            <Listbox value={currentDialCode} onChange={dialCode => handleChange(dialCode, currentPhoneNumber)}>
                <ListboxButton className={'flex flex-row items-center gap-2 border-r px-4 py-2'}>
                    <span className={'text-nowrap'}>
                        + {currentDialCode}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                    </svg>
                </ListboxButton>
                <ListboxOptions anchor={"bottom"} className={'flex flex-col gap-0.5 border rounded-lg px-2 py-2 mt-1 w-60 bg-white shadow'}>
                    {Object.entries(countryDialCodes).map(([dialCode, country]) => (
                        <ListboxOption key={dialCode} value={dialCode} className={'rounded px-2 py-1 cursor-pointer hover:bg-slate-100 transition-all'}>
                            (+ {dialCode}) {country}
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Listbox>
            <input
                className={'px-4 py-2 outline-0 w-full'}
                onChange={(event) => handleChange(currentDialCode, event.target.value)}
                value={currentPhoneNumber}
                placeholder={params?.placeholder}
                type={'tel'}
            />
        </div>
    )
}