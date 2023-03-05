import { useContext, useEffect, useRef } from "react";

import { SocketContext } from "App";
import { Terminal } from "components/Terminal";
import { Instance } from "interfaces/Instance";
import { SocketEvent, SocketEventName } from "interfaces/WebsocketEvents";
import { Panel } from "components/Panel";
import { Grid } from "components/Grid";

export interface ConsoleTabProps {
  instance: Instance;
}

export const ConsoleTab = () => {
  const ref = useRef();
  const { client } = useContext(SocketContext);

  const handleSocketEvent = (event: SocketEvent) => {
    switch (event.event) {
      case SocketEventName.INSTANCE_CONSOLE_RELAY:
        console.log(event.data);
        break;
    }
  };

  useEffect(() => {
    client?.on("message", (event: SocketEvent) => handleSocketEvent(event));
  }, []);

  return (
    <div>
      <Grid columns={1} className="p-4">
        <Panel title="Server Console">
          <Terminal
            onTextEntered={() => {
              // do something
            }}
            ref={ref}
          />
        </Panel>
      </Grid>
    </div>
  );
};
