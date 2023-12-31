"use client";

import { ChatCompletionRequestMessage } from "openai";
import { formSchema } from "./constant";
import { MessageSquare, MusicIcon } from "lucide-react";
import { set, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";

// Componets
import { Heading } from "../../../../components/heading";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Empty from "@/components/empty";
import Loader from "@/components/loader";
import { useProModal } from "@/hooks/use-pro-modal";
import toast from "react-hot-toast";

const MusicPage = () => {
  const [music, setMusic] = useState<string>();
  const router = useRouter();
  const proModal = useProModal()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {
      setMusic("")
      const response = await axios.post("/api/music", values);
      console.log(response.data.audio)
      setMusic(response.data.audio)
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen()
      } else {
        toast.error("Something went wrong!")
      }
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn your prompt into music."
        icon={MusicIcon}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />

      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="
                                w-full
                                rounded-lg
                                border
                                p-4
                                px-3
                                md:px-6
                                focus-within:shadow-sm
                                grid
                                grid-cols-12
                                gap-2
                            "
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="p-0 m-0">
                      <Input
                        className="border-0 outline-none focus-visible:0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Piano solo"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="col-span-12 lg:col-span-2"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>

          <div className="space-y-8 mt-4">
            {isLoading && (
              <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                <Loader />
              </div>
            )}
            {!music && !isLoading && (
              <Empty label="No music started." />
            )}
            <div className="grid gap-2 grid-cols-12 items-center">
              {music && (
                <>
                  <div className="col-span-12 lg:col-span-10">
                    <audio
                      controls
                      controlsList="download"
                      className="w-full mt-8"
                    >
                      <source src={music} />
                    </audio>
                  </div>
                  <div className="col-span-12 lg:col-span-2">
                    <Button className="px-4 py-2 w-full">Download</Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default MusicPage;
