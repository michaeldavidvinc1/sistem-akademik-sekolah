import React from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

const Datatable = ({ data, column, actionTemplate }) => {
    const numberTemplate = (rowData, options) => {
        return options.rowIndex + 1;
    };
    return (
        <div>
            <DataTable
                value={data}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                className="text-sm"
                removableSort
            >
                <Column
                    header="No"
                    body={numberTemplate}
                    style={{ width: "3em" }}
                />
                {column.map((item, index) => (
                    <Column
                        key={index}
                        field={item.field}
                        header={item.header}
                        sortable={!!item.sortable}
                        body={item.body ? item.body : ""}
                    ></Column>
                ))}
                {actionTemplate && (
                    <Column
                        header="Actions"
                        body={actionTemplate}
                        style={{ width: "8em" }}
                    />
                )}
            </DataTable>
        </div>
    );
};

export default Datatable;
