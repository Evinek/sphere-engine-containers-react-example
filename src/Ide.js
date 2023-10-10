import { useEffect, useState } from 'react';
import Workspace from './Workspace';

const SECO_SDK_SCRIPT_URL = 'https://test.dev-sea.sphere-engine.com/static/sdk/sdk.min.js';

const Ide = () => {

  const [workspaceKey, setWorkspaceKey] = useState(0); // only for force reload workspace
  const [SDKReady, setSDKReady] = useState(false);

  // only for force reload workspace
  const reloadWorkspace = () => {
    setWorkspaceKey(workspaceKey + 1);
  };

  useEffect(() => {
    console.log('Add SDK');
    window.SE_BASE = "test.dev-sea.sphere-engine.com";
    window.SE_HTTPS = true;
    window.SE = window.SE || (window.SE = []);
    const script = document.createElement("script");
    script.id = 'sphere-engine-compilers-jssdk';
    script.src = SECO_SDK_SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      console.log('SDKReady');
      setSDKReady(true);
    };
    document.body.appendChild(script);

    return () => {
      console.log('remove SDK');
      const scriptElem = document.getElementById('sphere-engine-compilers-jssdk');
      scriptElem.remove();
    };
  }, []);

  let workspace = 'loading SDK...';
  if (SDKReady) {
    workspace = (
      <Workspace
        key={workspaceKey} // only for force reload workspace
        workspaceId="ee713e66c7c9437188b536a1414c7e77"
        workspaceToken="4bb6a8f7-80fc-4adf-a5ea-b7f4690ab28b"
      ></Workspace>
    );
  }

  return (
    <div>
      <div style={{'width': '700px', 'height': '500px'}}>
        {workspace}
      </div>
      <button onClick={reloadWorkspace}>Reload workspace</button>
    </div>
  );
}

export default Ide;
