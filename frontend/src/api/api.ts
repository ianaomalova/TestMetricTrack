import axios from 'axios';
import type {IChartData} from '../types/chartData.interface.ts';
import type {ITableData} from '../types/tableData.interface.ts';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchChartData = (eventType: string | undefined ) => {
  return axios.get<IChartData>(`${BASE_URL}/chart${eventType? `?event_type=${eventType}` : ''}`).then(res => res.data);
}

export const fetchTableData =
  (eventType: string | undefined, groupBy: string | undefined ) => {
    return axios
      .get<ITableData[]>(
        `${BASE_URL}/table?${groupBy ? `group_by=${groupBy}` : ''}${eventType ? `&event_type=${eventType}` : ''}`
      )
      .then(res => res.data);
  }
