<p align="center">
  <a target="_blank" href="https://jshub.cn/">
  <img alt="special sponsor appwrite" src="./autoCharts.png" width="300">
  </a>
</p>

<p align="center">
  <h3 align="center">autocharts.js</h3>
</p>
### 简介

autocharts.js 可以帮助你在不规范的数据中找出可用于 echarts 的数据，并返回符合echarts要求的基本格式。

目前 它仅支持两种 数据格式：

```typescript
type objInArr {
	xKey:string;
	yKey:number;
}
Array<objInArr>
```

```typescript
type standobj {
	arr1:["1","2","3"]
    arr2:[1,2,3],
   	arr3:[4,5,6]
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



