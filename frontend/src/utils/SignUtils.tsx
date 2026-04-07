import { RefObject, useEffect, useState } from 'react';
import FieldDto from '../interfaces/FieldDto';

export function toDictionaryMap(fields: FieldDto[]): Map<string, FieldDto> {
  const map = new Map<string, FieldDto>();
  fields.forEach(field => {
    map.set(field.slug, field);
  });
  return map;
}

export function toArrayMap(fieldMap: Map<string, FieldDto>): FieldDto[] {
  return Array.from(fieldMap.values());
}

export function useInchScale(
  ref: RefObject<HTMLDivElement | null>,
  widthInches: number = 48
) {
  const [inch, setInch] = useState<number>(0);

  useEffect(() => {
    if (!ref.current) return;

    const update = () => {
      if (!ref.current) return;
      const width = ref.current.offsetWidth;
      setInch(width / widthInches);
      console.log(`Width: ${width}px, Inch: ${width / widthInches}px`);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, widthInches]);

  return inch;
}
