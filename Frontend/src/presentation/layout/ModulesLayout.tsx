import { ReactNode } from 'react';
import ActionAccordion from '../../application/components/ActionAccordion';

type ModulesLayoutProps = {
  methods: ReactNode;
  dataStructure: ReactNode;
};

const ModulesLayout = ({ methods, dataStructure }: ModulesLayoutProps) => {
  return (
    <div className="modules">
      <div className="actions-module">
        <div className="actions">
          <ActionAccordion label="Methods" body={methods} />
        </div>
      </div>
      <div className="data-structure-module">{dataStructure}</div>
    </div>
  );
};

export default ModulesLayout;
