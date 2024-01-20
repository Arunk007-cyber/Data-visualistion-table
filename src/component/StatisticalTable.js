import React from "react";

const StatisticalTable = ({ data, propertyName, measureNames,calculateStatisticalMeasure }) => {
  const classes = [...new Set(data.map(entry => entry.Alcohol))];

  return (
    <div>
      <h2>{`${propertyName} Statistical Measures`}</h2>
      <table border="1">
        <tbody>
          <tr>
            <td>Measure</td>
            {classes.map(className => (
              <td key={`${propertyName}-table-${className}`}>{`Class ${className}`}</td>
            ))}
          </tr>
          {measureNames.map(measure => (
            <React.Fragment key={`${propertyName}-table-${measure}`}>
              <tr>
                <td>{`${propertyName} ${measure.charAt(0).toUpperCase() + measure.slice(1)}`}</td>
                {classes.map(className => (
                  <td key={`${propertyName}-table-${measure}-${className}`}>
                    {calculateStatisticalMeasure(data, propertyName, className, measure)}
                  </td>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default StatisticalTable;