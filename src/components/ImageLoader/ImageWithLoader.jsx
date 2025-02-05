import React, { useState } from "react";

export const ImageWithLoader = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <div className="image-container">
      {/* Show loading spinner while image is loading */}
      {loading && !error && <div className="spinner"></div>}

      {/* Image element with load/error handling */}
      {!error && (
        <img
          src={src}
          alt={alt}
          className={`vehicle-card-image image ${loading ? "hidden" : "fade-in-animation"}`}
          onLoad={() => setLoading(false)}
          onError={() => {
            setLoading(false);
            setError(true);
          }}
        />
      )}

      {/* Show error message if image fails to load */}
      {error && <p className="error-text">Failed to load image</p>}
    </div>
  );
};