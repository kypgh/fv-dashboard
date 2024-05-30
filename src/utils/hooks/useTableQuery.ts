import { columnInterface } from "@/components/Table/TestTable";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { UseQueryOptions, useQuery } from "react-query";

type Options = {
  options?: UseQueryOptions;
  availableColumns: columnInterface[];
  fieldFn?: { [key: string]: (field: any) => any };
  rowFn?: (row: any) => any;
};

const useTableQuery = (
  queryKey: string[],
  queryFn: () => Promise<any>,
  { availableColumns, fieldFn, rowFn }: Options
) => {
  const searchParams = useSearchParams().toString();

  const [columns, setColumns] = useState(
    availableColumns.filter((col) => !col.isHidden)
  );

  const hideColumn = (columnName: string) => {
    setColumns((prevFields) =>
      prevFields.map((field) => {
        if (field.key === columnName) {
          return { ...field, isHidden: true };
        }
        return field;
      })
    );
  };

  const showColumn = (columnName: string) => {
    setColumns((prevFields) =>
      prevFields.map((field) => {
        if (field.key === columnName) {
          return { ...field, isHidden: false };
        }
        return field;
      })
    );
  };

  const toggleColumn = (columnName: string) => {
    setColumns((prevFields) =>
      prevFields.map((field) => {
        if (field.key === columnName) {
          return { ...field, isHidden: !field.isHidden };
        }
        return field;
      })
    );
  };

  const changeSize = (columnName: string, newSize: string) => {
    setColumns((prevFields) =>
      prevFields.map((field) => {
        if (field.key === columnName) {
          return { ...field, size: newSize };
        }
        return field;
      })
    );
  };

  const query = useQuery({
    queryKey: [...queryKey, searchParams],
    queryFn,
  });

  return {
    ...query,
    columns,
    hideColumn,
    showColumn,
    toggleColumn,
    changeSize,
  };
};

export default useTableQuery;
