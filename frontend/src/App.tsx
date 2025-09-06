import {type FC, useEffect, useState} from 'react';
import {fetchChartData} from './api/api.ts';
import type {IChart} from './types/chartData.interface.ts';
import {Chart} from './components/Chart.tsx';
import type {OptionType} from './types/selectType.interface.ts';

export const App: FC = () => {
  const [chartData, setChartData] = useState<IChart[]>([]);
  const [eventTypes, setEventTypes] = useState<string[]>([])

  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);

  useEffect(() => {
    fetchChartData(selectedOption?.value).then(res => {
      setChartData(res.chart_data);
      setEventTypes(res.event_types);
    });
  }, [selectedOption]);

  const hangleChangeOption = (option: OptionType) => {
    setSelectedOption(option)
  }

  return (
    <div className='min-h-screen p-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      <h1
        className="text-4xl text-center font-bold mb-4 text-blue-600 bg-clip-text">
        Dashboard
      </h1>
      <Chart data={chartData} options={eventTypes} onChangeOption={hangleChangeOption}/>
    </div>
  )
}
