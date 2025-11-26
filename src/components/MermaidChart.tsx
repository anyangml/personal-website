import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

interface MermaidChartProps {
  chart: string;
}

// Initialize Mermaid with custom configuration
mermaid.initialize({
  startOnLoad: true,
  theme: 'default',
  securityLevel: 'loose',
  gantt: {
    titleTopMargin: 60,
    barHeight: 60,
    barGap: 12,
    topPadding: 100,
    leftPadding: 250,
    gridLineStartPadding: 60,
    fontSize: 24,
    sectionFontSize: 28,
    axisFormat: '%Y-%m',
  },
  themeVariables: {
    fontSize: '26px',
    fontFamily: 'Arial, sans-serif',
    primaryTextColor: '#333',
    primaryColor: '#4a90e2',
    primaryBorderColor: '#4a90e2',
    lineColor: '#999',
    sectionBkgColor: '#ffd700',
    sectionBkgColor2: '#ffd700',
    altSectionBkgColor: 'transparent',
  },
});

const MermaidChart: React.FC<MermaidChartProps> = ({ chart }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');

  useEffect(() => {
    const renderChart = async () => {
      if (!chart) return;

      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
      } catch (error) {
        console.error('Mermaid rendering error:', error);
        if (ref.current) {
          ref.current.innerHTML = `<pre style="color: red;">Error rendering chart: ${error}</pre>`;
        }
      }
    };

    renderChart();
  }, [chart]);

  return (
    <>
      <style>{`
        .mermaid-container text.titleText {
          font-size: 36px !important;
          font-weight: bold !important;
        }
        .mermaid-container text.sectionTitle {
          font-size: 28px !important;
          font-weight: 600 !important;
        }
        .mermaid-container text.taskText {
          font-size: 24px !important;
        }
        .mermaid-container .grid .tick text {
          font-size: 22px !important;
          font-weight: 500 !important;
        }
        .mermaid-container .grid text {
          font-size: 22px !important;
        }
        .mermaid-container svg {
          min-width: 1400px !important;
          height: auto !important;
        }
        
        /* Custom scrollbar styling - Gold theme matching site colors */
        .mermaid-container::-webkit-scrollbar {
          width: 14px;
          height: 14px;
        }
        .mermaid-container::-webkit-scrollbar-track {
          background: #f9f9f9;
          border-radius: 7px;
        }
        .mermaid-container::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #d4af37 0%, #ffd700 100%);
          border-radius: 7px;
          border: 2px solid #f9f9f9;
        }
        .mermaid-container::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #ffd700 0%, #d4af37 100%);
        }
        
        /* Firefox scrollbar - Gold theme */
        .mermaid-container {
          scrollbar-width: auto;
          scrollbar-color: #d4af37 #f9f9f9;
        }
      `}</style>
      <div 
        ref={ref} 
        className="mermaid-container"
        style={{ 
          textAlign: 'left', 
          margin: '30px 0',
          overflow: 'auto',
          width: '100%',
          maxHeight: '700px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: '20px',
          backgroundColor: '#fafafa'
        }}
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </>
  );
};

export default MermaidChart;
