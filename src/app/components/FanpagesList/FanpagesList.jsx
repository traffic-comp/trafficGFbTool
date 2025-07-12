'use client'
import useFBStore from '@/store/useFbStore';
import FanpageItem from '../ui/Fanpageitem/FanpageItem';
import s from './fanpageslist.module.scss'

const FanpagesList = ({ onItemClick}) => {
  const { pages, } = useFBStore();

  return (
    <div className={s.fanpagesContainer}>
      {pages.map((page) => (
        <div className={s.wrapper} key={page.id}>
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
