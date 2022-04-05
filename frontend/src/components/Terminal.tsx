import React, { forwardRef, useImperativeHandle } from "react";
import styled from "styled-components";

export interface TerminalProps {
  onTextEntered: (text: string) => void;
}

export const Terminal = forwardRef(({ onTextEntered }: TerminalProps, ref) => {
  const [currentLine, setCurrentLine] = React.useState("");
  const [consoleText, setConsoleText] = React.useState<string[]>(
    Array(20).fill("")
  );

  useImperativeHandle(ref, () => ({
    addText: (text: string) => handleAddText(text),
  }));

  /**
   * Adds a new line to the console
   *
   * @param {string} text
   */
  const handleAddText = (text: string) => {
    // split text into strings of length 100
    const wrappedText = text.match(/.{1,100}/g);

    // set console text to additional text
    const newConsoleText = [
      ...consoleText,
      ...(wrappedText?.map((line) => line) ?? []),
    ];
    setConsoleText(newConsoleText.slice(newConsoleText.length - 20));
    setCurrentLine("");

    // call onTextEntered callback
    onTextEntered(text);
  };

  /**
   * Handles keypresses
   *
   * @param {React.KeyboardEvent<HTMLInputElement>} event
   */
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleAddText(currentLine);
    }
  };

  return (
    <StyledExternalContainer>
      <StyledTerminal>
        {consoleText.map((text, index) => (
          <StyledConsoleLine key={index}>{text}</StyledConsoleLine>
        ))}
      </StyledTerminal>
      <StyledInputBar
        value={currentLine}
        onKeyPress={handleKeyPress}
        onChange={(event) => setCurrentLine(event.currentTarget.value)}
      />
    </StyledExternalContainer>
  );
});

const StyledExternalContainer = styled.div``;

const StyledTerminal = styled.div`
  color: white;
  background-color: #000;
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
`;

const StyledConsoleLine = styled.div`
  min-height: 1.5em;
`;

const StyledInputBar = styled.input`
  width: 100%;
  height: 30px;
  border: none;
  color: white;
  background-color: #000;
  border-top: 2px solid #fff;
  font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
`;
