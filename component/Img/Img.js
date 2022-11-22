import Image from "next/image";
import React from "react";

export default function Img({ src, alt, width, height, round, status }) {
  const defaultAvatar = ({ src, width }) => {
    return `https://res.cloudinary.com/${src}?w=${width}`;
  };

  const imgStyle = {
    width: width,
    height: height,
    position: "relative",
  };
  return (
    <div style={imgStyle}>
      <Image
        loader={defaultAvatar}
        src={
          src
            ? src
            : status === "association"
            ? "dl6lvmsml/image/upload/v1669133338/default-img-association_iop0h1.png"
            : "dl6lvmsml/image/upload/v1669134254/default-img-volunteer_em1ybr.jpg"
        }
        alt={alt}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
