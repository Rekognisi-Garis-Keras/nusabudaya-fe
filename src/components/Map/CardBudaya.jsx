import React from "react";

const CardBudaya = ({ title, data, openInfo, setDetail, setTitle }) => {
  const name = data.name || data.title;

  const bgImage = data.image_url || "https://via.placeholder.com/300";

  return (
    <div
      style={{
        backgroundImage: `url('${bgImage}')`,
      }}
      className="flex flex-col p-1 w-full aspect-video bg-cover bg-center rounded-md border border-[#c7c7c7] relative hover:border-(--color-secondary)"
      onClick={() => {
        openInfo(true);
        setDetail(data);
        setTitle(title);
      }}
    >
      <div className="absolute p-5 flex flex-col items-start justify-end inset-0 top-0 left-0 bg-black/50 rounded-md">
        <h6 className="text-xs text-(--color-secondary) font-bold tracking-wider">
          {title}
        </h6>
        <h1 className="text-lg text-white font-extrabold uppercase">{name}</h1>
      </div>
    </div>
  );
};

export default CardBudaya;
