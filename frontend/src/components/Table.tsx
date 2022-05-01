import styled from "styled-components";
import React, { useState } from "react";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { FlexGrid } from "./FlexGrid";

export interface TableProps<T> {
  data: T[];
  keys: string[];
  expandRow?: (data: T) => React.ReactElement | React.ReactElement[];
  renderButtons?: (data: T) => React.ReactElement | React.ReactElement[];
}

export function Table<T>({
  data,
  keys,
  expandRow,
  renderButtons,
}: TableProps<T>): JSX.Element {
  const [openRows, setOpenRows] = useState<number[]>([]);

  /**
   * @param {string[]} keys
   * @returns {number}
   */
  const countColumns = (keys: string[]): number => {
    if (expandRow && renderButtons) {
      return keys.length + 2;
    }

    return expandRow || renderButtons ? keys.length + 1 : keys.length;
  };

  /**
   * Wrapper for rendering a single cell
   *
   * @param {React.ReactNode | React.ReactNode[]} children
   * @param {number} index
   * @returns {React.ReactNode}
   */
  const renderCell = (
    children: React.ReactNode | React.ReactNode[],
    index: number
  ) => {
    return <StyledCell isOdd={Boolean(index % 2)}>{children}</StyledCell>;
  };

  /**
   * Renders the button to expand a row
   *
   * @param {T} data
   * @param {number} rowNumber
   * @returns {React.ReactNode}
   */
  const renderExpandRow = (data: T, rowNumber: number) => {
    return (
      <span>
        <StyledIcon
          icon={faCaretDown}
          onClick={() => handleExpandRow(rowNumber)}
        />
      </span>
    );
  };

  /**
   * Invoked when the expand row button is clicked
   *
   * @param rowNumber
   */
  const handleExpandRow = (rowNumber: number) => {
    if (openRows.some((val) => val === rowNumber)) {
      setOpenRows([...openRows].filter((val) => val !== rowNumber));
    } else {
      setOpenRows([...openRows, rowNumber]);
    }
  };

  return (
    <StyledFlexGrid columns={countColumns(keys)}>
      {keys.map((key: string, index: number) => (
        <StyledHeader key={index}>{key}</StyledHeader>
      ))}
      {renderButtons && <StyledHeader></StyledHeader>}
      {expandRow && <StyledHeader></StyledHeader>}
      <>
        {data.length &&
          data.map((row, index) => (
            <>
              {keys.map((element) => (
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                <>{renderCell(<>{row[element.toLowerCase()]}</>, index)}</>
              ))}
              {renderButtons && renderCell(renderButtons(row), index)}
              {expandRow && renderCell(renderExpandRow(row, index), index)}
              {expandRow && openRows.some((val) => val === index) && (
                <StyledExpandedRow
                  isOdd={Boolean(index % 2)}
                  cellCount={countColumns(keys) + 1}
                >
                  {expandRow(row)}
                </StyledExpandedRow>
              )}
            </>
          ))}
      </>
    </StyledFlexGrid>
  );
}

const StyledHeader = styled.h4`
  color: #fff;
  font-size: 18px;
  margin-bottom: 0;
  padding: 0.5rem 0.75rem;
  background-color: var(--bg-secondary);
`;

const StyledFlexGrid = styled(FlexGrid)`
  &:nth-child(1n) > div {
    padding-left: 0.75rem;
  }

  &:nth-child(${(props) => props.columns}n) > div {
    padding-right: 0.75rem;
  }
`;

const StyledCell = styled.div<{ isOdd?: boolean }>`
  padding: 0.25rem 0;
  background-color: ${(props) => (props.isOdd ? "" : "var(--bg-tertiary)")};
`;

const StyledExpandedRow = styled.div<{ cellCount: number; isOdd?: boolean }>`
  grid-column: 1 / ${(props) => props.cellCount};
  background-color: ${(props) => (props.isOdd ? "" : "var(--bg-tertiary)")};
`;

const StyledIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  line-height: 16px;
`;
