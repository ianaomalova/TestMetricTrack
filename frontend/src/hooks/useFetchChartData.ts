import { useEffect, useState } from "react";
import type { IChart } from "../types/chartData.interface";
import { fetchChartData } from "../api/api";

export const useFetchChartData = (eventType?: string) => {
  const [chartData, setChartData] = useState<IChart[]>([]);
  const [eventTypes, setEventTypes] = useState<string[]>([]);
  const [isChartLoading, setIsChartLoading] = useState(false);

  useEffect(() => {
    setIsChartLoading(true);
    fetchChartData(eventType)
      .then((res) => {
        setChartData(res.chart_data);
        setEventTypes(res.event_types);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsChartLoading(false));
  }, [eventType]);

  return { chartData, eventTypes, isChartLoading };
};
