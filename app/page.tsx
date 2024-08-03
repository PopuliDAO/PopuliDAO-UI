"use client"

import { Wrapper } from "@/components/Wrapper"
import { useState } from "react"

const Home = () => {
  const [partOfDAO, setPartOfDAO] = useState<boolean>(false)

  return (
    <main>
      <Wrapper>
        {partOfDAO ? (
          <div>DAO Project</div>
        ) : (
          <>
            <div className="flex justify-center">
              {" HELLO"}
            </div>
          </>
        )}
      </Wrapper>
    </main>
  )
}

export default Home
