// Import resources
import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

// Import custom files
import PageCol from "../components/PageCol";
import PageContent from "../components/PageContent";
import PageSection from "../components/PageSection";
import { baseURL } from "../config/baseURL";
import CustomCard from "../components/CustomCard";
import { setLosses, setProfits } from "../redux/slices/chartSlice";
import TableProfits from "../components/TableProfits";
import TableLosses from "../components/TableLosses";
import SectionComparePrices from "../components/SectionComparePrices";
import SectionPairPrices from "../components/SectionPairPrices";

// Component
function Home() {
  // Define is mounted ref
  const isMounted = useRef(null);

  // Define dispatch
  const dispatch = useDispatch();

  // Debug
  //console.log("Debug: ", currentPairPrice);

  // SIDE EFFECTS
  useEffect(() => {
    // On mount
    isMounted.current = true;

    // SELECT ALL PROFITS
    axios({
      method: "GET",
      url: `${baseURL}/api/all-profit`,
    })
      .then((response) => {
        // Define resVar
        const resVar = response.data;
        // Debug
        //console.log("Profits: ", resVar);
        // Dispatch
        dispatch(setProfits(resVar));
      })
      .catch((err) => {
        console.log(err.message);
      });

    // SELECT ALL LOSSES
    axios({
      method: "GET",
      url: `${baseURL}/api/all-loss`,
    })
      .then((response) => {
        // Define resVar
        const resVar = response.data;
        // Debug
        //console.log("Losses: ", resVar);
        // Dispatch
        dispatch(setLosses(resVar));
      })
      .catch((err) => {
        console.log(err.message);
      });

    // Clean up
    return () => (isMounted.current = false);
  }, [dispatch]);

  // Return component
  return (
    <PageContent>
      {/** SECTION 1 - PAIR PRICES CHART */}
      <PageSection sectionClass="pt-3 mb-3">
        <SectionPairPrices />
      </PageSection>

      {/** SECTION 2 - COMPARE PRICE CHART */}
      <PageSection sectionClass="bg-light py-5">
        <SectionComparePrices />
      </PageSection>

      {/** SECTION 3 - PROFITS TABLE */}
      <PageSection sectionClass="pt-3 mb-3">
        {/** Col 1 */}
        <PageCol colClass="col-md-12 mb-3">
          <CustomCard cardClass="shadow" cardHeader="Profits">
            {/** Table */}
            <TableProfits />
          </CustomCard>
        </PageCol>
      </PageSection>

      {/** SECTION 4 - LOSSES TABLE */}
      <PageSection sectionClass="bg-light py-5">
        {/** Col 1 */}
        <PageCol colClass="col-md-12 mb-3">
          <CustomCard cardClass="shadow" cardHeader="Losses">
            {/** Table */}
            <TableLosses />
          </CustomCard>
        </PageCol>
      </PageSection>
    </PageContent>
  );
}

// Export
export default Home;
