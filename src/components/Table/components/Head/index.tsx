import "./styles.css";
import { useState } from "react";
import { IFilterProps, IHead, ISortProps, TSort } from "./types";
import Filter from "./components/Filter";

export default function Head({ columns, colWidths, onSort, onFilter }: IHead) {
  const [sort, setSort] = useState<ISortProps>();
  const [filter, setFilter] = useState<IFilterProps>({ field: "", text: "" });
  const [openFilter, setOpenFilter] = useState<string>("");

  const sortIconType = sort?.sort === "desc" ? "↑" : "↓";

  return (
    <tr className="ds-table__head">
      {columns.map((col, j) => {
        const handleOpenFilter = (column: string) => {
          setOpenFilter(openFilter === column ? "" : column);
        };

        const handleFilterClick = (text: string) => {
          onFilter({ field: col.field, text });
          setFilter({ field: col.field, text });
        };

        const handleSortClick = (column: string) => {
          let changeSort;
          if (sort?.sort === "asc") changeSort = "desc";
          if (sort?.sort === "desc") changeSort = undefined;
          if (sort?.sort === undefined || sort?.field !== column) changeSort = "asc";
          setSort({ field: column, sort: changeSort as TSort });
          onSort({ field: column, sort: changeSort as TSort });
        };

        //--- Get column width for fixed columns
        let colWidth;
        if (col.fixed) {
          const fixedCols =
            col.fixed === "left"
              ? colWidths.filter((_, k) => columns[k].fixed !== undefined && k < j)
              : colWidths.filter((_, k) => columns[k].fixed !== undefined && k > j);
          colWidth = fixedCols.reduce((a, b) => a + b, 0);
        }

        const stickyStyle = col.fixed
          ? col.fixed === "left"
            ? { left: colWidth }
            : { right: colWidth }
          : {};

        const sortIcon = col.sortable ? (sort?.field === col.field ? sortIconType : "↓") : " ";

        const headerClasses = [];
        !col.sortable && !col.filterable && headerClasses.push("ds-table__head--adjust");
        col.fixed && headerClasses.push(`ds-table__fixed`);
        const headerClass = headerClasses.join(" ");

        const sortClasses = [];
        col.sortable && sortClasses.push("ds-table__head--cursor");
        sort?.field === col.field && sort?.sort && sortClasses.push("ds-table__head--color");
        const sortClass = sortClasses.join(" ");

        const containerClasses = ["ds-table__head--container"];
        containerClasses.push(`ds-table__head--${col.align || "left"}`);
        const containerClass = containerClasses.join(" ");

        const filterClasses = ["ds-table__head--filter"];
        filter?.field === col.field && filter?.text && filterClasses.push("ds-table__head--color");
        const filterClass = filterClasses.join(" ");

        return (
          <th key={col.field} className={headerClass} style={stickyStyle}>
            <div className={containerClass}>
              {col.renderHeader ? col.renderHeader(col.label) : col.label}

              {col.sortable && (
                <span className={sortClass} onClick={() => handleSortClick(col.field)}>
                  &nbsp;{sortIcon}&nbsp;
                </span>
              )}
              {col.filterable && (
                <span className={filterClass} onClick={() => handleOpenFilter(col.field)}>
                  ▼
                </span>
              )}
              {col.filterable && openFilter === col.field && (
                <Filter
                  value={filter.text}
                  onSearch={handleFilterClick}
                  onClose={() => handleOpenFilter(col.field)}
                />
              )}
            </div>
          </th>
        );
      })}
    </tr>
  );
}
