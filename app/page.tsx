"use client"

import { Wrapper } from "@/components/Wrapper"
import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { AuroraBackground } from "@/components/aurora-background"

const Home = () => {
  const [partOfDAO, setPartOfDAO] = useState<boolean>(false)

  const pathname = usePathname()

  return (
    <AuroraBackground>
      <Wrapper>
        {partOfDAO ? (
          <div>DAO Project</div>
        ) : (
          <>
            <div className="flex justify-center">
              {" "}
              <Card className="w-[800px] rounded-xl mt-0 bg-transparent border-none">
                <CardHeader>
                  <CardTitle className="flex justify-center text-5xl">
                    PopuliDAO
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center">
                  The DAO platform for the people, by the people.
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col justify-center mt-32">
              <div className="flex flex-col items-center justify-center">
                  Deploy your new DAO with minimal technical know-how or join
                    one!
                </div>
                <div className="flex mt-3 justify-center gap-20">
                  <Card className="w-[350px] bg-transparent rounded-xl">
                <CardHeader>
                  <CardTitle className="flex justify-center">
                    Join a DAO
                  </CardTitle>
                  <CardDescription className="flex justify-center">
                    Deploy your new project in one-click
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button className="flex gap-2 group rounded-xl">
                    Join a DAO
                    <ArrowRight className="transition-transform duration-200 group-hover:translate-x-2" />
                  </Button>
                </CardContent>
              </Card>
              <Card className="w-[350px] bg-transparent rounded-xl">
                <CardHeader>
                  <CardTitle className="flex justify-center">
                    Create your own DAO
                  </CardTitle>
                  <CardDescription className="flex justify-center">
                    Deploy your new project in one-click.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Link href="/daoconfiguration">
                    <Button className="flex gap-2 group rounded-xl">
                      Configure DAO
                      <ArrowRight className="transition-transform duration-200 group-hover:translate-x-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
                </div>
              
            </div>
          </>
        )}
      </Wrapper>
    </AuroraBackground>
  )
}

export default Home
