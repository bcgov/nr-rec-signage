export interface PlotHoleProps {
    showPilotHoles: string | undefined;
    inch: number;
    width: number;
    containerWidth?: number;
    color?: string;
}
export const PlotHoleCorners = ({ showPilotHoles, inch, width, containerWidth, color = '#000' }: PlotHoleProps) => {
  if(!showPilotHoles || showPilotHoles === 'No') return '';
  return (
    <div className="plot-hole" style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 2,
    }}>
        <div style={{
            position: 'absolute',
            top: `${inch * ((containerWidth || 16) * 0.025)}px`,
            left: `${inch * ((containerWidth || 16) * 0.025)}px`,
            width: `${inch * width}px`,
            height: `${inch * width}px`,
            borderRadius: '50%',
            backgroundColor: color}}
            ></div>
        <div style={{
            position: 'absolute',
            top: `${inch * ((containerWidth || 16) * 0.025)}px`,
            right: `${inch * ((containerWidth || 16) * 0.025)}px`,
            width: `${inch * width}px`,
            height: `${inch * width}px`,
            borderRadius: '50%',
            backgroundColor: color}}
            ></div>
        <div style={{
            position: 'absolute',
            bottom: `${inch * ((containerWidth || 16) * 0.025)}px`,
            left: `${inch * ((containerWidth || 16) * 0.025)}px`,
            width: `${inch * width}px`,
            height: `${inch * width}px`,
            borderRadius: '50%',
            backgroundColor: color,
            }}
            ></div>
        <div style={{
            position: 'absolute',
            bottom: `${inch * ((containerWidth || 16) * 0.025)}px`,
            right: `${inch * ((containerWidth || 16) * 0.025)}px`,
            width: `${inch * width}px`,
            height: `${inch * width}px`,
            borderRadius: '50%',
            backgroundColor: color,
            }}
            ></div>
    </div>
  );
};
export const PlotHoleVertical = ({ showPilotHoles, inch, width, containerWidth, color = '#000' }: PlotHoleProps) => {
  if(!showPilotHoles || showPilotHoles === 'No') return '';
  return (
    <div className="plot-hole" style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 2,
    }}>
        <div style={{
            position: 'absolute',
            top: `${inch * ((containerWidth || 16) * 0.025)}px`,
            width: `${inch * width}px`,
            height: `${inch * width}px`,
            borderRadius: '50%',
            left: '50%',
            backgroundColor: color,
            transform: 'translateX(-50%)'}}
            ></div>
        <div style={{
            position: 'absolute',
            bottom: `${inch * ((containerWidth || 16) * 0.025)}px`,
            width: `${inch * width}px`,
            height: `${inch * width}px`,
            borderRadius: '50%',
            left: '50%',
            backgroundColor: color,
            transform: 'translateX(-50%)'}}
            ></div>
    </div>
  );
};
