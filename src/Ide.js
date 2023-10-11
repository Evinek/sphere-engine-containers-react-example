import { useEffect, useState } from 'react';
import Workspace from './Workspace';

const Ide = () => {

  const [workspaceKey, setWorkspaceKey] = useState(0); // only for force reload workspace
  const [SDKReady, setSDKReady] = useState(false);

  // only for force reload workspace
  const reloadWorkspace = () => {
    console.log('reloadWorkspace()');
    setWorkspaceKey(workspaceKey + 1);
  };

  useEffect(() => {
    window.SE.ready(() => {
      console.log('SDKReady');
      setSDKReady(true);
    });
  }, []);

  // DON'T DO THAT
  // useEffect(() => {
  //   console.log('Add SDK');
  //   window.SE_BASE = "containers.sphere-engine.com";
  //   window.SE_HTTPS = true;
  //   window.SE = window.SE || (window.SE = []);
  //   const script = document.createElement("script");
  //   script.id = 'sphere-engine-compilers-jssdk';
  //   script.src = 'https://TODO.containers.sphere-engine.com/static/sdk/sdk.min.js';
  //   script.async = true;
  //   script.onload = () => {
  //     console.log('SDKReady');
  //     setSDKReady(true);
  //   };
  //   document.body.appendChild(script);
  //   return () => {
  //     console.log('remove SDK');
  //     const scriptElem = document.getElementById('sphere-engine-compilers-jssdk');
  //     scriptElem.remove();
  //   };
  // }, []);

  let workspace = 'loading SDK...';
  if (SDKReady) {
    workspace = (
      <Workspace
        key={workspaceKey} // only for force reload workspace
        workspaceId="5519355568ee412580aaff0a40a60032"
        workspaceToken="02f84d84-3831-4d97-8b2f-b3defc1cd92c"
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
