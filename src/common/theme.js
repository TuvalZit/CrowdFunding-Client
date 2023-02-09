export const theme = {
  breakpoints: ["40em", "52em", "64em"],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: "Raleway ,sans-serif",
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    thin: 100,
    extraLight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
    black: 900,
    ultraBlack: 950,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#07c",
    secondary: "#30c",
    muted: "#f6f6f6",
    login: "#333086",
  },
  text: {
    heading: {
      fontFamily: "heading",
      lineHeight: "heading",
      fontWeight: "heading",
    },
  },
  forms: {
    input: {
      inputForm: {
        padding: "15px",
        outline: "none",
        border: "solid 1px",
        borderColor: "#3a3a43",
        bg: "transparent",
        fontFamily: "sans-serif",
        color: "white",
        fontSize: "14px",
        "::placeholder": { color: "#4b5264" },
        borderRadius: "10px",
      },
    },
    label: {
      inputLabel: {
        fontFamily: "sans-serif",
        fontWeight: "medium",
        fontSize: "14px",
        lineHeight: "22px",
        color: "#808191",
        mb: "10px",
      },
    },
    textarea: {
      story: {
        py: "15px",
        resize: "none",
        px: "15px",
        outline: "none",
        border: "solid 1px",
        borderColor: "#3a3a43",
        bg: "transparent",
        fontFamily: "sans-serif",
        color: "white",
        fontSize: "14px",
        "::placeholder": { color: "#4b5264" },
        borderRadius: "10px",
      },
    },
  },
};
export default theme;
