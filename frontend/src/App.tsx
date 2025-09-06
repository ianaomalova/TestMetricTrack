import {type FC, useEffect, useState} from 'react';
import {fetchChartData, fetchTableData} from './api/api.ts';
import type {IChart} from './types/chartData.interface.ts';
import {Chart} from './components/Chart.tsx';
import type {OptionType} from './types/selectType.interface.ts';
import {AggregationTable} from './components/AggregationTable.tsx';
import Select, {type SingleValue} from 'react-select';
import {formatForSelect} from './utils/selector.utils.ts';
import type {ITableData} from './types/tableData.interface.ts';
import {groupedByValues} from './configs/groupedByOptions.config.ts';

export const App: FC = () => {
  const [chartData, setChartData] = useState<IChart[]>([]);
  const [tableData, setTableData] = useState<ITableData[]>([]);

  const [eventTypes, setEventTypes] = useState<string[]>([]);
  const [groupedByOptions] = useState<string[]>(groupedByValues);

  const [selectedEventTypes, setSelectedEventTypes] = useState<OptionType | null>(null);
  const [selectedGroupedBy, setSelectedGroupedBy] = useState<OptionType | null>(null);

  const formattedEventTypes = formatForSelect(eventTypes);
  const formattedFroupedByOptions = formatForSelect(groupedByOptions)

  useEffect(() => {
    fetchChartData(selectedEventTypes?.value).then(res => {
      setChartData(res.chart_data);
      setEventTypes(res.event_types);
    });
  }, [selectedEventTypes]);

  useEffect(() => {
    fetchTableData(selectedEventTypes?.value, selectedGroupedBy?.value).then(res => {
      setTableData(res);
      console.log(res)
    });
  }, [selectedEventTypes, selectedGroupedBy]);

  const handleChangeGroupBy = (option: OptionType) => {
    setSelectedGroupedBy(option);
  }

  return (
    <div className='min-h-screen p-10 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      <h1
        className="text-4xl text-center font-bold mb-4 text-blue-600 bg-clip-text">
        Dashboard
      </h1>
      {formattedEventTypes.length > 0 && (
        <Select
          className="custom-select custom-select--glass"
          classNamePrefix="select"
          defaultValue={formattedEventTypes[0]}
          isClearable={false}
          isSearchable
          name="eventTypes"
          options={formattedEventTypes}
          onChange={(option: SingleValue<OptionType>) => {
            if (option) setSelectedEventTypes(option);
          }}
        />
      )}
      <div className="grid grid-cols-2 items-stretch">
        <Chart data={chartData} />
        <AggregationTable
          data={tableData}
          options={formattedFroupedByOptions}
          onChangeGroupedBy={handleChangeGroupBy}
        />
      </div>
    </div>
  )
}
