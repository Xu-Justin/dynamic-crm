'use client';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { useState } from "react";
import { organizationFields, organizations } from "@/libs/mocks";
import DynamicForm from "@/components/DynamicForm";
import { Field, Value } from "@/libs/model";

export default function Page() {
    const [selectedOrganization, setSelectedOrganization] = useState(organizations[0]);

    const fields: Field[] = organizationFields
        .find(organizationField => organizationField.organization.organizationId === selectedOrganization.organizationId)
        ?.fields || [];

    const handleSubmit = (values: { [key: string]: Value }) => {
        alert(JSON.stringify(values, null, 4));
    }

    return (
        <div className={'flex flex-col w-full gap-4'}>
            <div className={'flex flex-row justify-end'}>
                <div className={'flex flex-col w-60'}>
                    <Listbox value={selectedOrganization} onChange={setSelectedOrganization}>
                        <ListboxButton className={'flex flex-row justify-between items-center border rounded-lg px-4 py-2'}>
                            {selectedOrganization.organizationName}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"/>
                            </svg>
                        </ListboxButton>
                        <ListboxOptions anchor={"bottom"} className={'flex flex-col gap-0.5 border rounded-lg px-2 py-2 mt-1 w-60 bg-white shadow'}>
                            {organizations.map(organization => (
                                <ListboxOption key={organization.organizationId} value={organization} className={'rounded px-2 py-1 cursor-pointer hover:bg-slate-100 transition-all'}>
                                    {organization.organizationName}
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Listbox>
                </div>
            </div>
            <DynamicForm
                key={selectedOrganization.organizationId}
                fields={fields}
                onSubmit={handleSubmit}
            />
        </div>
    )
}
