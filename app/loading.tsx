import { Wrapper } from '@/components/Wrapper'
import React from 'react'

const loading = () => {
  return (
    <Wrapper>
      <div className="flex flex-col gap-3 justify-center items-center h-[100vh]">
        <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-gray-900"></div>
        <div className="text-2xl mt-4">Loading...</div>
      </div>
    </Wrapper>
  )
}

export default loading