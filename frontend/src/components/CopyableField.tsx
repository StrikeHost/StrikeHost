import { useState } from "react";
import styled from "styled-components";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface CopyableFieldProps {
  value: string;
  obfuscate?: boolean;
}

export const CopyableField = ({ value, obfuscate }: CopyableFieldProps) => {
  const [isCopying, setIsCopying] = useState<boolean>(false);

  /**
   * Invoked on copy button click
   */
  const handleClick = () => {
    navigator.clipboard.writeText(value);
    setIsCopying(true);

    setTimeout(() => {
      setIsCopying(false);
    }, 1000);
  };

  return (
    <StyledFieldContainer>
      {obfuscate ? <p>********</p> : <p>{value}</p>}
      <StyledIcon icon={isCopying ? faCheck : faCopy} onClick={handleClick} />
    </StyledFieldContainer>
  );
};

const StyledFieldContainer = styled.span`
  gap: 1rem;
  display: flex;
  padding: 0.5rem;
  width: fit-content;
  border-radius: 5px;
  align-items: center;
  background-color: var(--bg-tertiary);

  & > p {
    margin: 0;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  width: 15px;
  max-width: 15px;
  cursor: pointer;
  color: var(--accent);
`;
