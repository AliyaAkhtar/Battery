import React from "react";

function Page404() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f8f8f8",
        fontSize: "24px",
        color: "#333",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div>
        <h1 style={{ marginBottom: "20px" }}>404 - Page Not Found</h1>
        <p>Oops! The page you are looking for does not exist.</p>
        <p>Please check the URL or navigate back to the homepage.</p>
      </div>
    </div>
  );
}

export default Page404;
