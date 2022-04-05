import faker from "@faker-js/faker";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

import { AccentColor } from "utils/styles";
import { ChartConfig } from "constants/ChartConfig";
import { SecondaryText } from "components/text/SecondaryText";
import { Panel } from "components/Panel";

export interface GridGraphBoxProps {
  span?: number;
  href?: string;
  history: number[];
  showWarning?: boolean;
  onClick?: () => Promise<void>;
  title: string | JSX.Element | JSX.Element[];
}

const rawData = [];

for (let i = 0; i < 10; i++) {
  rawData.push(faker.datatype.number({ min: 0, max: 100 }));
}

const chartData = {
  labels: rawData,
  datasets: [
    {
      data: rawData,
      borderColor: AccentColor,
      backgroundColor: AccentColor,
    },
  ],
};

export const GridGraphBox = ({
  span,
  href,
  title,
  showWarning,
  onClick,
  history,
}: GridGraphBoxProps) => {
  const navHistory = useHistory();

  /**
   * Invoked on container clicked
   *
   * @returns {Promise<void>}
   */
  const handleClick = () => {
    if (href) {
      return navHistory.push(href);
    }

    if (onClick) {
      onClick();
    }
  };

  const renderTitle = () => {
    return (
      <>
        <SecondaryText>{title}</SecondaryText>
        {showWarning && <StyledIcon icon={faExclamationTriangle} />}
      </>
    );
  };

  return (
    <Panel title={renderTitle()} span={span} onClick={handleClick}>
      <Line options={ChartConfig} data={chartData} height="100px" />
    </Panel>
  );
};

const StyledIcon = styled(FontAwesomeIcon)`
  color: var(--accent);
`;
