export interface PlotHoleProps {
    showPilotHoles?: string | undefined;
    inch: number;
    width: number;
    containerWidth?: number;
    color?: string;
}
export interface DoublePlotHoleProps {
    distance: number;
    offset?: number;
    inch: number;
    width: number;
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
export const PlotHoleVertical = ({ inch, width, containerWidth, color = '#000' }: PlotHoleProps) => {
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

export const PlotHoleCenter = ({ inch, width, color = '#000' }: PlotHoleProps) => {
  return (
    <div className="plot-hole" style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 2,
    }}>
        <div style={{
            position: 'absolute',
            top: `50%`,
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

export const PlotHoleOffset = ({ inch, width, containerWidth, color = '#000' }: PlotHoleProps) => {
  return (
    <div className="plot-hole" style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 2,
    }}>
        <div style={{
            position: 'absolute',
            top: `${inch * ((containerWidth || 16) * 0.025)}px`,
            width: `${inch * width}px`,
            height: `${inch * width}px`,
            borderRadius: '50%',
            left: '45%',
            backgroundColor: color,
            transform: 'translateX(-50%)'}}
            ></div>
        <div style={{
            position: 'absolute',
            bottom: `${inch * ((containerWidth || 16) * 0.025)}px`,
            width: `${inch * width}px`,
            height: `${inch * width}px`,
            borderRadius: '50%',
            right: '45%',
            backgroundColor: color,
            transform: 'translateX(50%)'}}
            ></div>
    </div>
  );
};

export const DoublePlotHoleCenter = ({ inch, distance, width, color = '#000' }: DoublePlotHoleProps) => {
  return (
    <div className="plot-hole" style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 2,
    }}>
        <div style={{
            position: 'absolute',
            top: `50%`,
            width: `${inch * width}px`,
            height: `${inch * width}px`,
            borderRadius: '50%',
            left: `${inch * distance}px`,
            backgroundColor: color,
            transform: 'translateX(-50%)'}}
            ></div>
        <div style={{
            position: 'absolute',
            top: `50%`,
            width: `${inch * width}px`,
            height: `${inch * width}px`,
            borderRadius: '50%',
            right: `${inch * distance}px`,
            backgroundColor: color,
            transform: 'translateX(50%)'}}
            ></div>
    </div>
  );
};


export const DoublePlotHoleTopBottom = ({ inch, distance, width, color = '#000' }: DoublePlotHoleProps) => {
  return (
    <div className="plot-hole" style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 2,
    }}>
        <div style={{
            position: 'absolute',
            top: `${inch * 0.25}px`,
            width: `${inch * width}px`,
            height: `${inch * width}px`,
            borderRadius: '50%',
            left: `${inch * distance}px`,
            backgroundColor: color,
            transform: 'translateX(-50%)'}}
            ></div>
        <div style={{
            position: 'absolute',
            bottom: `${inch * 0.25}px`,
            width: `${inch * width}px`,
            height: `${inch * width}px`,
            borderRadius: '50%',
            left: `${inch * distance}px`,
            backgroundColor: color,
            transform: 'translateX(-50%)'}}
            ></div>
        <div style={{
            position: 'absolute',
            top: `${inch * 0.25}px`,
            width: `${inch * width}px`,
            height: `${inch * width}px`,
            borderRadius: '50%',
            right: `${inch * distance}px`,
            backgroundColor: color,
            transform: 'translateX(50%)'}}
            ></div>
        <div style={{
            position: 'absolute',
            bottom: `${inch * 0.25}px`,
            width: `${inch * width}px`,
            height: `${inch * width}px`,
            borderRadius: '50%',
            right: `${inch * distance}px`,
            backgroundColor: color,
            transform: 'translateX(50%)'}}
            ></div>
    </div>
  );
};

export const DoublePlotHoleOffset = ({ inch, distance, offset = 0, width, color = '#000' }: DoublePlotHoleProps) => {
  return (
    <div className="plot-hole" style={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 2,
        left: 0,
        top: 0,
    }}>
        <div style={{
            position: 'absolute',
            top: `${inch * 0.25}px`,
            width: `${inch * width}px`,
            height: `${inch * width}px`,
            borderRadius: '50%',
            left: `${inch * (distance - offset)}px`,
            backgroundColor: color}}
            ></div>
        <div style={{
            position: 'absolute',
            bottom: `${inch * 0.25}px`,
            width: `${inch * width}px`,
            height: `${inch * width}px`,
            borderRadius: '50%',
            left: `${inch * (distance + offset)}px`,
            backgroundColor: color,
            transform: 'translateX(-50%)'}}
            ></div>
        <div style={{
            position: 'absolute',
            top: `${inch * 0.25}px`,
            width: `${inch * width}px`,
            height: `${inch * width}px`,
            borderRadius: '50%',
            right: `${inch * (distance - offset)}px`,
            backgroundColor: color}}
            ></div>
        <div style={{
            position: 'absolute',
            bottom: `${inch * 0.25}px`,
            width: `${inch * width}px`,
            height: `${inch * width}px`,
            borderRadius: '50%',
            right: `${inch * (distance + offset)}px`,
            backgroundColor: color,
            transform: 'translateX(50%)'}}
            ></div>
    </div>
  );
};
