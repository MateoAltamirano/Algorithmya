import { useHistory } from 'react-router-dom';
import { useLayout } from '../providers/LayoutProvider';
import { LayoutActionType } from '../reducers/layoutReducer';

type DrawerItemProps = {
  label: string;
  route: string;
  idx: number;
};

const DrawerItem = ({ label, route, idx }: DrawerItemProps) => {
  const history = useHistory();
  const {
    state: { pageIdx },
    dispatch,
  } = useLayout();

  const handleClick = () => {
    dispatch({ type: LayoutActionType.UpdatePageIdx, payload: idx });
    history.push(route);
  };

  return (
    <div className="item" onClick={() => handleClick()}>
      <div
        className="indicator"
        style={{
          backgroundColor: pageIdx === idx ? 'whitesmoke' : undefined,
          boxShadow:
            pageIdx === idx ? '0 0 0.6rem 0 rgba(0, 0, 0, 0.25)' : undefined,
        }}
      />
      <div className="label">{label}</div>
    </div>
  );
};

export default DrawerItem;
