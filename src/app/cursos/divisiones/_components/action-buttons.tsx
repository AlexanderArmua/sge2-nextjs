import React from "react";

type Filters = {
  pageSize: "10" | "20" | "30" | "40" | "50";
  pageIndex: string;
  orderBy: "anio" | "nombre"; // Cambia esto según los campos que uses para ordenar
  orderDirection: "asc" | "desc";
  searchText?: string;
};

type ActionButtonsDivisionesProps = {
  filters: Filters;
};

const ActionButtonsDivisiones: React.FC<ActionButtonsDivisionesProps> = ({ filters }) => {
  const handleAddDivision = () => {
    // Lógica para agregar una nueva división
  };

  const handleEditDivision = () => {
    // Lógica para editar una división seleccionada
  };

  const handleDeleteDivision = () => {
    // Lógica para eliminar una división seleccionada
  };

  return (
    <div className="flex space-x-4">
      <button onClick={handleAddDivision} className="btn btn-primary">
        Agregar División
      </button>
      <button onClick={handleEditDivision} className="btn btn-secondary">
        Editar División
      </button>
      <button onClick={handleDeleteDivision} className="btn btn-danger">
        Eliminar División
      </button>
    </div>
  );
};

export default ActionButtonsDivisiones;
