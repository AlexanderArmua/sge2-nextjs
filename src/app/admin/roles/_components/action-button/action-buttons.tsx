import { type z } from "zod";
import { AdminRolesNuevoRol } from "./nuevo-rol-button";
import { SubLinks } from "./action-buttons-links";
import { type inputGetRoles } from "@/shared/filters/admin-roles-filter.schema";
import { AdminRolesFilterText } from "../filtros/admin-roles-filter-text";
import { AdminRolesFilterPermiso } from "../filtros/admin-roles-filter-permiso";

type AdminRolesFilters = z.infer<typeof inputGetRoles>;

type ActionButtonsProps = {
  filters: AdminRolesFilters;
};

export const AdminActionButtons = ({ filters }: ActionButtonsProps) => {
  return (
    <div className="relative flex w-full flex-col items-center justify-between space-y-2 md:flex-row-reverse  md:space-x-1.5">
      <div className="relative flex w-full flex-row justify-end space-x-2 sm:basis-1/2 md:w-auto md:basis-1/3">
        <AdminRolesNuevoRol />

        <SubLinks />
      </div>

      <div className="flex w-full flex-row space-x-3 md:basis-1/2">
        <div className="md:basis-1/2">
          <AdminRolesFilterText filters={filters} />
        </div>
        <div className="md:basis-1/2">
          <AdminRolesFilterPermiso filters={filters} />
        </div>
      </div>
    </div>
  );
};