import {type FC, useEffect, useState} from 'react';
import {fetchChartData} from './api/api.ts';
import type {IChart} from './types/chartData.interface.ts';
import {Chart} from './components/Chart.tsx';
import type {OptionType} from './types/selectType.interface.ts';
import {AggregationTable} from './components/AggregationTable.tsx';
import Select, {type SingleValue} from 'react-select';
import {formatForSelect} from './utils/selector.utils.ts';

export const App: FC = () => {
  const [chartData, setChartData] = useState<IChart[]>([]);
  const [eventTypes, setEventTypes] = useState<string[]>([])

  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const formattedOptions = formatForSelect(eventTypes);

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
            if (option) setSelectedOption(option);
          }}
        />
      )}
      <div className="grid grid-cols-2 items-stretch">
        <Chart data={chartData} options={eventTypes} onChangeOption={hangleChangeOption}/>
        <AggregationTable />
      </div>
    </div>
  )
}
