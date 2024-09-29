'use client';

import { Button, Checkbox, ListItemPrefix, Menu, MenuHandler, MenuItem, MenuList, Option, Select } from "@material-tailwind/react";
import { ChangeEvent, useEffect, useState } from "react";
import { Customer, Organization, OrganizationField } from "@/libs/model";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchParamsKey, useUpdateSearchParams } from "@/libs/utils/search-params";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface Props {
    organizations: Organization[];
    organizationId?: number;
    organizationFields?: OrganizationField[];
    customers?: Customer[];
}

export default function Home(props: Props) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const updateSearchParams = useUpdateSearchParams({ router, pathname, searchParams });
    const [animationParent] = useAutoAnimate();

    const [columns, setColumns] = useState<(OrganizationField & { checked?: boolean })[]>([]);

    useEffect(() => {
        setColumns(props.organizationFields !== undefined ? props.organizationFields.map(field => {
            return { ...field, checked: true }
        }) : []);
    }, [props.organizationFields]);

    const handleSelectOrganization = (value: string | undefined) => {
        updateSearchParams([
            { key: SearchParamsKey.OrganizationId, value: value }
        ]);
    }

    const handleColumnsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        const fieldId = Number(event.target.id);
        if (isNaN(fieldId)) return;
        setColumns(prevColumns => prevColumns.map(column => column.fieldId === fieldId ? { ...column, checked: checked } : column));
    }

    return (
        <div className={'h-lvh flex flex-col items-center p-20 antialiased text-balance'}>
            <div className={'flex flex-col items-stretch gap-4 w-full max-w-screen-lg'}>
                <div className={'flex flex-row justify-between gap-4'}>
                    <div className={'flex flex-row justify-start items-center gap-4'}>
                        <div className={'w-72'}>
                            <Select
                                label={'Choose organization'}
                                value={props.organizationId?.toString()}
                                onChange={handleSelectOrganization}
                                key={props.organizations.length}
                            >
                                {props.organizations.map(organization => (
                                    <Option key={organization.organizationId} value={organization.organizationId.toString()}>
                                        {organization.organizationName}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className={'flex flex-row justify-end items-center gap-4'}>
                        <Button>
                            <span className={'text-nowrap'}>Add Customer</span>
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
                <div className={'rounded-lg shadow text-nowrap overflow-x-scroll'}>
                    <table className="table-auto text-left w-full">
                        <thead className={'border-b-2'}>
                        <tr>
                            {columns.filter(column => column.checked).map(column => (
                                <th key={column.fieldId} className={'bg-blue-gray-50/50 px-6 py-3'}>
                                    <span className={'font-semibold text-sm text-blue-gray-900 normal-case'}>
                                        {column.fieldName}
                                    </span>
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {props.customers !== undefined && props.customers.map(customer => (
                            <tr key={customer.customerId} className={'hover:bg-neutral-50 border-b'}>
                                {columns.filter(column => column.checked).map(column => (
                                    <td key={column.fieldId} className={'px-6 py-3'}>
                                        <span className={'font-normal text-sm text-blue-gray-900'}>
                                            {customer.fields[column.fieldId]?.fieldValue}
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
