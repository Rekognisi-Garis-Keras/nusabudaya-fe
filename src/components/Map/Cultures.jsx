import { Star, Stars } from "lucide-react";
import CardBudaya from "./CardBudaya";

export const Cultures = ({ 
  openInfo, 
  setDetail, 
  title,
  setTitle,
  data
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-white text-xl font-bold flex items-center gap-2">
        <Stars></Stars>
        {title}
      </h2>
      {data.map(item => (
        <CardBudaya 
          key={item.id}
          openInfo={openInfo} 
          setDetail={setDetail}
          title={title}
          setTitle={setTitle}
          data={item}
        />
      ))}
      <div className="border-t border-(--color-secondary) opacity-30"></div>
    </div>
  );
}
  