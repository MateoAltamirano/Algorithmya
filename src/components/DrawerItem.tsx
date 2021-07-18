import { useHistory } from 'react-router-dom';

type DrawerItemProps = {
  label: string;
  route: string;
};

const DrawerItem = ({ label, route }: DrawerItemProps) => {
  const history = useHistory();
  const handleClick = () => {
    history.push(route);
  };

  return (
    <div className="item" onClick={() => handleClick()}>
      <div className="indicator" />
      <div className="label">{label}</div>
    </div>
  );
};

export default DrawerItem;
