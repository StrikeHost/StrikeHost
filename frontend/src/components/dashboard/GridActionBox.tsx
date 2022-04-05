import { PrimaryText } from "components/text/PrimaryText";
import { SecondaryText } from "components/text/SecondaryText";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import faker from "@faker-js/faker";
import { AccentColor } from "utils/styles";
import { ChartConfig } from "constants/ChartConfig";
import { useHistory } from "react-router";

export interface GridActionBoxProps {
  span?: number;
  href?: string;
  subText?: string;
  history?: number[];
  actionText?: string;
  value: number | string;
  onClick?: () => Promise<void>;
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

export const GridActionBox = ({
  span,
  href,
  value,
  history,
  onClick,
  subText,
  actionText,
}: GridActionBoxProps) => {
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

  return (
    <StyledContainer
      onClick={handleClick}
      span={span}
      clickable={Boolean(href || onClick)}
    >
      <div>
        {actionText && <SecondaryText>{actionText}</SecondaryText>}
        <PrimaryText>{value}</PrimaryText>
        {subText && <SecondaryText>{subText}</SecondaryText>}
      </div>
      {history && (
        <StyledChartOuterContainer>
          <StyledChartContainer>
            <Line options={ChartConfig} data={chartData} />
          </StyledChartContainer>
        </StyledChartOuterContainer>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div<{
  history?: number[];
  span?: number;
  clickable: boolean;
}>`
  padding: 1rem;
  display: grid;
  background-color: var(--bg-secondary);
  grid-template-columns: repeat(2, 1fr);
  cursor: ${(props) => (props.clickable ? "pointer" : "")};
  grid-column: ${(props) => (props.span ? `span ${props.span}` : "")};
`;

const StyledChartOuterContainer = styled.div`
  height: 100%;
  overflow: hidden;
  position: relative;
`;

const StyledChartContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
`;
