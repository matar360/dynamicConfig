import { useState, useEffect, useCallback } from "react";
import countries from "./data/countries.json";
import masks from "./data/masks.json";

const useMask = (dialCode: string, setValue: any) => {
  const [mask, setMask] = useState("");

  const changeMask = useCallback(
    (newMask?: string) => {
      setValue("");
      setMask(newMask || "");
    },
    [setValue]
  );

  useEffect(() => {
    const code = countries.find((item) => item.dial_code === dialCode)?.code;
    if (!code) {
      changeMask();
      return;
    }
    let dynamicMask = masks[code as keyof typeof masks];
    if (dynamicMask) {
      dynamicMask = dynamicMask.replace(/9/g, "\\9");
      dynamicMask = dynamicMask.replace(/#/g, "9");
      changeMask(dynamicMask);
    } else {
      changeMask();
    }
  }, [dialCode, mask, setValue, changeMask]);

  return mask;
};

export default useMask;
