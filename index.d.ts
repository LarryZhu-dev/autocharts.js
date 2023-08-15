declare interface findCharDataOptions {
  rawData: Object | Array<any>;
  type?: string;
  xKey?: string;
  yKey?: string;
}
declare interface Autocharts {
  /**
  * 查找 echarts 数据
  */
  findCharData(options: findCharDataOptions): Object;
}
declare const autocharts: Autocharts;

export default autocharts;