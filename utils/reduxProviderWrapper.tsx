// components/ReduxProviderWrapper.tsx

"use client"; // Ensure this component is treated as a Client Component

import { Provider } from "react-redux";
import { store } from "./store";

export default function ReduxProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}
