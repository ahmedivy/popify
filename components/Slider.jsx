"use client";

import * as RadixSlider from "@radix-ui/react-slider";

function Slider({ value, onChange }) {
  const handleChange = (values) => {
    onChange?.(values[0]);
  };
  return (
    <RadixSlider.Root
      className="relative flex items-center select-none touch-none w-full h-10"
      defaultValue={[1]}
      value={value}
      max={1}
      onValueChange={handleChange}
      step={0.1}
      aria-label="Volume"
    >
      <RadixSlider.Track className="relative grow rouded-full h-[3px] bg-neutral-600 rounded-full">
        <RadixSlider.Range className="absolute h-full bg-white rounded-full" />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
}

export default Slider;
