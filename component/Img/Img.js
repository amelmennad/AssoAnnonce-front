import Image from "next/image";
import React from "react";

export default function Img({ src, alt, width, height, round }) {
  // if (response.data.avatar) {
  //   setSrcValue(response.data.avatar.replace("https://res.cloudinary.com/", ""));
  // } else {
  //   setSrcValue("dl6lvmsml/image/upload/v1668269419/volunteer/default-avatar_zusmrb.jpg");
  // }

  const defaultAvatar = ({ src, width }) => {
    return `https://res.cloudinary.com/${src}?w=${width}`;
  };

  const imgStyle = {
    width: width,
    height: height,
    // borderRadius: round,
    position: "relative",
  };
  return (
    <div style={imgStyle}>
      <Image
        loader={defaultAvatar}
        src={src ? src : "dl6lvmsml/image/upload/v1668269419/volunteer/default-avatar_zusmrb.jpg"}
        alt={alt}
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}
