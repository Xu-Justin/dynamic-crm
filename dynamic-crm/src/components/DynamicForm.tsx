'use client';

import { Field, Value } from "@/libs/model";
import AbstractInput from "@/components/asbtract-input/AbstractInput";
import { Fragment, useState } from "react";

interface Props {
    fields: Field[];
    onSubmit?: (values: { [key: string]: Value }) => void;
}

export default function DynamicForm(props: Props) {
    const [values, setValues] = useState<{ [key: string]: Value }>({});

    const handleChange = (fieldId: number, value: Value) => {
        setValues(prevState => ({
            ...prevState,
            [fieldId]: value,
        }));
    }

    const handleSubmit = () => {
        if (props.onSubmit !== undefined) {
            props.onSubmit(values);
        }
    }

    return (
        <form className={'grid grid-cols-[20%_auto] items-center gap-4 p-4 border rounded-lg'} action={handleSubmit}>
            {props.fields.map(field => (
                <Fragment key={field.fieldId}>
                    <label className={'text-sm opacity-50'}>
                        {field.fieldName}
                    </label>
                    <AbstractInput
                        variant={field.fieldVariant}
                        params={field.fieldParams}
                        value={values[field.fieldId]}
                        onChange={(value) => handleChange(field.fieldId, value)}
                    />
                </Fragment>
            ))}
            <div></div>
            <button type={'submit'} className={'px-4 py-2 rounded-lg bg-neutral-100 font-medium'}>
                Submit
            </button>
        </form>
    )
}