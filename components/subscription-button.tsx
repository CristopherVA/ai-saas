"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Zap } from "lucide-react";
import toast from "react-hot-toast";

interface SubscriptionButtonProps {
  isPro: boolean;
}

export const SubscriptionButton = ({ isPro }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      console.error("[BILLING ERROR]", error);
      toast.error("Something went wrong!")
      setLoading(false);
    }
  };

  return (
    <Button onClick={onClick} disabled={loading} variant={isPro ? "default" : "premiun"}>
      {isPro ? "Manage Subscription" : "Update"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};
