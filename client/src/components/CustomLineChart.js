// Import resources
import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Component
function CustomLineChart({
  data,
  lineDataKey1,
  lineDataKey2,
  lineColor1,
  lineColor2,
  lineName1,
  lineName2,
  xAxisDataKey,
  yAxisDataKey,
}) {
  // Calculate Yaxis formatter
  const calYaxisFormatter = (number) => {
    let newNumber;
    if (number > 1000000000) {
      newNumber = (number / 1000000000).toString().substring(0, 9) + "B";
    } else if (number > 1000000) {
      newNumber = (number / 1000000).toString().substring(0, 6) + "M";
    } else if (number > 1000) {
      newNumber = (number / 1000).toString().substring(0, 3) + "K";
    } else {
      newNumber = number.toString();
    }
    // Return
    return newNumber;
  };

  // Return component
  return (
    <>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          //width={500}
          //height={500}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          {/** Line 1 */}
          <Line
            name={lineName1}
            type="monotone"
            dataKey={lineDataKey1}
            stroke={lineColor1}
            activeDot={{ r: 8 }}
          />

          {/** Line 2 */}
          {lineDataKey2 && (
            <Line
              name={lineName2}
              type="monotone"
              dataKey={lineDataKey2}
              stroke={lineColor2}
              activeDot={{ r: 8 }}
            />
          )}

          {/** Other components */}
          <Tooltip />
          <Legend />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey={xAxisDataKey} />
          <YAxis
            dataKey={yAxisDataKey}
            type="number"
            padding={{ top: 20, bottom: 20 }}
            domain={[0, "dataMax"]}
            allowDataOverflow={true}
            tickFormatter={calYaxisFormatter}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

// Export
export default CustomLineChart;
