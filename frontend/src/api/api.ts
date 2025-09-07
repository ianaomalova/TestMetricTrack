import axios from 'axios'
import type { IChartData } from '../types/chartData.interface.ts'
import type { ITableData } from '../types/tableData.interface.ts'

const BASE_URL = 'http://127.0.0.1:8000/api'

export const fetchChartData = async (eventType?: string) => {
	try {
		const res = await axios.get<IChartData>(
			`${BASE_URL}/chart${eventType ? `?event_type=${eventType}` : ''}`
		)
		return res.data
	} catch (e) {
		console.error(e)
		throw e
	}
}

export const fetchTableData = async (eventType?: string, groupBy?: string) => {
	try {
		const res = await axios.get<ITableData[]>(
			`${BASE_URL}/table?${groupBy ? `group_by=${groupBy}` : ''}${
				eventType ? `&event_type=${eventType}` : ''
			}`
		)
		return res.data
	} catch (e) {
		console.error(e)
		throw e
	}
}
