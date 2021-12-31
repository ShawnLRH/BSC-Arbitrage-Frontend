// Import resources
import moment from "moment";

// FUNCTIONS
// Intl number format
const intl = new Intl.NumberFormat();

// FORMAT CURRENT PAIR PRICE ARRAY
const formatCurrentPairPriceArr = (objArr) => {
  return objArr?.map((item) => {
    return {
      buy_price: Math.round(item.buy_price),
      sell_price: Math.round(item.sell_price),
      created_at: moment(item.created_at).format("MMM D YYYY"),
    };
  });
};

// FORMAT CURRENT PRICE DIFF ARRAY
const formatCurrentPriceDiffArr = (objArr) => {
  return objArr?.map((item) => {
    return {
      difference: item.difference,
      created_on: moment(item.created_on).format("MMM D YYYY"),
    };
  });
};

// CAPITALIZE STRING FIRST LETTER
const handleUppercaseFirst = (myString) => {
  // If myString is not a string
  if (typeof myString !== "string") return "";
  // Return
  return myString.charAt(0).toUpperCase() + myString.slice(1);
};

// Export
export {
  intl,
  formatCurrentPairPriceArr,
  handleUppercaseFirst,
  formatCurrentPriceDiffArr,
};
