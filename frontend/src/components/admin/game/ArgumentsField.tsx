import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

export interface ArgumentsFieldProps {
  args?: Record<string, string>;
  onArgumentsChange: (args: Record<string, string>) => void;
}

export const ArgumentsField = ({
  args,
  onArgumentsChange,
}: ArgumentsFieldProps) => {
  console.log(args);
  const currentInput = useRef<HTMLInputElement>(null);
  const [currentField, setCurrentField] = useState<string>("null");
  const [currentIsValue, setCurrentIsValue] = useState<boolean>(false);
  const [isBlankKeySelected, setIsBlankKeySelected] = useState<boolean>(false);
  const [isBlankValueSelected, setIsBlankValueSelected] =
    useState<boolean>(false);

  const getInputFromRef = () => {
    return currentInput.current?.children[0];
  };

  /**
   * Invoked on element value field clicked
   *
   * @param {React.MouseEvent<HTMLParagraphElement, MouseEvent>} event
   */
  const handleValueClick = (
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    isBlankKey = false,
    isBlankValue = false
  ) => {
    console.log("is blank:", isBlankKey, isBlankValue);
    setIsBlankKeySelected(isBlankKey);
    setIsBlankValueSelected(isBlankValue);

    const element = event.currentTarget;
    const isBlank = element.dataset.blank === "true";
    const isValue = element.dataset.value === "true";
    const key = element.dataset.key || "";

    if (isBlank && !isValue) {
      setIsBlankKeySelected(true);
    } else if (isBlank && isValue) {
      setIsBlankValueSelected(true);
    }

    setCurrentField(key);
    setCurrentIsValue(isValue);
  };

  /**
   * Invoked on any document click
   */
  const handleOtherClick = (event: MouseEvent) => {
    const element = event.target;

    if (!element) {
      console.log("returned here");
      return;
    }

    if (!(element instanceof HTMLElement)) {
      console.log("returned here1");
      handleFieldChange();
      return;
    }

    if (currentInput.current?.contains(element)) {
      console.log("returned here2");
      return;
    }

    if (!element.dataset.key || !element.dataset.value) {
      console.log("returned here3");
      handleFieldChange();
    }
  };

  /**
   * Invoked when the user clicks out of a field
   */
  const handleFieldChange = () => {
    const clearValues = () => {
      setIsBlankKeySelected(false);
      setIsBlankValueSelected(false);
      setCurrentField("");
      setCurrentIsValue(false);
    };

    console.log("---");
    console.log(currentIsValue);
    console.log(isBlankKeySelected);
    console.log(isBlankValueSelected);
    console.log("---");

    // We need to change the value that's stored in the props

    const currentElement = currentInput.current;
    const currentElementInput: HTMLInputElement =
      getInputFromRef() as HTMLInputElement;

    const isBlank = currentElement?.dataset.blank === "true";
    const isValue = currentElement?.dataset.value === "true";
    const key = currentElement?.dataset.key || "";
    console.log(args);

    const newArgs = {
      ...args,
    };

    if (isBlankKeySelected && isBlank && !isValue && currentElementInput) {
      newArgs[currentElementInput.value] = "";
      clearValues();
      onArgumentsChange(newArgs);
    }
  };

  useEffect(() => {
    console.log("mounted");

    document.addEventListener(
      "click",
      (event) => handleOtherClick(event),
      true
    );
  }, []);

  return (
    <StyledExternalContainer>
      <div>
        <StyledTitle>Key</StyledTitle>
        <StyledValuesContainer>
          {args &&
            Object.keys(args).map((key, index) => (
              <StyledValueItem
                key={index}
                data-key={key}
                data-value={false}
                onClick={handleValueClick}
                needsPadding={!(currentField === key && !currentIsValue)}
                ref={
                  currentField === key && !currentIsValue ? currentInput : null
                }
              >
                {currentField === key && !currentIsValue ? (
                  <StyledValueItemInput type="text" autoFocus />
                ) : (
                  <StyledValueItemText>{key}</StyledValueItemText>
                )}
              </StyledValueItem>
            ))}
          <StyledValueItem
            data-blank={true}
            data-value={false}
            onClick={(event) => handleValueClick(event, true)}
            needsPadding={!isBlankKeySelected}
            ref={isBlankKeySelected ? currentInput : null}
          >
            {isBlankKeySelected ? (
              <StyledValueItemInput type="text" autoFocus />
            ) : (
              <StyledValueItemText />
            )}
          </StyledValueItem>
        </StyledValuesContainer>
      </div>
      <div>
        <StyledTitle>Value</StyledTitle>
        <StyledValuesContainer>
          {args &&
            Object.keys(args).map((key, index) => (
              <StyledValueItem
                key={index}
                data-key={key}
                data-value={true}
                onClick={(event) => handleValueClick(event)}
                needsPadding={!(currentField === key && currentIsValue)}
                ref={
                  currentField === key && currentIsValue ? currentInput : null
                }
              >
                {currentField === key && currentIsValue ? (
                  <StyledValueItemInput type="text" autoFocus />
                ) : (
                  <StyledValueItemText>{args[key]}</StyledValueItemText>
                )}
                <StyledValueItemIcon icon={faCircleMinus} />
              </StyledValueItem>
            ))}
          <StyledValueItem
            data-blank={true}
            data-value={true}
            onClick={handleValueClick}
            needsPadding={!isBlankValueSelected}
            ref={isBlankValueSelected ? currentInput : null}
          >
            {isBlankValueSelected ? (
              <StyledValueItemInput type="text" autoFocus />
            ) : (
              <StyledValueItemText />
            )}
          </StyledValueItem>
        </StyledValuesContainer>
      </div>
    </StyledExternalContainer>
  );
};

const StyledExternalContainer = styled.div`
  display: flex;
  grid-column: 1 / -1;

  & > div {
    flex-basis: 50%;
  }
`;

const StyledTitle = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 0.2rem;
`;

const StyledValuesContainer = styled.div`
  background-color: var(--bg-secondary);

  &:first-child {
    border-radius-top-left: 5px;
    border-radius-bottom-left: 5px;
  }

  &:last-child {
    border-radius-top-right: 5px;
    border-radius-bottom-right: 5px;
    border-left: 1px solid var(--bg-tertiary);
  }
`;

const StyledValueItem = styled.p<{ needsPadding?: boolean }>`
  margin: 0;
  cursor: text;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--bg-tertiary);

  &:hover {
    background-color: var(--bg-tertiary);
  }

  & > *:first-child {
    flex: 1;
  }

  &:last-child {
    border-bottom: none;
  }

  padding: ${(props) => (props.needsPadding ? "0.8rem" : "0")};
`;

const StyledValueItemText = styled.p`
  margin: 0;
  height: 24px;
`;

const StyledValueItemIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  color: var(--danger);
`;

const StyledValueItemInput = styled.input`
  color: #fff;
  border: none;
  padding: 0.8rem;
  background-color: var(--bg-tertiary);

  &:focus {
    outline: none;
  }
`;
