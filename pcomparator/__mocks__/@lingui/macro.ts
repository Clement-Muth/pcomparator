export const t = (arg1) => {
  if (typeof arg1 === "object") {
    return (literals, ...placeholders) => {
      return literals.reduce((result, literal, i) => {
        return result + literal + (placeholders[i] || "");
      }, "");
    };
  }
  return arg1;
};

export const Trans  = ({ children }: { children: React.ReactNode }) => children;
