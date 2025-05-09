"use client";

import { Slider } from "../ui/slider";
import { useEffect, useState } from "react";

const MIN_PRICE = 100;
const MAX_PRICE = 1000;
const STEP = 10;

type PriceFilterProps = {
  range: [number, number];
  onRangeChange: (newRange: [number, number]) => void;
};

export default function PriceFilter({
  range,
  onRangeChange,
}: PriceFilterProps) {
  const [tempMin, setTempMin] = useState(range[0]);
  const [tempMax, setTempMax] = useState(range[1]);

  // Sync inputs when parent range changes
  useEffect(() => {
    setTempMin(range[0]);
    setTempMax(range[1]);
  }, [range]);

  const handleBlurMin = () => {
    const newMin = Math.min(tempMin, range[1] - 1);
    const validatedMin =
      isNaN(newMin) || newMin < MIN_PRICE ? MIN_PRICE : newMin;
    onRangeChange([validatedMin, range[1]]);
  };

  const handleBlurMax = () => {
    const newMax = Math.max(tempMax, range[0] + 1);
    const validatedMax =
      isNaN(newMax) || newMax > MAX_PRICE ? MAX_PRICE : newMax;
    onRangeChange([range[0], validatedMax]);
  };

  return (
    <div className="space-y-4">
      <Slider
        min={MIN_PRICE}
        max={MAX_PRICE}
        step={STEP}
        value={range}
        onValueChange={(value) => onRangeChange(value as [number, number])}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center border border-border col-span-1 px-2.5 py-2">
          <span className="font-barlow text-xs">$</span>
          <input
            type="number"
            name="min"
            inputMode="numeric"
            max={range[1] - STEP}
            value={tempMin}
            onChange={(e) => setTempMin(Number(e.target.value))}
            onBlur={handleBlurMin}
            onKeyDown={(e) => e.key === "Enter" && handleBlurMin()}
            className="text-sm text-right font-barlow appearance-none border-0 focus:outline-none focus:ring-0 w-full"
            placeholder="Min"
          />
        </div>

        <div className="flex items-center border border-border col-span-1 px-2.5 py-2">
          <span className="font-barlow text-xs">$</span>
          <input
            type="number"
            name="max"
            inputMode="numeric"
            max={MAX_PRICE}
            value={tempMax}
            onChange={(e) => setTempMax(Number(e.target.value))}
            onBlur={handleBlurMax}
            onKeyDown={(e) => e.key === "Enter" && handleBlurMax()}
            className="text-sm text-right font-barlow appearance-none border-0 focus:outline-none focus:ring-0 w-full"
            placeholder="Max"
          />
        </div>
      </div>
    </div>
  );
}
