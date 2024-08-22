type TupleArray<T, N extends number> = N extends N
  ? number extends N
    ? T[]
    : _TupleOf<T, N, []>
  : never;
type _TupleOf<T, N extends number, R extends unknown[]> = R['length'] extends N
  ? R
  : _TupleOf<T, N, [T, ...R]>;

type MapTerrainDataRow = TupleArray<number, 13>;
export type MapTerrainData = TupleArray<MapTerrainDataRow, 13>;

export type GameElement = {
  x: number;
  y: number;
  height: number;
  width: number;
  color: string;
};
