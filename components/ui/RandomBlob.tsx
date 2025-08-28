import { HTMLAttributes, useMemo } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  centerX?: number;
  centerY?: number;
  radius?: number;
  radiusX?: number;
  radiusY?: number;
  pointCount?: number;
  radiusVariation?: number;
  positionVariation?: number;
}

// no-dd-sa:typescript-code-style/max-params
const generateRandomBlob = (
  centerX: number = 50,
  centerY: number = 50,
  radiusX: number = 30,
  radiusY: number = 30,
  pointCount: number = 12,
  radiusVariation: number = 10,
  positionVariation: number = 5
): string => {
  const points: [number, number][] = [];

  for (let i = 0; i < pointCount; i++) {
    const angle = (i / pointCount) * 2 * Math.PI;
    const randomRadiusX = radiusX + (Math.random() - 0.5) * 2 * radiusVariation;
    const randomRadiusY = radiusY + (Math.random() - 0.5) * 2 * radiusVariation;
    const x =
      centerX +
      Math.cos(angle) * randomRadiusX +
      (Math.random() - 0.5) * 2 * positionVariation;
    const y =
      centerY +
      Math.sin(angle) * randomRadiusY +
      (Math.random() - 0.5) * 2 * positionVariation;
    points.push([x, y]);
  }

  // Ensure the polygon closes by adding the first point at the end
  points.push(points[0]);

  return `polygon(${points.map(([x, y]) => `${x}% ${y}%`).join(', ')})`;
};

export default function RandomBlob(props: Props) {
  const {
    centerX = 50,
    centerY = 50,
    radius,
    radiusX,
    radiusY,
    pointCount = 12,
    radiusVariation = 10,
    positionVariation = 5,
    ...restProps
  } = props;
  const finalRadiusX = radiusX ?? radius ?? 30;
  const finalRadiusY = radiusY ?? radius ?? 30;

  const clipPath = useMemo(() => {
    return generateRandomBlob(
      centerX,
      centerY,
      finalRadiusX,
      finalRadiusY,
      pointCount,
      radiusVariation,
      positionVariation
    );
  }, [
    centerX,
    centerY,
    finalRadiusX,
    finalRadiusY,
    pointCount,
    radiusVariation,
    positionVariation
  ]);

  return (
    <div style={{ clipPath }} suppressHydrationWarning={true} {...restProps} />
  );
}
