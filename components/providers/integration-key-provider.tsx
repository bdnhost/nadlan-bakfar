"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { getIntegrationKey, setIntegrationKey as setConfigIntegrationKey } from "@/lib/config"

interface IntegrationKeyContextProps {
  integrationKey: string
  setIntegrationKey: (key: string) => void
}

const IntegrationKeyContext = createContext<IntegrationKeyContextProps | undefined>(undefined)

export function IntegrationKeyProvider({ children }: { children: ReactNode }) {
  const [integrationKey, setIntegrationKeyState] = useState<string>(getIntegrationKey())

  const setIntegrationKey = (key: string) => {
    setIntegrationKeyState(key)
    setConfigIntegrationKey(key) // Update the config as well
  }

  return (
    <IntegrationKeyContext.Provider value={{ integrationKey, setIntegrationKey }}>
      {children}
    </IntegrationKeyContext.Provider>
  )
}

export function useIntegrationKey(): IntegrationKeyContextProps {
  const context = useContext(IntegrationKeyContext)
  if (!context) {
    throw new Error("useIntegrationKey must be used within a IntegrationKeyProvider")
  }
  return context
}

