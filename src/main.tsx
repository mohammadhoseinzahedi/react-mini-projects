import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ContactContextProvider } from "@/projects/contacts/context/contact-context";
import "@/index.css";
import HomePage from "@/pages/home.page";
import ContactsPage from "@/pages/contacts.page";
import EditContactPage from "@/pages/edit-contact.page";
import ContactPage from "@/pages/contact.page";
import MemoryMatchGamePage from "@/pages/memory-match-game.page";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ContactContextProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="contacts">
            <Route index element={<ContactsPage />} />
            <Route path=":uuid" element={<ContactPage />} />
            <Route path=":uuid/edit" element={<EditContactPage />} />
          </Route>
          <Route path="/memory-match-game" element={<MemoryMatchGamePage />} />
        </Routes>
      </BrowserRouter>
    </ContactContextProvider>
  </StrictMode>,
);
