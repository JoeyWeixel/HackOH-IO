import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {AuthenticationResult, EventMessage, EventType, PublicClientApplication} from "@azure/msal-browser";
import {msalConfig} from "../authConfig.ts";
import {AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate} from "@azure/msal-react";
import {RouterProvider} from "react-router-dom";
import AuthenticatedRouter from "@/components/routing/AuthenticatedRouter.tsx";
import UnauthenticatedRouter from "@/components/routing/UnauthenticatedRouter.tsx";

const msalInstance = new PublicClientApplication(msalConfig);

//get initialize msalInstance
msalInstance.initialize().then();

const activeAccount = msalInstance.getActiveAccount();

if (!activeAccount) {
  // Account selection
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }
}

//set the account
msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    const authenticationResult = event.payload as AuthenticationResult;
    const account = authenticationResult.account;
    msalInstance.setActiveAccount(account);
  }
});

//enable account storage event
msalInstance.enableAccountStorageEvents();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
        <AuthenticatedTemplate>
          <RouterProvider router={AuthenticatedRouter} />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
            <RouterProvider router={UnauthenticatedRouter} />
        </UnauthenticatedTemplate>
    </MsalProvider>
  </StrictMode>,
)
