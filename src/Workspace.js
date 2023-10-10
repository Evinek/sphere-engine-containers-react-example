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
    console.log('create workspace...');
    console.log(window.SE);
    const workspace = window.SE.workspace("seco-workspace");
    console.log('workspace', workspace);
    if (workspace) {
      workspace.events.subscribe('afterScenarioExecution', afterScenarioExecution);
      workspace.events.subscribe('afterScenarioExecutionExt', afterScenarioExecutionExt);
    }

    return () => {
      console.log('destroy workspace...');
      var workspace = window.SE.workspace("seco-workspace");
      console.log('workspace', workspace);
      if (workspace) {
        workspace.destroy();
      }
    };
  }, []);

  return (
    <div style={{'width': '100%', 'height': '100%'}}>
      Scenario state: {scenarioState}
      <div data-id="seco-workspace" data-workspace={workspaceId} data-workspace-token={workspaceToken || null}></div>
    </div>
  );
};

export default Workspace;
