import {type FC} from 'react';
import type {IChart} from '../types/chartData.interface.ts';
import Select, {type SingleValue} from 'react-select';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend, ResponsiveContainer, Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import {BarChart3} from 'lucide-react';
import {formatForSelect} from '../utils/selector.utils.ts';
import type {OptionType} from '../types/selectType.interface.ts';

interface Props {
  data: IChart[];
  options: string[];
  onChangeOption: (option: OptionType) => void;
}

interface PayloadItem {
  dataKey: string;
  value: number | string;
  color?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: PayloadItem[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/90 backdrop-blur-md border border-white/20 rounded-xl p-4 shadow-2xl text-white text-sm">
        <p className="font-semibold mb-2 text-blue-200 border-b border-white/10 pb-1">
          Дата: {label}
        </p>
        {payload.map((entry: PayloadItem, index: number) => (
          <p key={index} className="my-1 font-medium" style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value}${entry.dataKey === 'CTR' ? '%' : ''}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const Chart: FC<Props> = ({data, options, onChangeOption}) => {
  const formattedOptions = formatForSelect(options);

  return (
    <div className="w-fit p-4">
      <div
        className="bg-white/80 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center justify-between gap-10 flex-wrap px-4 mb-6">
          <div className="flex items-center relative z-10">
            <BarChart3 className="min-w-6 min-h-6 mr-3 text-blue-600"/>
            <h2 className="text-xl font-semibold text-gray-800">Расчет показателей CTR и EvPM по датам</h2>
          </div>
          {formattedOptions.length > 0 && (
            <Select
              className="chart-select chart-select--glass"
              classNamePrefix="select"
              defaultValue={formattedOptions[0]}
              isClearable={false}
              isSearchable
              name="eventTypes"
              options={formattedOptions}
              onChange={(option: SingleValue<OptionType>) => {
                if (option) onChangeOption(option);
              }}
            />
          )}
        </div>
        <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-200/50">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data} margin={{top: 30, right: 30, left: 0, bottom: 0}}>
              <defs>
                <linearGradient id="ctrAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="evpmAreaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.6}/>
              <XAxis
                dataKey="date"
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis stroke="#64748b" fontSize={12}/>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{color: '#374151', paddingTop: '20px', fontWeight: '500'}}
              />
              <Area
                type="monotone"
                dataKey="CTR"
                stackId="1"
                stroke="#8884d8"
                fill="url(#ctrAreaGradient)"
                dot={{fill: '#8884d8', strokeWidth: 2, r: 5}}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="EvPM"
                stackId="1"
                stroke="#82ca9d"
                fill="url(#evpmAreaGradient)"
                dot={{fill: '#82ca9d', strokeWidth: 2, r: 5}}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
