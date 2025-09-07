import React, { type FC } from 'react'
import type { IChart } from '../types/chartData.interface.ts'
import {
	Area,
	AreaChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import { BarChart3 } from 'lucide-react'
import { cardWrapper } from '../styles/common.ts'
import { formatValue } from '../utils/formatValue.utils.ts'

interface Props {
	data: IChart[]
}

interface PayloadItem {
	dataKey: string
	value: number | string
	color?: string
}

interface CustomTooltipProps {
	active?: boolean
	payload?: PayloadItem[]
	label?: string
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
	if (active && payload && payload.length) {
		return (
			<div
				className='bg-gray-900/90 backdrop-blur-md border
        border-white/20 rounded-xl p-4 shadow-2xl text-white
        text-sm xs:text-xs dark:bg-white/90 dark:border-gray-200 dark:text-gray-900'
			>
				<p className='font-semibold mb-2 text-blue-200 border-b border-white/10 pb-1 dark:text-blue-600 dark:border-gray-200'>
					Дата: {label}
				</p>
				{payload.map((entry: PayloadItem, index: number) => (
					<p
						key={index}
						className='my-1 font-medium'
						style={{ color: entry.color }}
					>
						{`${entry.dataKey}: ${formatValue(entry.value)}${
							entry.dataKey === 'CTR' ? '%' : ''
						}`}
					</p>
				))}
			</div>
		)
	}
	return null
}

const ChartComponent: FC<Props> = ({ data }) => {
	return (
		<div className='p-4 mt-5'>
			<div className={cardWrapper}>
				<div className='flex items-center mb-4 h-11'>
					<BarChart3 className='min-w-6 min-h-6 mr-3 text-blue-600' />
					<h2 className='text-2xl sm:text-xl font-semibold text-gray-800 dark:text-white/90'>
						Расчет показателей CTR и EvPM по датам
					</h2>
				</div>
				<div className='bg-gray-50/50 rounded-2xl p-6 border border-gray-200/50 dark:bg-gray-800/50 dark:border-gray-700/50'>
					<div className='overflow-x-scroll'>
						<div className='min-w-[600px] h-[400px]'>
							<ResponsiveContainer
								width='100%'
								height='100%'
								className='sm:w-200'
							>
								<AreaChart
									data={data}
									margin={{ top: 30, right: 30, left: 0, bottom: 0 }}
								>
									<defs>
										<linearGradient
											id='ctrAreaGradient'
											x1='0'
											y1='0'
											x2='0'
											y2='1'
										>
											<stop offset='5%' stopColor='#8884d8' stopOpacity={0.6} />
											<stop
												offset='95%'
												stopColor='#8884d8'
												stopOpacity={0.1}
											/>
										</linearGradient>
										<linearGradient
											id='evpmAreaGradient'
											x1='0'
											y1='0'
											x2='0'
											y2='1'
										>
											<stop offset='5%' stopColor='#82ca9d' stopOpacity={0.6} />
											<stop
												offset='95%'
												stopColor='#82ca9d'
												stopOpacity={0.1}
											/>
										</linearGradient>
									</defs>
									<CartesianGrid
										strokeDasharray='3 3'
										stroke='#e2e8f0'
										opacity={0.6}
									/>
									<XAxis dataKey='date' stroke='#64748b' fontSize={12} />
									<YAxis stroke='#64748b' fontSize={12} />
									<Tooltip content={<CustomTooltip />} />
									<Legend
										wrapperStyle={{
											color: '#374151',
											paddingTop: '20px',
											fontWeight: '500',
										}}
									/>
									<Area
										type='monotone'
										dataKey='CTR'
										stackId='1'
										stroke='#8884d8'
										fill='url(#ctrAreaGradient)'
										dot={{ fill: '#8884d8', strokeWidth: 2, r: 5 }}
										strokeWidth={2}
									/>
									<Area
										type='monotone'
										dataKey='EvPM'
										stackId='1'
										stroke='#82ca9d'
										fill='url(#evpmAreaGradient)'
										dot={{ fill: '#82ca9d', strokeWidth: 2, r: 5 }}
										strokeWidth={2}
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export const Chart = React.memo(ChartComponent)
