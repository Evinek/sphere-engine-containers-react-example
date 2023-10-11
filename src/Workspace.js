import React, { useEffect, useState } from 'react';

const Workspace = ({workspaceId, workspaceToken}) => {
  
  const [scenarioState, setScenarioState] = useState('wait'); // only for tests

  console.log(`<Workspace workspaceId=${workspaceId} workspaceToken=${workspaceToken}><Workspace/>`);

  const afterScenarioExecution = (e) => {
    const data = e.data;
    console.log(data);
    setScenarioState(`${data.scenario} executed`); // only for tests
  };

  const afterScenarioExecutionExt = (e) => {
    const data = e.data;
    console.log(data);
  };
 
  useEffect(() => {
    console.log('mount <Workspace>');

    const createWorkspace = () => {
      console.log('create workspace...');
      const workspace = window.SE.workspace("seco-workspace");
      console.log('workspace', workspace);
      if (workspace) {
        workspace.events.subscribe('afterScenarioExecution', afterScenarioExecution);
        workspace.events.subscribe('afterScenarioExecutionExt', afterScenarioExecutionExt);
      }
    };

    const destroyWorkspace = () => {
      console.log('destroy workspace...');
      var workspace = window.SE.workspace("seco-workspace");
      console.log('workspace', workspace);
      if (workspace) {
        workspace.destroy();
      }
    };

    // We can skip `SE.ready` because our component is rendered after SDK is ready.
    createWorkspace();
    // window.SE.ready(() => {
    //   createWorkspace();
    // });
    
    console.log('finish mount <Workspace>');

    // Remember to destroy workspace using SDK!
    return () => {
      console.log('unmount <Workspace>');

      // We can skip `SE.ready` because our component is rendered after SDK is ready.
      destroyWorkspace();
      // window.SE.ready(() => {
      //   destroyWorkspace();
      // });
    };
  }, []);

  return (
    <div style={{'width': '100%', 'height': '100%'}}>
      Scenario state: {scenarioState}
      {/* don't use `className={'se-workspace'}` */}
      <div data-id="seco-workspace" data-workspace={workspaceId} data-workspace-token={workspaceToken || null}></div>
    </div>
  );
};

export default Workspace;
