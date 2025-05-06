"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function TopProgressBar({ trigger }: { trigger: boolean }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      setVisible(true);
      setProgress(0);
      // Animate to 100 over ~200ms
      const timeout1 = setTimeout(() => setProgress(100), 100);
      const timeout2 = setTimeout(() => setVisible(false), 350); // Hide after complete

      return () => {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
      };
    }
  }, [trigger]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 w-full z-[9999]">
      <Progress value={progress} className="h-[3px]" />
    </div>
  );
}
