import React from "react";

import AddItemsForm from "./components/AddItemsForm.tsx";
import StoredItems from "./components/StoredItems.tsx";
import { KnittingItemsProvider } from "./useKnittingItemsContext.tsx";

const App = () => {
  return (
    <KnittingItemsProvider>
      <AddItemsForm />
      <StoredItems />
    </KnittingItemsProvider>
  );
};

export default App;
