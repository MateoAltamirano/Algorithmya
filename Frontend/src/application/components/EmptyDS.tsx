import { ReactNode } from 'react';
import { SearchIcon } from '../assets/icons/Icons';

type EmptyDSProps = {
  dsLabel: string;
  icon: ReactNode;
};

const EmptyDS = ({ icon, dsLabel }: EmptyDSProps) => {
  return (
    <div className="empty-ds">
      {icon}
      <div className="empty-ds-search">
        <SearchIcon fill="gray" stroke="gray" width="4rem" height="4rem" />
      </div>
      <div className="empty-ds-label">{`Your ${dsLabel} is empty!`}</div>
    </div>
  );
};

export default EmptyDS;
