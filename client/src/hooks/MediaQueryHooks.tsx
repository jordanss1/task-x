import { useEffect, useState } from "react";

export function useScreenSize(height?: boolean): number {
  const [size, setSize] = useState<number>(
    height ? window.innerHeight : window.innerWidth
  );

  useEffect(() => {
    window.addEventListener("resize", () =>
      setSize(height ? window.innerHeight : window.innerWidth)
    );
  }, []);

  return size;
}

export function useMediaQuery(query: number, height?: boolean): boolean {
  const size = useScreenSize(height);

  return size <= query;
}
