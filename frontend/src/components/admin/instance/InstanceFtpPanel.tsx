import { CopyableField } from "components/CopyableField";
import { Panel } from "components/Panel";
import { Instance } from "interfaces/Instance";
import styled from "styled-components";

export interface InstanceFtpPanelProps {
  instance: Instance;
}

export const InstanceFtpPanel = ({ instance }: InstanceFtpPanelProps) => {
  return (
    <Panel title="SSH & FTP Access" span={3}>
      <StyledContainer>
        <div>
          <div>
            <p>
              <strong>Host:</strong>
            </p>
            <CopyableField value={instance.agent.ip} />
          </div>
          <div>
            <p>
              <strong>Username:</strong>
            </p>
            <CopyableField value="username" />
          </div>
          <div>
            <p>
              <strong>Password:</strong>
            </p>
            <CopyableField value="password" obfuscate />
          </div>
        </div>
      </StyledContainer>
    </Panel>
  );
};

const StyledContainer = styled.div`
  padding: 0.8rem 0.8rem 0.5rem 0.8rem;

  & > div {
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
  }

  & > div > div {
    gap: 1rem;
    display: flex;
    align-items: center;

    & > p {
      margin: 0;
    }
  }
`;
