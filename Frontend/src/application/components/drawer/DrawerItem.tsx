import { ReactNode } from 'react';
import { useHistory } from 'react-router-dom';
import { useLayout } from '../../providers/LayoutProvider';

type DrawerItemProps = {
  text: string;
  route: string;
  idx: number;
  icon: ReactNode;
};

const DrawerItem = ({ text, route, idx, icon }: DrawerItemProps) => {
  const history = useHistory();
  const {
    state: { pageIdx },
  } = useLayout();

  const handleClick = (): void => {
    history.push(route, idx);
  };

  return (
    <div className="item" onClick={() => handleClick()}>
      <div
        className="indicator"
        style={{
          backgroundColor: pageIdx === idx ? 'whitesmoke' : undefined,
        }}
      />
      <div className="label">
        <div className="icon">{icon}</div>
        <div className="text">{text}</div>
      </div>
    </div>
  );
};

export default DrawerItem;
