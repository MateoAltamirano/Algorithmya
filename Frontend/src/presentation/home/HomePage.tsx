import HomePageModule from './HomePageModule';
import { ALGORITHMYA_MODULES } from '../../application/utils/constants';
import './Home.css';

const MODULES = [...ALGORITHMYA_MODULES];
MODULES.shift();

const HomePage = () => {
  return (
    <div className="home-page">
      {MODULES.map((module, idx) => (
        <HomePageModule
          label={module.text}
          color={module.color}
          route={module.route}
          idx={idx + 1}
          key={idx}
        />
      ))}
    </div>
  );
};

export default HomePage;
