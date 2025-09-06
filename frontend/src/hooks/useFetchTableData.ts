import { useEffect, useState } from "react";
import { fetchTableData } from "../api/api";
import type { ITableData } from "../types/tableData.interface";

export const useFetchTableData = (eventType?: string, groupedBy?: string) => {
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const [isTableLoading, setIsTableLoading] = useState(false);

  useEffect(() => {
    setIsTableLoading(true);
    fetchTableData(eventType, groupedBy)
      .then((res) => setTableData(res))
      .catch((err) => console.error(err))
      .finally(() => setIsTableLoading(false));
  }, [eventType, groupedBy]);

  return { tableData, isTableLoading };
};
