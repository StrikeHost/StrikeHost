import styled from "styled-components";

export interface UsageCircleProps {
  text?: string;
  upper: number;
  title?: string;
  danger?: number;
  current: number;
  warning?: number;
}

export const UsageCircle = ({
  text,
  upper,
  title,
  current,
  danger = 90,
  warning = 70,
}: UsageCircleProps) => {
  /** Calculate offset needed to render  */
  const offset = Math.max(((upper - current) / upper) * 329, 0);
  /** Calculate the percentage usage */
  const percentage = Math.round((current / upper) * 100);
  /** Figure out the background colour to use */
  const bgColor =
    percentage > danger
      ? "var(--danger)"
      : percentage > warning // eslint-disable-next-line indent
      ? "var(--warning)" // eslint-disable-next-line indent
      : "var(--success)";

  return (
    <StyledExternalContainer>
      <StyledBackgroundCircle offset={offset}>
        <svg width="120" height="120" xmlns="http://www.w3.org/2000/svg">
          <g>
            <circle
              r="52.35"
              cy="61"
              cx="61"
              strokeWidth="8"
              stroke={bgColor}
              fill="none"
            />
          </g>
        </svg>
        <div>
          <h3>{percentage}%</h3>
        </div>
      </StyledBackgroundCircle>
      <div>
        {title && <StyledUsageTitle>{title}</StyledUsageTitle>}
        {text && <StyledUsageText>{text}</StyledUsageText>}
      </div>
    </StyledExternalContainer>
  );
};

const StyledExternalContainer = styled.div`
  gap: 1rem;
  display: flex;
  margin: 0 2rem;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
`;

const StyledBackgroundCircle = styled.div<{ offset: number }>`
  float: left;
  width: 120px;
  height: 120px;
  position: relative;

  svg {
    transform: rotate(-90deg);
  }

  div {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    position: absolute;
    align-items: center;
    justify-content: center;
  }

  stroke-dasharray: 329;
  stroke-dashoffset: ${(props) => props.offset};
`;

const StyledUsageTitle = styled.h5`
  text-align: center;
`;

const StyledUsageText = styled.p`
  font-size: 18px;
  text-align: center;
`;
