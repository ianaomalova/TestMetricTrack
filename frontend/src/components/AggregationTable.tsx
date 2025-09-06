import type {FC} from 'react';
import {cardWrapper} from '../styles/common.ts';
import type {ITableData} from '../types/tableData.interface.ts';
import type {OptionType} from '../types/selectType.interface.ts';
import Select, {type SingleValue} from 'react-select';
import {Table2} from 'lucide-react';
import {formatValue} from '../utils/formatValue.utils.ts';

interface Props {
  data: ITableData[];
  isLoading: boolean;
  options: OptionType[];
  onChangeGroupedBy: (option: OptionType) => void;
}

export const AggregationTable: FC<Props> = ({data, options, onChangeGroupedBy, isLoading}) => {
  return (
    <div className="p-4 mt-5">
      <div className={cardWrapper + ' h-full'}>
        {isLoading ? <span className="loader"></span> : (
          <>
            <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
              <div className="flex items-center">
                <Table2 className="min-w-6 min-h-6 mr-3 text-blue-600"/>
                <h2 className="text-2xl sm:text-xl font-semibold text-gray-800">Агрегационная таблица</h2>
              </div>
              <div>
                <Select
                  className="custom-select custom-select--glass table-select"
                  classNamePrefix="select"
                  defaultValue={options[0]}
                  isClearable={false}
                  isSearchable
                  name="eventTypes"
                  options={options}
                  onChange={(option: SingleValue<OptionType>) => {
                    if (option) onChangeGroupedBy(option);
                  }}
                ></Select>
              </div>
            </div>
            <div className="max-h-110 overflow-y-scroll">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Группа
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Показы
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CTR (%)
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    EvPM (‰)
                  </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row, idx) => {
                  return (
                    <tr key={idx}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{row.mm_dma ? 'mm_dma' : 'site_id'}</td>
                      <td className="px-6 py-4 text-sm text-right text-gray-700">{row.impressions}</td>
                      <td className="px-6 py-4 text-sm text-right text-green-600 font-semibold">{formatValue(row.CTR)}</td>
                      <td className="px-6 py-4 text-sm text-right text-blue-600 font-semibold">{formatValue(row.EvPM)}</td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
