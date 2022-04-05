import styled from "styled-components";
import React, { useEffect, useState } from "react";

import { api } from "utils/api";
import { ContextMenu } from "./ContextMenu";

interface PaginatedResponse<T> {
  results: T[];
  count: number;
}

export interface TableProps<T> {
  cols: number;
  columns: string[];
  sourceUrl: string;
  defaultAmt?: number;
  filterable?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderRow: (row: T, Cell: (props: any) => JSX.Element) => JSX.Element;
}

export function TableMk2<T>({
  cols,
  columns,
  renderRow,
  sourceUrl,
  filterable,
  defaultAmt = 20,
}: TableProps<T>): JSX.Element {
  const [page] = useState<number>(0);
  const [, setCount] = useState<number>(0);
  const [contextX, setContextX] = useState<number>(0);
  const [contextY, setContextY] = useState<number>(0);
  const [openFilter, setOpenFilter] = useState<string>("");
  const [rendered, setRendered] = useState<React.ReactNode[]>();
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [isContextOpen, setIsContextOpen] = useState<boolean>(false);

  /**
   * Attempts to fetch the current page's data
   */
  const fetchData = () => {
    api
      .get<PaginatedResponse<T>>(`${sourceUrl}?skip=${page * defaultAmt}`)
      .then((response) => {
        setCount(response.data.count);
        setRendered(
          response.data.results.map((row) => renderRow(row, StyledTableCell))
        );
      });
  };

  /**
   * Should the column be displayed as filterable?
   *
   * @param {string} column
   * @returns {boolean}
   */
  const isFilterable = (column: string): boolean => {
    return !!filterable?.some((val) => val === column);
  };

  /**
   * Invoked on column filter press
   *
   * @param {string} column
   */
  const handleFilterOpen = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    column: string
  ) => {
    setContextX(event.pageX);
    setContextY(event.pageY);
    setOpenFilter(column);
    setIsContextOpen(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <StyledTable cols={cols}>
        {columns.map((col) => (
          <StyledTableHeader>
            {col}{" "}
            {isFilterable(col) && (
              <StyledFilterText
                onClick={(event) => handleFilterOpen(event, col)}
              >
                Filter
              </StyledFilterText>
            )}
          </StyledTableHeader>
        ))}
        {rendered}
      </StyledTable>
      <ContextMenu
        x={contextX}
        y={contextY}
        isOpen={isContextOpen}
        onClose={() => setIsContextOpen(false)}
      >
        <StyledContextContainer>
          <p>Test</p>
        </StyledContextContainer>
      </ContextMenu>
    </>
  );
}

const StyledTable = styled.div<{ cols: number }>`
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(${(props) => props.cols}, 1fr);
`;

const StyledTableHeader = styled.div`
  padding: 0.5rem 1rem;
  background-color: var(--bg-secondary);
`;

const StyledTableCell = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
`;

const StyledFilterText = styled.div`
  cursor: pointer;
  color: var(--accent);
`;

const StyledContextContainer = styled.div`
  box-shadow: 5px 10px 8px #888888;
  background-color: var(--bg-primary);
`;
