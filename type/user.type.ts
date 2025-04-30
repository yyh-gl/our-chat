import {Tenant} from "@/type/tenant.type";

export type User = {
    id: string,
    email: string,
    tenants: Array<Tenant>
}
