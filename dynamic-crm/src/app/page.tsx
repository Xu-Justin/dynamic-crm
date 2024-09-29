import Home from "@/components/Home";
import { selectCustomers, selectOrganizationFields, selectOrganizations } from "@/libs/repository";
import { parseNumber, SearchParams, SearchParamsKey } from "@/libs/utils/search-params";

interface Props {
    searchParams: SearchParams;
}

export default async function Page({ searchParams }: Props) {
    const organizations = await selectOrganizations();
    const organizationId = parseNumber(searchParams[SearchParamsKey.OrganizationId]);
    const organizationFields = organizationId !== undefined ? await selectOrganizationFields({ organizationId: organizationId }) : undefined;
    const customers = organizationId !== undefined ? await selectCustomers({ organizationId: organizationId }) : undefined;
    return (
        <Home
            organizations={organizations}
            organizationId={organizationId}
            organizationFields={organizationFields}
            customers={customers}
        />
    )
}
