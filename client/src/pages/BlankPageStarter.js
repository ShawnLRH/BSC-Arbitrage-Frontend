// Import resources
import React from "react";
import CustomCard from "../components/CustomCard";

// Import custom files
import PageCol from "../components/PageCol";
import PageContent from "../components/PageContent";
import PageSection from "../components/PageSection";

// Component
function BlankPageStarter() {
  // Return
  return (
    <PageContent>
      {/** SECTION 1 */}
      <PageSection sectionClass="my-5 py-5">
        <PageCol colClass="col-md-6 offset-md-3">
          <CustomCard cardClass="shadow" cardHeader="BlankPageStarter">
            {/** Form */}
            <p>Form goes here...</p>
          </CustomCard>
        </PageCol>
      </PageSection>
    </PageContent>
  );
}

// Export
export default BlankPageStarter;
