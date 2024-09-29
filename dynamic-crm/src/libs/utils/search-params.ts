import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";

export type SearchParams = {
    [key: string]: string | string[] | undefined
}

export enum SearchParamsKey {
    OrganizationId = 'organization_id',
}

export const constructPathnameWithSearchParams = (pathname: string, args: { key: SearchParamsKey, value: any }[], searchParams?: ReadonlyURLSearchParams): string => {
    const params = new URLSearchParams(searchParams?.toString());
    args.forEach(arg => {
        if (arg.value === undefined) params.delete(arg.key);
        else params.set(arg.key, arg.value);
    });
    return `${pathname}?${params.toString()}`;
}

export const useUpdateSearchParams = (
    props: { router: AppRouterInstance, pathname: string, searchParams?: ReadonlyURLSearchParams }
) => (args: { key: SearchParamsKey, value: any }[]) => {
    const pathnameWithSearchParams = constructPathnameWithSearchParams(props.pathname, args, props.searchParams);
    props.router.push(pathnameWithSearchParams);
}

export const parseNumber = (value: unknown): number | undefined => {
    if (typeof value !== "string") return undefined;
    const result = parseInt(value);
    if (isNaN(result)) return undefined;
    else return result;
}

export const parseBoolean = (value: unknown): boolean | undefined => {
    if (typeof value !== "string") return undefined;
    if (value === 'true') return true;
    if (value === 'false') return false;
    return undefined;
}

export const parseString = (value: unknown): string | undefined => {
    if (typeof value !== "string") return undefined;
    return value;
}
