import React from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export const SwaggerDoc = () => (
    <div style={{ padding: "20px" }}>
        <SwaggerUI
            url="http://localhost:3000/api-json" // URL вашего NestJS API
            docExpansion="list"
            persistAuthorization={true}
            defaultModelExpandDepth={2}
        />
    </div>
);
