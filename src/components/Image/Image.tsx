import React, { useState } from 'react';
import "./Image.scss";

interface ImageProps extends React.ComponentProps<"img"> {
  containerClass?: string;
}

const Image = ({ containerClass, src, ...props }: ImageProps) => {

  const [isPhotoLoading, setIsPhotoLoading] = useState(true);
  return (
    <div className={`c-image ${containerClass ? containerClass : ""} ${isPhotoLoading ? 'is-loading' : ''}`}>
      <img
        src={src}
        loading="lazy"
        onLoad={() => setIsPhotoLoading(false)}
        {...props}
      />
    </div>
  )
}

export default Image