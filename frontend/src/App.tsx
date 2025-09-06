import {type FC, useState} from 'react';
import {Chart} from './components/Chart.tsx';
import type {OptionType} from './types/selectType.interface.ts';
import {AggregationTable} from './components/AggregationTable.tsx';
import Select, {type SingleValue} from 'react-select';
import {formatForSelect} from './utils/selector.utils.ts';
import {groupedByValues} from './configs/groupedByOptions.config.ts';
import {useFetchChartData} from './hooks/useFetchChartData.ts';
import {useFetchTableData} from './hooks/useFetchTableData.ts';

export const App: FC = () => {
  const [selectedEventType, setSelectedEventType] = useState<OptionType | null>(null);
  const [selectedGroupedBy, setSelectedGroupedBy] = useState<OptionType | null>(null);

  const {chartData, eventTypes, isChartLoading} = useFetchChartData(selectedEventType?.value);
  const {tableData, isTableLoading} = useFetchTableData(selectedEventType?.value, selectedGroupedBy?.value);

  const formattedEventTypes = formatForSelect(eventTypes);
  const formattedGroupedByOptions = formatForSelect(groupedByValues);

  const handleChangeGroupBy = (option: OptionType) => {
    setSelectedGroupedBy(option);
  }

  return (
    <div className='min-h-screen p-10 sm:px-2 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
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
          isLoading={isChartLoading}
          isSearchable
          name="eventTypes"
          options={formattedEventTypes}
          onChange={(option: SingleValue<OptionType>) => {
            if (option) setSelectedEventType(option);
          }}
        />
      )}

      <div className="grid grid-cols-2 items-stretch lg:grid-cols-1">
        <Chart data={chartData} isLoading={isChartLoading}/>
        <AggregationTable
          data={tableData}
          options={formattedGroupedByOptions}
          currentOption={selectedGroupedBy}
          onChangeGroupedBy={handleChangeGroupBy}
          isLoading={isTableLoading}
        />
      </div>
    </div>
  )
}
