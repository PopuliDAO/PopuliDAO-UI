import React, { useState, useEffect } from "react"
import { Button } from "./ui/button"
import Image from "next/image"
import baselogo from "@/public/Images/baselogo.png"
import opLogo from "@/public/Images/op-logo.png"
import { Checkbox } from "./ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "./ui/input"
import { Slider } from "./ui/slider"
import { Textarea } from "./ui/textarea"
import { ArrowLeft } from "lucide-react"
import { ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

export type ConfigureChainProps = {
  setConfigurationPage: React.Dispatch<React.SetStateAction<number>>
  configurationPage: number
}

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "DAO needs to have a name",
  }),
  ens: z.string().min(1, {
    message: "ENS needs to have a name",
  }),
  description: z.string().min(1, {
    message: "Description needs to have a name",
  }),
  tokenname: z.string().min(1, {
    message: "Token needs to have a name",
  }),
  tokensymbol: z.string().min(1, {
    message: "Token needs to have a symbol",
  }),
  supportTreshold: z.number().min(1, {
    message: "Support treshold needs to be set",
  }),
  minimumParticipation: z.number().min(1, {
    message: "Minimum participation needs to be set",
  }),
})

export default function ConfigureChain({
  setConfigurationPage,
  configurationPage,
}: ConfigureChainProps) {
  const [choice, setChoice] = useState<boolean>(false)
  const [testNetChoice, setTestNetChoice] = useState<boolean>(false)
  const [supportTresholdChoice, setSupportTresholdChoice] = useState<number>(50)
  const [minParticipationChoice, setMinParticipationChoice] =
    useState<number>(50)

  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      ens: "",
      description: "",
      tokenname: "",
      tokensymbol: "",
    },
  })

  console.log("configuration is at:", configurationPage)
  return (
    <div className="flex flex-col justify-center items-center rounded-xl ">
      {configurationPage === 25 && (
        <>
          <div className="flex flex-row justify-center gap-10 mt-20">
            <Button variant={"outline"} disabled={true}>
              Mainnet Coming soon
            </Button>
            <Button
              variant={"outline"}
              className={choice ? "border-blue-500 rounded-xl" : "rounded-xl"}
              onClick={() => setChoice(true)}
            >
              Testnet
            </Button>
          </div>
          {choice && (
            <div
              className={`flex justify-center w-[800px] p-4 mt-10 cursor-pointer transition-all ${testNetChoice ? "bg-slate-100" : "hover:bg-slate-100"}`}
              onClick={() => setTestNetChoice(true)}
            >
              <Image src={opLogo} alt="OP Logo" width={40} height={30} />{" "}
              <div className="flex-1 ml-10">
                <h4 className="text-sm">Optimism Sepolia Testnet</h4>
                <p className="text-xs">L2 Blockchain</p>
              </div>
              <Checkbox className="mt-2" checked={testNetChoice && true} />
            </div>
          )}
          <div className="flex justify-between mt-20 w-[800px]">
            <Button className="rounded-xl group" onClick={() => router.push("/")}>
              <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" size={"16px"} /> Back
            </Button>
            <Button className="rounded-xl group" onClick={() => setConfigurationPage(50)}>
              Next <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" size={"16px"} />
            </Button>
          </div>
        </>
      )}
      {configurationPage === 50 && (
        <>
          <Form  {...form}>
            <form className="w-5/12 space-y-2 mt-10">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DAO Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="DAO Name"
                        {...field}
                        onChange={(event) => {
                          field.onChange(event) // update character count
                        }}
                      />
                    </FormControl>
                    <FormDescription>{field.value.length}/32</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>DAO Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-32 resize-none overflow-auto"
                        placeholder="Your DAO Description"
                        {...field}
                        onChange={(event: any) => {
                          field.onChange(event) // update character count
                        }}
                      />
                    </FormControl>
                    <FormDescription>{field.value.length}/128</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div className="flex justify-between mt-20 w-[800px]">
            <Button className="rounded-xl group" onClick={() => setConfigurationPage((prev) => prev - 25)}>
              <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" size={"16px"} /> Back
            </Button>
            <Button className="rounded-xl group" onClick={() => setConfigurationPage(75)}>
              Next <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" size={"16px"} />
            </Button>
          </div>
        </>
      )}
      {configurationPage === 75 && (
        <>
          <div className="mt-10">
            <h3 className="mb-5 text-1xl font-medium">
              Who can participate in Governance?
            </h3>
            <div className="flex justify-center w-[800px] p-4 cursor-pointer transition-all bg-slate-100">
              <div className="flex-1 ml-10">
                <h4 className="text-base mb-2">Token Holders</h4>
                <p className="text-xs">
                  Tokens act as voting chips. The more tokens you hold, the more
                  weight your vote has. 1 token equals 1 vote.
                </p>
              </div>
              <Checkbox className="mt-4" checked={testNetChoice && true} />
            </div>
          </div>

          <Form {...form}>
            <form className="w-5/12 space-y-6 mt-10">
              <FormField
                control={form.control}
                name="tokenname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Token name"
                        {...field}
                        onChange={(event) => {
                          field.onChange(event) // update character count
                        }}
                      />
                    </FormControl>
                    <FormDescription>{field.value.length}/128</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tokensymbol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token symbol</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="abbreviation of the token"
                        {...field}
                        onChange={(event) => {
                          field.onChange(event) // update character count
                        }}
                      />
                    </FormControl>
                    <FormDescription>{field.value.length}/128</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <div className="flex justify-between mt-20 w-[800px]">
            <Button className="rounded-xl group" onClick={() => setConfigurationPage((prev) => prev - 25)}>
              <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" size={"16px"} /> Back
            </Button>
            <Button className="rounded-xl group" onClick={() => setConfigurationPage(100)}>
              Next <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" size={"16px"} />
            </Button>
          </div>
        </>
      )}
      {configurationPage === 100 && (
        <>
          <Form {...form}>
            <form className="w-5/12 space-y-6 mt-10">
              <div className="flex flex-row">
                <FormField
                  control={form.control}
                  name="supportTreshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Support treshold</FormLabel>
                      <FormControl>
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <Input
                            className="text-center"
                            defaultValue={50}
                            {...field}
                            onChange={(event) => {
                              field.onChange(event)
                              setSupportTresholdChoice(
                                Number(event.target.value)
                              ) // update threshold choice
                            }}
                          />
                          <Label
                            style={{
                              position: "absolute",
                              right: "60px",
                              top: "50%",
                              transform: "translateY(-50%)",
                            }}
                          >
                            %
                          </Label>
                        </div>
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Slider
                  value={[supportTresholdChoice]}
                  defaultValue={[50]}
                  className="w-3/5 ml-10 mt-5"
                />
              </div>
              <div className="flex flex-row">
                <FormField
                  control={form.control}
                  name="minimumParticipation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Participation</FormLabel>
                      <FormControl>
                        <div
                          style={{
                            position: "relative",
                            display: "inline-block",
                          }}
                        >
                          <Input
                            className="text-center"
                            defaultValue={50}
                            {...field}
                            onChange={(event) => {
                              field.onChange(event)
                              setMinParticipationChoice(
                                Number(event.target.value)
                              ) // update threshold choice
                            }}
                          />
                          <Label className="absolute right-16 top-1/2 transform -translate-y-1/2">
                            %
                          </Label>
                        </div>
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Slider
                  value={[minParticipationChoice]}
                  defaultValue={[50]}
                  className="w-3/5 ml-2 mt-5"
                />
              </div>
            </form>
          </Form>
          <div className="flex justify-between mt-20 w-[800px]">
            <Button className="rounded-xl group" onClick={() => setConfigurationPage((prev) => prev - 25)}>
              <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-1" size={"16px"} /> Back
            </Button>
            <Button className="rounded-xl group" onClick={() => router.push("/interaction/governance")}>
              Next <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" size={"16px"} />
            </Button>
          </div>
        </>
      )}
      <div className="mt-20"></div>
    </div>
  )
}
