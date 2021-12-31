// Import resources
import moment from "moment";

// Export
export const COLUMNS_PROFITS = [
  {
    Header: "",
    id: "row",
    maxWidth: 50,
    filterable: false,
    Cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    Header: "Date",
    Footer: "Date",
    accessor: "created_on",
    Cell: ({ value }) => {
      if (value) {
        return moment(value).format("MMM D YYYY");
      } else {
        return "-";
      }
    },
  },
  {
    Header: "PairID",
    Footer: "PairID",
    accessor: "pairID",
  },
  {
    Header: "BuyEX",
    Footer: "BuyEX",
    accessor: "buy_exchange",
  },
  {
    Header: "SellEX",
    Footer: "SellEX",
    accessor: "sell_exchange",
  },
  {
    Header: "Status",
    Footer: "Status",
    accessor: "profit_loss",
    Cell: ({ value }) => {
      // Format value
      if (value) {
        return <span className="text-success fw-bold">{value}</span>;
      } else {
        return "-";
      }
    },
  },
];
