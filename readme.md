<p align="center">
  <a target="_blank" href="https://jshub.cn/">
  <img alt="autoCharts" src="https://raw.githubusercontent.com/LarryZhu-dev/autocharts.js/master/autoCharts.png" width="300">
  </a>
</p>

<p align="center">
  <h3 align="center">autocharts.js</h3>
</p>
### 简介

autocharts.js 可以帮助你在不规范的数据中找出可用于 echarts 的数据，并返回符合echarts要求的基本格式。

目前 它仅支持两种 数据格式：

格式一：数组成员为包含x、y轴对应数据的对象

```typescript
type objInArr {
	xKey:string;
	yKey:number;
}
Array<objInArr>
// 例如
// const objInArr = [
//	{
//   name:"xAxisName",
//   value:100 
//	},...
//]
```

格式二：对象内包含多个长度一致的数组（推荐）

```typescript
type standobj {
	xKey:Array<string | number>,
	yKey1:Array<number>,
	yKey2:Array<number>
}
```

### 安装

```shell
npm i autocharts.js
```

### 使用示例

```js
import findChartData from 'autocharts.js'
let autoData = autoCharts.findChartData({
     rawData: yourData,
     xKey: "col3",
     yKey: "levelCount",
     type: "pie",
});
```

对于 `objInArr` 格式数据需传入 `xKey && yKey` 。`standobj` 格式数据可以不传入`xKey || yKey` ，但要求该对象内有两个或以上长度一致的数组，autocharts可以自动找出这些数组并按照数据类型将他们分为x、y轴数据，建议把数据处理成`standobj`格式后再使用。

返回的基本格式：

```json
{
    "xAxis": {
        "type": "category",
        "data": [
            "重旱",
            "中旱",
            "轻旱",
            "适宜",
            "过湿"
        ]
    },
    "series": {
        "type": "pie",
        "data": [
            {
                "value": 6816,
                "name": "重旱"
            },
            {
                "value": 317696,
                "name": "中旱"
            },
            {
                "value": 124228,
                "name": "轻旱"
            },
            {
                "value": 8811,
                "name": "适宜"
            },
            {
                "value": 2400,
                "name": "过湿"
            }
        ]
    },
    "legend": {
        "data": [
            "重旱",
            "中旱",
            "轻旱",
            "适宜",
            "过湿"
        ]
    }
}
```



