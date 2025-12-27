import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@/providers/ThemeProvider";

interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  theme?: "light" | "dark";
}

function AllProviders({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

function customRender(ui: ReactElement, options?: CustomRenderOptions) {
  return render(ui, { wrapper: AllProviders, ...options });
}

// Re-export everything
export * from "@testing-library/react";
export { customRender as render };
export { default as userEvent } from "@testing-library/user-event";
