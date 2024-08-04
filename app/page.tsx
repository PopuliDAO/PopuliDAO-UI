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

const Home = () => {
  const [partOfDAO, setPartOfDAO] = useState<boolean>(false)

  const pathname = usePathname()

  return (
    <main>
      <Wrapper>
        {partOfDAO ? (
          <div>DAO Project</div>
        ) : (
          <>
            <div className="flex justify-center">
              {" "}
              <Card className="w-[800px] mt-10">
                <CardHeader>
                  <CardTitle className="flex justify-center">
                    We see you are not yet Part of any DAO yet!
                  </CardTitle>
                  <CardDescription className="flex justify-center">
                    Deploy your new DAO with minimal technical know-how or join
                    one!
                  </CardDescription>
                </CardHeader>
                <CardContent></CardContent>
              </Card>
            </div>
            <div className="flex justify-center mt-32 gap-20">
              <Card className="w-[350px]">
                <CardHeader>
                  <CardTitle className="flex justify-center">
                    Join a DAO
                  </CardTitle>
                  <CardDescription className="flex justify-center">
                    Deploy your new project in one-click.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button className="flex gap-2 group">
                    Join a DAO
                    <ArrowRight className="transition-transform duration-200 group-hover:translate-x-2" />
                  </Button>
                </CardContent>
              </Card>
              <Card className="w-[350px]">
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
                    <Button className="flex gap-2 group">
                      Configure DAO
                      <ArrowRight className="transition-transform duration-200 group-hover:translate-x-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </Wrapper>
    </main>
  )
}

export default Home
