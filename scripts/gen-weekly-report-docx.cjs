const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
  BorderStyle, WidthType, ShadingType, PageNumber, PageBreak
} = require('docx');

// Read the markdown file
const md = fs.readFileSync(
  process.env.HOME + '/openclaw/workspace-xs001/weekly-report-2026-07-05.md',
  'utf-8'
);

// Helper: parse inline bold/italic
function parseInline(text) {
  const runs = [];
  // Split by **bold** and normal text
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  for (const part of parts) {
    if (part.startsWith('**') && part.endsWith('**')) {
      runs.push(new TextRun({ text: part.slice(2, -2), bold: true, font: "Arial", size: 24 }));
    } else if (part) {
      runs.push(new TextRun({ text: part, font: "Arial", size: 24 }));
    }
  }
  return runs;
}

// Parse markdown into structured content
const lines = md.split('\n');
const children = [];

// Title
children.push(new Paragraph({
  heading: HeadingLevel.HEADING_1,
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new TextRun({ text: 'AI/科技行业周报', font: "Arial", size: 40, bold: true })]
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 100 },
  children: [new TextRun({ text: '2026年7月5日（周日）', font: "Arial", size: 28 })]
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 300 },
  children: [new TextRun({ text: '覆盖时间：2026年6月29日 - 7月5日', font: "Arial", size: 22, color: "666666" })]
}));

// Horizontal rule
children.push(new Paragraph({
  spacing: { before: 100, after: 200 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 1 } },
  children: []
}));

let i = 0;
let inTable = false;
let tableRows = [];
let tableHeaders = [];

function flushTable() {
  if (tableHeaders.length === 0) return;
  
  const border = { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC" };
  const borders = { top: border, bottom: border, left: border, right: border };
  const colCount = tableHeaders.length;
  const tableWidth = 9360;
  const colWidth = Math.floor(tableWidth / colCount);
  const colWidths = Array(colCount).fill(colWidth);
  // Adjust last column to match total width
  colWidths[colCount - 1] = tableWidth - colWidth * (colCount - 1);

  const rows = [];
  
  // Header row
  rows.push(new TableRow({
    tableHeader: true,
    children: tableHeaders.map((h, idx) => new TableCell({
      borders,
      width: { size: colWidths[idx], type: WidthType.DXA },
      shading: { fill: "1a73e8", type: ShadingType.CLEAR },
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      verticalAlign: "center",
      children: [new Paragraph({
        children: [new TextRun({ text: h.replace(/\*\*/g, ''), bold: true, font: "Arial", size: 22, color: "FFFFFF" })]
      })]
    }))
  }));

  // Data rows
  for (const row of tableRows) {
    rows.push(new TableRow({
      children: row.map((cell, idx) => new TableCell({
        borders,
        width: { size: colWidths[idx] || colWidth, type: WidthType.DXA },
        margins: { top: 60, bottom: 60, left: 120, right: 120 },
        children: [new Paragraph({
          children: parseInline(cell.trim())
        })]
      }))
    }));
  }

  children.push(new Table({
    width: { size: tableWidth, type: WidthType.DXA },
    columnWidths: colWidths,
    rows
  }));

  children.push(new Paragraph({ spacing: { after: 200 }, children: [] }));
  
  tableHeaders = [];
  tableRows = [];
}

while (i < lines.length) {
  const line = lines[i];

  // Skip the main title lines we already handled
  if (i < 5) { i++; continue; }

  // Skip horizontal rules
  if (line.trim() === '---') {
    children.push(new Paragraph({
      spacing: { before: 100, after: 200 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "CCCCCC", space: 1 } },
      children: []
    }));
    i++;
    continue;
  }

  // Skip empty lines
  if (line.trim() === '') { i++; continue; }

  // Table detection
  if (line.includes('|') && line.trim().startsWith('|')) {
    const cells = line.split('|').filter(c => c.trim() !== '').map(c => c.trim());
    
    // Check if separator row
    if (cells.every(c => /^[-:]+$/.test(c.trim()))) {
      i++;
      continue;
    }
    
    if (!inTable) {
      inTable = true;
      tableHeaders = cells;
    } else {
      tableRows.push(cells);
    }
    i++;
    // Check if next line is not a table row
    if (i >= lines.length || !lines[i].includes('|') || !lines[i].trim().startsWith('|')) {
      inTable = false;
      flushTable();
    }
    continue;
  }

  // Headings
  if (line.startsWith('### ')) {
    children.push(new Paragraph({
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 240, after: 120 },
      children: [new TextRun({ text: line.slice(4).trim(), font: "Arial", size: 26, bold: true })]
    }));
    i++;
    continue;
  }
  if (line.startsWith('## ')) {
    children.push(new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 300, after: 160 },
      children: [new TextRun({ text: line.slice(3).trim(), font: "Arial", size: 30, bold: true })]
    }));
    i++;
    continue;
  }

  // Blockquote
  if (line.startsWith('> ')) {
    const quoteText = line.slice(2).trim();
    children.push(new Paragraph({
      spacing: { before: 100, after: 100 },
      indent: { left: 720 },
      border: { left: { style: BorderStyle.SINGLE, size: 3, color: "1a73e8", space: 8 } },
      children: parseInline(quoteText)
    }));
    i++;
    continue;
  }

  // Bullet list
  if (line.startsWith('- ')) {
    children.push(new Paragraph({
      spacing: { before: 40, after: 40 },
      indent: { left: 720, hanging: 360 },
      children: [
        new TextRun({ text: '• ', font: "Arial", size: 24 }),
        ...parseInline(line.slice(2).trim())
      ]
    }));
    i++;
    continue;
  }

  // Regular paragraph
  if (line.trim()) {
    children.push(new Paragraph({
      spacing: { before: 60, after: 60 },
      children: parseInline(line.trim())
    }));
  }
  i++;
}

// Footer note
children.push(new Paragraph({ spacing: { before: 400 }, children: [] }));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 200 },
  children: [new TextRun({ text: '报告生成时间：2026-07-05 20:01 (Asia/Shanghai)', font: "Arial", size: 20, color: "999999" })]
}));
children.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [new TextRun({ text: '数据来源：Tavily Search, Web Search, 综合整理', font: "Arial", size: 20, color: "999999" })]
}));

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Arial", size: 24 } }
    },
    paragraphStyles: [
      {
        id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 40, bold: true, font: "Arial", color: "1a1a1a" },
        paragraph: { spacing: { before: 240, after: 240 }, outlineLevel: 0 }
      },
      {
        id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, font: "Arial", color: "1a73e8" },
        paragraph: { spacing: { before: 300, after: 160 }, outlineLevel: 1 }
      },
      {
        id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 26, bold: true, font: "Arial", color: "333333" },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 2 }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: '半百观AI | AI/科技行业周报', font: "Arial", size: 18, color: "999999" })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: '第 ', font: "Arial", size: 18, color: "999999" }),
            new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 18, color: "999999" }),
            new TextRun({ text: ' 页', font: "Arial", size: 18, color: "999999" })
          ]
        })]
      })
    },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const outPath = process.env.HOME + '/openclaw/workspace-xs001/wu-personal-site/public/weekly-report-2026-07-05.docx';
  fs.writeFileSync(outPath, buffer);
  console.log('✅ DOCX created:', outPath);
  console.log('   Size:', (buffer.length / 1024).toFixed(1), 'KB');
});
