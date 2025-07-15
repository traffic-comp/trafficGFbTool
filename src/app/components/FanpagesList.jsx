'use client'
import useFBStore from '@/store/useFbStore';
import FanpageItem from '@/app/components/ui/FanpageItem';

const FanpagesList = ({ onItemClick}) => {
  const { pages, } = useFBStore();

  return (
    <div className="h-[100%] flex flex-col">
      {pages.map((page) => (
        <div className="grid grid-cols-3 gap-[30px]" key={page.id}>
          <FanpageItem
            text={`${page.category} ${page.name}`}
            click={() => onItemClick(page.id, page.access_token)}
          />
        </div>
      ))}
    </div>
  );
};

export default FanpagesList;
