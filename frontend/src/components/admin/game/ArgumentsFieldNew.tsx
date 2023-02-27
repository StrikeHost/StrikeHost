import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { createRef } from "react";
import styled from "styled-components";

export interface ArgumentsFieldNewProps {
  args?: Record<string, string>;
  onArgumentsChange: (args: Record<string, string>) => void;
}

interface ArgumentsFieldState {
  currentField: string; // The name of the current field being edited
  inputIsOpen: boolean; // Whether or not the user is editing a value/key
  currentIsValue: boolean; // Whether the current field is a value or key
  isBlankKeySelected: boolean; // Whether the current field is a blank key
  isBlankValueSelected: boolean; // Whether the current field is a blank value
}

export class ArgumentsFieldNew extends React.Component<
  ArgumentsFieldNewProps,
  ArgumentsFieldState
> {
  currentInputRef: React.RefObject<HTMLParagraphElement>;
  state: ArgumentsFieldState = {
    currentField: "",
    inputIsOpen: false,
    currentIsValue: false,
    isBlankKeySelected: false,
    isBlankValueSelected: false,
  };

  constructor(props: ArgumentsFieldNewProps) {
    super(props);
    this.currentInputRef = createRef<HTMLParagraphElement>();
  }

  componentDidMount() {
    document.addEventListener("click", (event) => this.handleOtherClick(event));
  }

  /**
   * Invoked on any document click - closes the current field if open
   *
   * @param {MouseEvent} event
   */
  handleOtherClick(event: MouseEvent) {
    const element = event.target;

    if (!element) {
      return;
    }

    if (!(element instanceof HTMLElement)) {
      return;
    }

    const isBlank = element.dataset.blank === "true";
    const isValue = element.dataset.value === "true";
    const key = element.dataset.key || "";

    if (this.state.inputIsOpen) {
      const input = this.currentInputRef.current;
      // Do we need to close the input?
      if (input && !input.contains(element)) {
        const inputValue = (input.children[0] as HTMLInputElement).value;

        if (this.state.isBlankKeySelected) {
          this.props.onArgumentsChange({
            ...this.props.args,
            [inputValue]: "",
          });
          this.setState({
            currentField: "",
            inputIsOpen: false,
            currentIsValue: false,
            isBlankKeySelected: false,
            isBlankValueSelected: false,
          });
        }
      }
    }

    console.log(element.parentElement);

    // if (
    //   Object.keys(element.dataset).length === 0 &&
    //   element.parentElement !== null
    // ) {
    //   element = element.parentElement;
    // }

    // Has the user clicked on an editable field - do we need to open the input
    if (element.dataset.editable === "true") {
      const isBlank = element.dataset.blank === "true";
      const isValue = element.dataset.value === "true";
      const key = element.dataset.key || "";

      if (isBlank && !isValue) {
        this.setState({
          currentField: key,
          inputIsOpen: true,
          currentIsValue: false,
          isBlankKeySelected: true,
          isBlankValueSelected: false,
        });
      } else if (isBlank && isValue) {
        this.setState({
          currentField: key,
          inputIsOpen: true,
          currentIsValue: true,
          isBlankKeySelected: false,
          isBlankValueSelected: true,
        });
      } else if (!isBlank && isValue) {
        this.setState({
          currentField: key,
          inputIsOpen: true,
          currentIsValue: true,
          isBlankKeySelected: false,
          isBlankValueSelected: false,
        });
      } else if (!isBlank && !isValue) {
        this.setState({
          currentField: key,
          inputIsOpen: true,
          currentIsValue: false,
          isBlankKeySelected: false,
          isBlankValueSelected: false,
        });
      }
    }
  }

  render() {
    const { args } = this.props;
    const {
      currentField,
      currentIsValue,
      isBlankKeySelected,
      isBlankValueSelected,
    } = this.state;

    return (
      <StyledExternalContainer>
        {/* Keys */}
        <div>
          <StyledTitle>Key</StyledTitle>
          <StyledValuesContainer>
            {args &&
              Object.keys(args).map((key, index) => (
                <StyledValueItem
                  key={index}
                  data-key={key}
                  data-value={false}
                  data-editable={true}
                  needsPadding={!(currentField === key && !currentIsValue)}
                  ref={
                    currentField === key && !currentIsValue
                      ? this.currentInputRef
                      : null
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
              data-editable={true}
              needsPadding={!isBlankKeySelected}
              ref={isBlankKeySelected ? this.currentInputRef : null}
            >
              {isBlankKeySelected ? (
                <StyledValueItemInput type="text" autoFocus />
              ) : (
                <StyledValueItemText />
              )}
            </StyledValueItem>
          </StyledValuesContainer>
        </div>
        {/* Values */}
        <div>
          <StyledTitle>Value</StyledTitle>
          <StyledValuesContainer>
            {args &&
              Object.keys(args).map((key, index) => (
                <StyledValueItem
                  key={index}
                  data-key={key}
                  data-value={true}
                  data-editable={true}
                  needsPadding={!(currentField === key && currentIsValue)}
                  ref={
                    currentField === key && currentIsValue
                      ? this.currentInputRef
                      : null
                  }
                >
                  {currentField === key && currentIsValue ? (
                    <StyledValueItemInput type="text" autoFocus />
                  ) : (
                    <StyledValueItemText>{args[key]}</StyledValueItemText>
                  )}
                </StyledValueItem>
              ))}
            <StyledValueItem
              data-blank={true}
              data-value={true}
              data-editable={true}
              needsPadding={!isBlankValueSelected}
              ref={isBlankValueSelected ? this.currentInputRef : null}
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
  }
}

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
