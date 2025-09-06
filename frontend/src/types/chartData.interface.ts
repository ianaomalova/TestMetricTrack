export interface IChart {
  date: string;
  impressions: number;
  CTR: number;
  EvPM: number;
}

export interface IChartData {
  chart_data: IChart[];
  event_types: string[];
}
