// Import resources
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

// Import custom files
import colors from "../config/colors";
import {
  formatCurrentPriceDiffArr,
  handleUppercaseFirst,
} from "../config/functions";
import CustomCard from "./CustomCard";
import CustomLineChart from "./CustomLineChart";
import CustomSelect from "./CustomSelect";
import PageCol from "./PageCol";
import { baseURL } from "../config/baseURL";
import { selectPairs } from "../redux/slices/chartSlice";

// Component
function SectionComparePrices() {
  // Define is mounted ref
  const isMounted = useRef(null);

  // Select pairs
  const allPairs = useSelector(selectPairs);

  // Define state
  const [allBuyEx, setAllBuyEx] = useState([]);
  const [allSellEx, setAllSellEx] = useState([]);
  const [currentBuyEx, setCurrentBuyEx] = useState("");
  const [currentSellEx, setCurrentSellEx] = useState("");
  const [currentPair, setCurrentPair] = useState();
  const [currentPriceDiff, setCurrentPriceDiff] = useState([]);

  // Define initial current pair, buyex and sellex
  const initialCurrentPair = allPairs?.[0]?.id;
  const initialCurrentBuyEx = allBuyEx?.[0]?.buy_exchange;
  const initialCurrentSellEx = allSellEx?.[0]?.sell_exchange;

  // Check array length
  const allPairsLen = allPairs?.length > 0;
  const allBuyExLen = allBuyEx?.length > 0;
  const allSellExLen = allSellEx?.length > 0;

  // Logic to pick current buyex or sellex
  const currentBuyExLogic = currentBuyEx ? currentBuyEx : initialCurrentBuyEx;
  const currentSellExLogic = currentSellEx
    ? currentSellEx
    : initialCurrentSellEx;
  const currentPairLogic = currentPair ? currentPair : initialCurrentPair;

  // Format currentPriceDiff for chart
  const chartData = formatCurrentPriceDiffArr(currentPriceDiff);

  // Debug
  //console.log("Debug: Buy - ", allBuyExLen, " - Sell - ", allSellExLen);

  // SIDE EFFECTS
  useEffect(() => {
    // On mount
    isMounted.current = true;

    // SELECT ALL BUYEX
    axios({
      method: "GET",
      url: `${baseURL}/api/all-buyex`,
    })
      .then((response) => {
        // Define resVar
        const resVar = response.data;
        // Debug
        //console.log("allBuyEx: ", resVar);
        // Set state
        setAllBuyEx(resVar);
      })
      .catch((err) => {
        console.log(err.message);
      });

    // SELECT ALL SELLEX
    axios({
      method: "GET",
      url: `${baseURL}/api/all-sellex`,
    })
      .then((response) => {
        // Define resVar
        const resVar = response.data;
        // Debug
        //console.log("allSellEx: ", resVar);
        // Set state
        setAllSellEx(resVar);
      })
      .catch((err) => {
        console.log(err.message);
      });

    // SELECT CURRENT PRICE DIFF
    // If allPairsLen, allBuyExLen && allSellExLen
    if (allPairsLen && allBuyExLen && allSellExLen) {
      axios({
        method: "POST",
        url: `${baseURL}/api/current-price-diff`,
        data: {
          currentPair: currentPairLogic,
          currentBuyEx: currentBuyExLogic,
          currentSellEx: currentSellExLogic,
        },
      })
        .then((response) => {
          // Define resVar
          const resVar = response.data;
          // Debug
          //console.log("Debug: ", resVar);
          // Set state
          setCurrentPriceDiff(resVar);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    // CLEAN UP
    return () => (isMounted.current = false);
  }, [
    allPairsLen,
    allBuyExLen,
    allSellExLen,
    currentPairLogic,
    currentBuyExLogic,
    currentSellExLogic,
  ]);

  // Return component
  return (
    <>
      {/** Col 1 */}
      <PageCol colClass="col-md-12 mb-4">
        <CustomCard cardClass="shadow" cardHeader="Compare Prices">
          <div className="d-flex flex-row justify-content-end">
            {/** Select pairs */}
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

            {/** Select buy exchange */}
            <CustomSelect
              label="Buy Exchange"
              name="buyExInput"
              value={currentBuyEx}
              onChange={(e) => setCurrentBuyEx(e.currentTarget.value)}
            >
              <>
                {/* {console.log("CurrBuyEx: ", currentBuyEx)} */}
                {/** If allBuyEx exist */}
                {allBuyEx?.length > 0 ? (
                  // Loop
                  allBuyEx.map((item, index) => (
                    <option key={index} value={item.buy_exchange.toLowerCase()}>
                      {handleUppercaseFirst(item.buy_exchange)}
                    </option>
                  ))
                ) : (
                  <option value="">No buy exchange available</option>
                )}
              </>
            </CustomSelect>

            {/** Select sell exchange */}
            <CustomSelect
              label="Sell Exchange"
              name="sellExInput"
              value={currentSellEx}
              onChange={(e) => setCurrentSellEx(e.currentTarget.value)}
            >
              <>
                {/* {console.log("CurrSellEx: ", currentSellEx)} */}
                {/** If allSellEx exist */}
                {allSellEx?.length > 0 ? (
                  // Loop
                  allSellEx.map((item, index) => (
                    <option
                      key={index}
                      value={item.sell_exchange.toLowerCase()}
                    >
                      {handleUppercaseFirst(item.sell_exchange)}
                    </option>
                  ))
                ) : (
                  <option value="">No sell exchange available</option>
                )}
              </>
            </CustomSelect>
          </div>
          <div className="clearfix"></div>

          {/** Chart */}
          {/* <p>Chart goes here...</p> */}
          <div className="chart-container">
            <CustomLineChart
              data={chartData}
              lineDataKey1="difference"
              xAxisDataKey="created_on"
              yAxisDataKey="difference"
              lineColor1={colors.blue}
            />
          </div>
        </CustomCard>
      </PageCol>
    </>
  );
}

export default SectionComparePrices;
