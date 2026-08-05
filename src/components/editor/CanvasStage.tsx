import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Text, Rect, Circle, Image as KonvaImg, Transformer } from 'react-konva';
import { KonvaLayer } from '../../types';

interface CanvasStageProps {
  layers: KonvaLayer[];
  selectedLayerId: string | null;
  onSelectLayer: (id: string | null) => void;
  onUpdateLayer: (id: string, updated: Partial<KonvaLayer>) => void;
  canvasWidth: number;
  canvasHeight: number;
  zoomLevel: number;
  showGrid: boolean;
  stageRef: React.RefObject<any>;
}

const URLImage: React.FC<{
  layer: any;
  isSelected: boolean;
  onSelect: () => void;
  onChange: (newAttrs: any) => void;
}> = ({ layer, isSelected, onSelect, onChange }) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const shapeRef = useRef<any>(null);

  useEffect(() => {
    if (!layer.url) return;
    const img = new window.Image();
    if (layer.url.startsWith('http')) {
      img.crossOrigin = 'Anonymous';
    }
    img.src = layer.url;
    img.onload = () => {
      setImage(img);
    };
    img.onerror = () => {
      console.error('Failed to load image:', layer.url);
    }
  }, [layer.url]);

  return (
    <KonvaImg
      id={layer.id}
      ref={shapeRef}
      image={image || undefined}
      x={layer.x}
      y={layer.y}
      width={layer.width}
      height={layer.height}
      rotation={layer.rotation || 0}
      cornerRadius={layer.borderRadius || 0}
      opacity={layer.visible === false ? 0 : layer.opacity ?? 1}
      draggable={!layer.locked}
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => {
        onChange({
          x: e.target.x(),
          y: e.target.y()
        });
      }}
      onTransformEnd={(e) => {
        const node = shapeRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);
        onChange({
          x: node.x(),
          y: node.y(),
          width: Math.max(20, node.width() * scaleX),
          height: Math.max(20, node.height() * scaleY),
          rotation: node.rotation()
        });
      }}
    />
  );
};

export const CanvasStage: React.FC<CanvasStageProps> = ({
  layers,
  selectedLayerId,
  onSelectLayer,
  onUpdateLayer,
  canvasWidth,
  canvasHeight,
  zoomLevel,
  showGrid,
  stageRef
}) => {
  const trRef = useRef<any>(null);

  // Sync Konva Transformer with currently selected layer
  useEffect(() => {
    if (selectedLayerId && trRef.current && stageRef.current) {
      const selectedNode = stageRef.current.findOne('#' + selectedLayerId);
      if (selectedNode) {
        trRef.current.nodes([selectedNode]);
        trRef.current.getLayer().batchDraw();
      } else {
        trRef.current.nodes([]);
      }
    } else if (trRef.current) {
      trRef.current.nodes([]);
    }
  }, [selectedLayerId, layers]);

  const sortedLayers = [...layers].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div className="relative flex items-center justify-center shadow-2xl rounded-2xl border border-slate-800 bg-[#0B1220] overflow-hidden">
      <div
        className="relative shadow-2xl rounded-lg overflow-hidden border border-slate-700/50"
        style={{ width: canvasWidth * zoomLevel, height: canvasHeight * zoomLevel }}
      >
        {/* Optional Canvas Grid Lines Overlay */}
        {showGrid && (
          <div className="absolute inset-0 bg-canvas-grid pointer-events-none z-30" />
        )}

        <Stage
          width={canvasWidth * zoomLevel}
          height={canvasHeight * zoomLevel}
          scaleX={zoomLevel}
          scaleY={zoomLevel}
          ref={stageRef}
          onMouseDown={(e) => {
            if (e.target === e.target.getStage() || e.target.name() === 'background-rect') {
              onSelectLayer(null);
            }
          }}
        >
          <Layer>
            {sortedLayers.map((layer) => {
              if (layer.visible === false) return null;

              if (layer.type === 'background') {
                return (
                  <Rect
                    key={layer.id}
                    id={layer.id}
                    name="background-rect"
                    x={0}
                    y={0}
                    width={canvasWidth}
                    height={canvasHeight}
                    fill={layer.color || '#0F172A'}
                    onClick={() => onSelectLayer(null)}
                    onTap={() => onSelectLayer(null)}
                  />
                );
              }

              if (layer.type === 'text') {
                return (
                  <Text
                    key={layer.id}
                    id={layer.id}
                    x={layer.x}
                    y={layer.y}
                    text={layer.text}
                    fontSize={layer.fontSize}
                    fontFamily={layer.fontFamily || 'Inter'}
                    fill={layer.fill}
                    fontStyle={layer.fontStyle || 'normal'}
                    align={layer.align || 'left'}
                    width={layer.width}
                    draggable={!layer.locked}
                    opacity={layer.opacity ?? 1}
                    onClick={() => onSelectLayer(layer.id)}
                    onTap={() => onSelectLayer(layer.id)}
                    onDragEnd={(e) => {
                      onUpdateLayer(layer.id, {
                        x: e.target.x(),
                        y: e.target.y()
                      });
                    }}
                    onTransformEnd={(e) => {
                      const node = e.target;
                      const scaleX = node.scaleX();
                      node.scaleX(1);
                      node.scaleY(1);
                      onUpdateLayer(layer.id, {
                        x: node.x(),
                        y: node.y(),
                        width: Math.max(20, node.width() * scaleX),
                        fontSize: layer.fontSize ? layer.fontSize * scaleX : 16 * scaleX,
                        rotation: node.rotation()
                      });
                    }}
                  />
                );
              }

              if (layer.type === 'image' || layer.type === 'photo' || layer.type === 'logo') {
                return (
                  <URLImage
                    key={layer.id}
                    layer={layer}
                    isSelected={selectedLayerId === layer.id}
                    onSelect={() => onSelectLayer(layer.id)}
                    onChange={(newAttrs) => onUpdateLayer(layer.id, newAttrs)}
                  />
                );
              }

              if (layer.type === 'shape') {
                if (layer.shapeType === 'circle') {
                  return (
                    <Circle
                      key={layer.id}
                      id={layer.id}
                      x={layer.x + layer.width / 2}
                      y={layer.y + layer.height / 2}
                      radius={layer.width / 2}
                      fill={layer.fill}
                      stroke={layer.stroke}
                      strokeWidth={layer.strokeWidth || 0}
                      draggable={!layer.locked}
                      onClick={() => onSelectLayer(layer.id)}
                      onDragEnd={(e) => {
                        onUpdateLayer(layer.id, {
                          x: e.target.x() - layer.width / 2,
                          y: e.target.y() - layer.height / 2
                        });
                      }}
                      onTransformEnd={(e) => {
                        const node = e.target;
                        const scaleX = node.scaleX();
                        const scaleY = node.scaleY();
                        node.scaleX(1);
                        node.scaleY(1);
                        onUpdateLayer(layer.id, {
                          x: node.x() - (layer.width * scaleX) / 2,
                          y: node.y() - (layer.width * scaleY) / 2,
                          width: Math.max(20, layer.width * scaleX),
                          height: Math.max(20, layer.width * scaleX),
                          rotation: node.rotation()
                        });
                      }}
                    />
                  );
                }

                return (
                  <Rect
                    key={layer.id}
                    id={layer.id}
                    x={layer.x}
                    y={layer.y}
                    width={layer.width}
                    height={layer.height}
                    fill={layer.fill}
                    stroke={layer.stroke}
                    strokeWidth={layer.strokeWidth || 0}
                    cornerRadius={layer.borderRadius || 0}
                    draggable={!layer.locked}
                    onClick={() => onSelectLayer(layer.id)}
                    onDragEnd={(e) => {
                      onUpdateLayer(layer.id, {
                        x: e.target.x(),
                        y: e.target.y()
                      });
                    }}
                    onTransformEnd={(e) => {
                      const node = e.target;
                      const scaleX = node.scaleX();
                      const scaleY = node.scaleY();
                      node.scaleX(1);
                      node.scaleY(1);
                      onUpdateLayer(layer.id, {
                        x: node.x(),
                        y: node.y(),
                        width: Math.max(20, node.width() * scaleX),
                        height: Math.max(20, node.height() * scaleY),
                        rotation: node.rotation()
                      });
                    }}
                  />
                );
              }

              return null;
            })}

            {/* Konva Transformer Handle */}
            <Transformer
              ref={trRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 10 || newBox.height < 10) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};
