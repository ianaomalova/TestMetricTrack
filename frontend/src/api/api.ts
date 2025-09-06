import axios from 'axios';
import type {IChartData} from '../types/chartData.interface.ts';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const fetchChartData = (eventType: string | undefined ) => {
  return axios.get<IChartData>(`${BASE_URL}/chart${eventType? `?event_type=${eventType}` : ''}`).then(res => res.data);
}
