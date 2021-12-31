// Import resources
import React from "react";
import { Card } from "react-bootstrap";

// Component
function CustomCard({
  children,
  cardClass,
  cardImage,
  cardImageSrc,
  cardImageClass,
  cardHeader,
  cardHeaderClass,
  cardFooter,
  cardFooterClass,
  ...rest
}) {
  return (
    <>
      {/** Card */}
      <Card className={cardClass} {...rest}>
        {/** Card header*/}
        {cardHeader && (
          <Card.Header className={`fw-bold ${cardHeaderClass}`}>
            {cardHeader}
          </Card.Header>
        )}

        {/** Card image */}
        {cardImage && (
          <Card.Img
            variant="top"
            src={cardImageSrc}
            className={cardImageClass}
          />
        )}

        {/** Card body */}
        <Card.Body>{children}</Card.Body>

        {/** Card footer*/}
        {cardFooter && (
          <Card.Footer className={cardFooterClass}>{cardFooter}</Card.Footer>
        )}
      </Card>
    </>
  );
}

// Export
export default CustomCard;
