export default function ParallaxScenes({
  fillTop = '#dcdcdc',
  fillBottom = '#dcdcdc',
  fillLeft = '#f0f0f0',
  fillRight = '#e0e0e0',
  fillLast = '#dcdcdc',
  textColor = '#000',
  fontSize = 0.1,
  imageA = '/imageA.jpg',
  imageB = '/library.png',
}) {
  const totalWeight = 12;
  const unitHeight = 100 / totalWeight;
  const rowWeights = [3, 1, 1, 1, 3, 3];

  const quarterWidth = 100 / 4;
  const halfWidth = 100 / 2;

  // Posisi vertikal dari R1-Q2 ke R5-Q2
  const yEnd = rowWeights
    .slice(0, 5)
    .reduce((sum, w) => sum + w * unitHeight, 0);
  const xStart = quarterWidth;
  const xEnd = xStart + quarterWidth;

  let yOffset = 0;

  return (
    <svg
      width='100vw'
      height='100vh'
      viewBox='0 0 100 100'
      preserveAspectRatio='none'>
      {/* Background Images */}
      <image
        href={imageA}
        x={xStart}
        y={0}
        width={xEnd - xStart}
        height={yEnd}
        preserveAspectRatio='xMidYMid slice'
      />
      <image
        href={imageB}
        x={xStart}
        y={0}
        width={xEnd - xStart}
        height={yEnd}
        preserveAspectRatio='xMidYMid slice'
      />

      {/* Grid Blocks */}
      {rowWeights.map((weight, i) => {
        const rowHeight = unitHeight * weight;
        const y = yOffset;
        yOffset += rowHeight;

        if (i === 0 || i === 4) {
          return (
            <g key={`row-${i}`}>
              {[...Array(4)].map((_, j) => {
                const x = j * quarterWidth;
                return (
                  <g key={`row-${i}-q${j}`}>
                    <rect
                      x={x}
                      y={y}
                      width={quarterWidth}
                      height={rowHeight}
                      fill={fillTop}
                    />
                    <text
                      x={x + quarterWidth / 2}
                      y={y + rowHeight / 2}
                      fontSize={`${fontSize}vw`}
                      fill={textColor}
                      textAnchor='middle'
                      dominantBaseline='middle'>
                      {`R${i + 1}-Q${j + 1}`}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        }

        if (i >= 1 && i <= 3) {
          return (
            <g key={`row-${i}`}>
              <rect
                x={0}
                y={y}
                width={halfWidth}
                height={rowHeight}
                fill={fillLeft}
              />
              <text
                x={halfWidth / 2}
                y={y + rowHeight / 2}
                fontSize={`${fontSize}vw`}
                fill={textColor}
                textAnchor='middle'
                dominantBaseline='middle'>
                {`R${i + 1}-L`}
              </text>

              <rect
                x={halfWidth}
                y={y}
                width={halfWidth}
                height={rowHeight}
                fill={fillRight}
              />
              <text
                x={halfWidth + halfWidth / 2}
                y={y + rowHeight / 2}
                fontSize={`${fontSize}vw`}
                fill={textColor}
                textAnchor='middle'
                dominantBaseline='middle'>
                {`R${i + 1}-R`}
              </text>
            </g>
          );
        }

        return (
          <g key={`row-${i}`}>
            <rect
              x={0}
              y={y}
              width={100}
              height={rowHeight}
              fill={fillLast}
            />
            <text
              x={50}
              y={y + rowHeight / 2}
              fontSize={`${fontSize}vw`}
              fill={textColor}
              textAnchor='middle'
              dominantBaseline='middle'>
              R6
            </text>
          </g>
        );
      })}
    </svg>
  );
}
