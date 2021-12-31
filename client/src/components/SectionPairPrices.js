// Import resources
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../config/baseURL";

// Import custom files
import colors from "../config/colors";
import { formatCurrentPairPriceArr } from "../config/functions";
import { selectPairs, setPairs } from "../redux/slices/chartSlice";
import CustomCard from "./CustomCard";
import CustomLineChart from "./CustomLineChart";
import CustomSelect from "./CustomSelect";
import PageCol from "./PageCol";

// Component
function SectionPairPrices() {
  // Define is mounted ref
  const isMounted = useRef(null);

  // Select pairs
  const allPairs = useSelector(selectPairs);

  // Define dispatch
  const dispatch = useDispatch();

  // Define initial current pair
  const initialCurrentPair = allPairs?.[0]?.id;

  // Define state
  const [currentPair, setCurrentPair] = useState();
  const [currentPairPrice, setCurrentPairPrice] = useState();

  // Check array length
  const allPairsLen = allPairs?.length > 0;

  // Logic to pick current pair
  const currentPairLogic = currentPair ? currentPair : initialCurrentPair;

  // Format current pair price for chart
  const chartData = formatCurrentPairPriceArr(currentPairPrice);
  //const chartData = currentPairPrice;

  // Debug
  //console.log("Debug: ", currentPairPrice);

  // SIDE EFFECTS
  useEffect(() => {
    // On mount
    isMounted.current = true;

    // SELECT ALL PAIRS
    axios({
      method: "GET",
      url: `${baseURL}/api/all-pairs`,
    })
      .then((response) => {
        // Define resVar
        const resVar = response.data;
        // Debug
        //console.log("Debug: ", resVar);
        // Dispatch
        dispatch(setPairs(resVar));
      })
      .catch((err) => {
        console.log(err.message);
      });

    // SELECT CURRENT PAIR PRICE
    // If allPairsLen
    if (allPairsLen) {
      axios({
        method: "POST",
        url: `${baseURL}/api/current-pair-price`,
        data: {
          currentPairID: currentPairLogic,
        },
      })
        .then((response) => {
          // Define resVar
          const resVar = response.data;
          // Debug
          //console.log("Debug: ", resVar);
          // Set state
          setCurrentPairPrice(resVar);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    // CLEAN UP
    return () => (isMounted.current = false);
  }, [dispatch, allPairsLen, currentPairLogic]);

  // Return component
  return (
    <>
      {/** Col 1 */}
      <PageCol colClass="col-md-12 mb-4">
        <CustomCard cardClass="shadow" cardHeader="Pair Prices">
          {/** Select pair */}
          <div className="d-flex flex-row justify-content-end">
            <CustomSelect
              label="Pairs"
              name="pairsInput"
              value={currentPair}
              onChange={(e) => setCurrentPair(e.currentTarget.value)}
            >
              <>
                {/* {console.log("Current Pair: ", currentPair)} */}
                {/** If pairs exist */}
                {allPairs?.length > 0 ? (
                  // Loop
                  allPairs.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.display}
                    </option>
                  ))
                ) : (
                  <option value="">No pairs available</option>
                )}
              </>
            </CustomSelect>
          </div>
          <div className="clearfix"></div>

          {/** Chart */}
          <div className="chart-container">
            <CustomLineChart
              data={chartData}
              lineDataKey1="buy_price"
              lineDataKey2="sell_price"
              xAxisDataKey="created_at"
              yAxisDataKey="buy_price"
              lineColor1={colors.success}
              lineColor2={colors.danger}
              lineName1="buy"
              lineName2="sell"
            />
          </div>
        </CustomCard>
      </PageCol>
    </>
  );
}

// Export
export default SectionPairPrices;
