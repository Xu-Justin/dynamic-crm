'use client';

import { Button, Checkbox, ListItemPrefix, Menu, MenuHandler, MenuItem, MenuList, Option, Select } from "@material-tailwind/react";
import { ChangeEvent, useEffect, useState } from "react";
import { Customer, Organization, OrganizationField } from "@/libs/model";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function Home() {

    const [animationParent] = useAutoAnimate();
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [selectedOrganization, setSelectedOrganization] = useState<Organization | undefined>(undefined);
    const [columns, setColumns] = useState<(OrganizationField & {checked?: boolean})[]>([]);
    const [customers, setCustomers] = useState<Customer[]>([]);

    useEffect(() => {
            setOrganizations([
                { organizationId: 1, organizationName: 'Acme Inc.' },
                { organizationId: 2, organizationName: 'Blue Sky Inc.' },
            ]);
            setColumns([
                { organizationId: 1, fieldId: 1, fieldName: 'Name', fieldType: 'TEXT'},
                { organizationId: 1, fieldId: 2, fieldName: 'Email', fieldType: 'EMAIL' },
                { organizationId: 1, fieldId: 3, fieldName: 'Phone Number', fieldType: 'PHONE_NUMBER' },
                { organizationId: 1, fieldId: 4, fieldName: 'Date of Birth', fieldType: 'DATE' },
            ]);
            setCustomers([
                { customerId: 1, organizationId: 1, fields: { 1: { customerId: 1, fieldId: 1, fieldType: 'TEXT', fieldName: 'Name', fieldValue: 'Alice' } } },
                { customerId: 2, organizationId: 1, fields: { 1: { customerId: 2, fieldId: 1, fieldType: 'TEXT', fieldName: 'Name', fieldValue: 'Bob' } } },
                { customerId: 3, organizationId: 1, fields: { 1: { customerId: 3, fieldId: 1, fieldType: 'TEXT', fieldName: 'Name', fieldValue: 'Charlie' } } },
            ]);
        },
        []
    );

    const handleSelectOrganization = (value: string | undefined) => {
        const organizationId = Number(value);
        if (isNaN(organizationId)) return;
        setSelectedOrganization(organizations.find(organization => organization.organizationId === organizationId));
    }

    const handleColumnsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        const fieldId = Number(event.target.id);
        if (isNaN(fieldId)) return;
        setColumns(prevColumns => prevColumns.map(column => column.fieldId === fieldId ? {...column, checked: checked} : column));
    }

    return (
        <div className={'h-lvh min-w-80 flex flex-col items-center p-20 antialiased text-balance'}>
            <div className={'flex flex-col items-stretch gap-4'}>
                <div className={'flex flex-row justify-between gap-4'}>
                    <div className={'flex flex-row justify-start items-center gap-4'}>
                        <div className={'w-72'}>
                            <Select
                                label={'Choose organization'}
                                value={selectedOrganization?.organizationId.toString()}
                                onChange={handleSelectOrganization}
                                key={organizations.length}
                            >
                                {organizations.map(organization => (
                                    <Option key={organization.organizationId} value={organization.organizationId.toString()}>
                                        {organization.organizationName}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className={'flex flex-row justify-end items-center gap-4'}>
                        <Button>
                            Add Customer
                        </Button>
                        <Menu placement="bottom-end" dismiss={{ itemPress: false }}>
                            <MenuHandler>
                                <Button className={'flex items-center gap-3'}>
                                    Columns
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    </svg>
                                </Button>
                            </MenuHandler>
                            <MenuList className={'items-stretch'}>
                                {columns.map(column => (
                                    <MenuItem key={column.fieldId} className={'p-0'}>
                                        <label htmlFor={column.fieldId.toString()} className={'flex w-full cursor-pointer items-center px-3 py-2'}>
                                            <ListItemPrefix className="mr-3">
                                                <Checkbox
                                                    id={column.fieldId.toString()}
                                                    ripple={false}
                                                    className="hover:before:opacity-0"
                                                    containerProps={{ className: "p-0" }}
                                                    onChange={handleColumnsChange}
                                                    checked={!!column.checked}
                                                />
                                            </ListItemPrefix>
                                            {column.fieldName}
                                        </label>
                                    </MenuItem>
                                ))}
                                <hr className="my-3"/>
                                <Button className={'w-full'}>
                                    Add column
                                </Button>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
                <div className={'overflow-hidden rounded-lg shadow'}>
                    <table className="table-auto text-left w-full">
                        <thead className={'border-b-2'}>
                        <tr>
                            {columns.filter(column => column.checked).map(column => (
                                <th key={column.fieldId} className={'bg-blue-gray-50/50 p-0'}>
                                    <Button variant={'text'} className={'flex justify-between items-center gap-3 w-full rounded-none'} color={'blue-gray'}>
                                        <span className={'font-semibold text-sm text-blue-gray-900 normal-case'}>
                                            {column.fieldName}
                                        </span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"/>
                                        </svg>
                                    </Button>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody ref={animationParent}>
                        {customers.map(customer => (
                            <tr key={customer.customerId} className={'hover:bg-neutral-50 border-b'}>
                                {columns.filter(column => column.checked).map(column => (
                                    <td key={column.fieldId} className={'px-4 py-3'}>
                                        <span className={'font-normal text-sm text-blue-gray-900'}>
                                            {column.fieldName} {customer.fields[column.fieldId]?.fieldValue}
                                        </span>
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
