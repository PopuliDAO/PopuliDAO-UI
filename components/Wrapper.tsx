import { ReactNode } from "react"

const Wrapper = ({ children }: { children: ReactNode }) => (
  <div className=" max-w-7xl max-w- mx-auto px-6">{children}</div>
)

export { Wrapper }
