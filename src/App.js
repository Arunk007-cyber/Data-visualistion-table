import React from 'react';
import {data} from './constant'
import StatisticalTable from './component/StatisticalTable';


const calculateStatisticalMeasure = (data, propertyName, className, measure) => {
  const classData = data.filter(entry => entry.Alcohol === className);
  const propertyArray = classData.map(entry => parseFloat(entry[propertyName]));

  switch (measure) {
    case 'mean':
      return (
        (propertyArray.reduce((acc, value) => acc + value, 0) / propertyArray.length || 0).toFixed(3) || 0
      );
    case 'median':
      const sortedProperty = [...propertyArray].sort((a, b) => a - b);
      const middleIndex = Math.floor(sortedProperty.length / 2);
      return (
        (sortedProperty.length % 2 === 0
          ? (sortedProperty[middleIndex - 1] + sortedProperty[middleIndex]) / 2
          : sortedProperty[middleIndex]
        ).toFixed(3) || 0
      );
    case 'mode':
      return calculateMode(propertyArray).toFixed(3) || 0;
    default:
      return 0;
  }
};

const calculateMode = dataArray => {
  const countMap = new Map();
  let maxCount = 0;
  let mode = NaN;

  dataArray.forEach(value => {
    const count = (countMap.get(value) || 0) + 1;
    countMap.set(value, count);

    if (count > maxCount) {
      maxCount = count;
      mode = value;
    }
  });

  return isNaN(mode) ? 'No mode' : mode;
};


const calculateGamma = entry => {
  const { Ash, Hue, Magnesium } = entry;
  return (Ash * Hue) / Magnesium;
};



const App = () => {
 
  const dataWithGamma = data.map(entry => ({
    ...entry,
    Gamma: calculateGamma(entry),
  }));

  return (
    <div>
      <StatisticalTable data={data} propertyName="Flavanoids" measureNames={['mean', 'median', 'mode']} calculateStatisticalMeasure={calculateStatisticalMeasure}/>
      <StatisticalTable data={dataWithGamma} propertyName="Gamma" measureNames={['mean', 'median', 'mode']}  calculateStatisticalMeasure={calculateStatisticalMeasure}/>
    </div>
  );
};

export default App;
