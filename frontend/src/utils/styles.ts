import { createGlobalStyle } from "styled-components";

export const Styles = createGlobalStyle`
  :root {
    --primary: #0066b2;
    --danger: #f44336;
    --warning: #ff9800;
    --success: green;

    --bg-dark: #121212;
    --bg-dark-2: #181818;
    --bg-dark-3: #404040;
    --bg-dark-4: #282828;
    --bg-light: rgb(33, 37, 41);
    // --bg-primary: var(--bg-dark);
    // --bg-secondary: var(--bg-dark-2);
    // --bg-secondary-alt: var(--bg-dark-4);
    // --bg-tertiary: var(--bg-dark-3);

    --text-dark: #fff;
    --text-dark-2: #b3b3b3;
    --text-light: #000;
    // --text-primary: var(--text-dark);
    --text-secondary: var(--text-dark-2);

    --accent: #e1aa17;
    --text-primary: #c8c8c8;
    --bg-primary: #0f181c;
    --bg-secondary: #142126;
    --bg-tertiary: #1e3037;
  }

  body {
    color: var(--text-primary);
    background-color: var(--bg-primary);
  }

  a, a:hover, a:focus {
    text-decoration: none;
    color: var(--text-primary);
  }
`;

export const AccentColor = "#e1aa17";
