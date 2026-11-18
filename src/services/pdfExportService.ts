import { jsPDF } from 'jspdf';
import { SlideData, PRESENTATION_METADATA } from '../data/slidesData';

function sanitizeForPdf(text: string): string {
  return text
    .replace(/⇒/g, '=>')
    .replace(/→/g, '->')
    .replace(/≤/g, '<=')
    .replace(/≥/g, '>=')
    .replace(/▸/g, '>')
    .replace(/★/g, '*')
    .replace(/●/g, '*')
    .replace(/▲/g, '^');
}

export function exportSlideToPdf(slide: SlideData, totalSlides: number, includeNotes = true): string {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 297 mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 210 mm
  const marginX = 15;
  const contentWidth = pageWidth - marginX * 2; // 267 mm
  const footerReservedHeight = 16;
  const maxBodyY = pageHeight - footerReservedHeight;

  let cursorY = 14;

  const drawPageChrome = (isContinuation: boolean) => {
    // Top accent bar
    doc.setFillColor(3, 105, 161); // sky-700
    doc.rect(0, 0, pageWidth, 2.2, 'F');

    if (isContinuation) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(3, 105, 161);
      doc.text(
        sanitizeForPdf(`${slide.sectionCode.toUpperCase()} · ${slide.title} (Continuación)`),
        marginX,
        11
      );
      doc.setDrawColor(226, 232, 240);
      doc.line(marginX, 13.5, pageWidth - marginX, 13.5);
      cursorY = 19;
    }
  };

  const ensureSpace = (neededHeight: number) => {
    if (cursorY + neededHeight > maxBodyY) {
      doc.addPage();
      drawPageChrome(true);
      return true;
    }
    return false;
  };

  // First page top chrome
  drawPageChrome(false);

  // Institutional header line
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text(
    sanitizeForPdf(`${PRESENTATION_METADATA.program} · ${PRESENTATION_METADATA.resolution}`),
    marginX,
    9.5
  );
  doc.setTextColor(3, 105, 161);
  doc.text(
    sanitizeForPdf(`Diapositiva ${slide.id} de ${totalSlides}`),
    pageWidth - marginX,
    9.5,
    { align: 'right' }
  );

  cursorY = 15;

  // Section + MGPD02 Criterion row
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(3, 105, 161);
  doc.text(sanitizeForPdf(`${slide.sectionCode}  ·  ${slide.sectionTitle}`), marginX, cursorY);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(71, 85, 105);
  doc.text(sanitizeForPdf(`Rúbrica MGPD02: ${slide.mgpdCriterion}`), pageWidth - marginX, cursorY, {
    align: 'right',
  });

  cursorY += 6.5;

  // Slide Title
  doc.setFont('times', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  const titleLines = doc.splitTextToSize(sanitizeForPdf(slide.title), contentWidth);
  doc.text(titleLines, marginX, cursorY);
  cursorY += titleLines.length * 6.2;

  // Subtitle
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(71, 85, 105);
  const subtitleLines = doc.splitTextToSize(sanitizeForPdf(slide.subtitle), contentWidth);
  doc.text(subtitleLines, marginX, cursorY);
  cursorY += subtitleLines.length * 4.4 + 2;

  // Presenter & timing metadata line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(100, 116, 139);
  doc.text(
    sanitizeForPdf(
      `Expositor sugerido: ${slide.presenterRole}  ·  Tiempo asignado: ${slide.durationMinutes} min`
    ),
    marginX,
    cursorY
  );
  cursorY += 3;

  doc.setDrawColor(203, 213, 225);
  doc.line(marginX, cursorY, pageWidth - marginX, cursorY);
  cursorY += 5.5;

  // 1. Stats Cards Grid (if present)
  if (slide.stats && slide.stats.length > 0) {
    const gap = 4;
    const cardWidth = (contentWidth - gap * (slide.stats.length - 1)) / slide.stats.length;
    const cardHeight = 20;
    ensureSpace(cardHeight + 4);

    slide.stats.forEach((stat, idx) => {
      const x = marginX + idx * (cardWidth + gap);
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(x, cursorY, cardWidth, cardHeight, 2, 2, 'FD');

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(100, 116, 139);
      doc.text(sanitizeForPdf(stat.label), x + 3, cursorY + 5);

      doc.setFont('courier', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(15, 23, 42);
      doc.text(sanitizeForPdf(stat.value), x + 3, cursorY + 11.2);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.8);
      doc.setTextColor(71, 85, 105);
      const subLines = doc.splitTextToSize(sanitizeForPdf(stat.subtext), cardWidth - 6);
      doc.text(subLines.slice(0, 2), x + 3, cursorY + 15.5);
    });

    cursorY += cardHeight + 5;
  }

  // 2. Economic Concept Box (if present)
  if (slide.economicConcept) {
    const ec = slide.economicConcept;
    const expLines = doc.splitTextToSize(sanitizeForPdf(ec.explanation), contentWidth - 8);
    const citLines = doc.splitTextToSize(
      sanitizeForPdf(`Referencia teórica: ${ec.citation}`),
      contentWidth - 8
    );
    const formulaHeight = ec.formula ? 6 : 0;
    const boxHeight = 9 + formulaHeight + expLines.length * 3.8 + citLines.length * 3.4 + 3;

    ensureSpace(boxHeight + 4);

    doc.setFillColor(240, 249, 255); // sky-50
    doc.setDrawColor(186, 230, 253); // sky-200
    doc.roundedRect(marginX, cursorY, contentWidth, boxHeight, 2, 2, 'FD');

    let innerY = cursorY + 5.2;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(12, 74, 110);
    doc.text(sanitizeForPdf(`Fundamento de Teoría Económica: ${ec.term}`), marginX + 4, innerY);
    innerY += 4.5;

    if (ec.formula) {
      doc.setFont('courier', 'bold');
      doc.setFontSize(8.2);
      doc.setTextColor(3, 105, 161);
      doc.text(sanitizeForPdf(ec.formula), marginX + 4, innerY);
      innerY += 5;
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    doc.text(expLines, marginX + 4, innerY);
    innerY += expLines.length * 3.8 + 1.5;

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(7.2);
    doc.setTextColor(100, 116, 139);
    doc.text(citLines, marginX + 4, innerY);

    cursorY += boxHeight + 5;
  }

  // 3. Key Points List
  ensureSpace(12);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text('ANÁLISIS TÉCNICO Y ARGUMENTOS CENTRALES (SUSTENTO PARA EL MEF)', marginX, cursorY);
  cursorY += 5;

  slide.keyPoints.forEach((pt, idx) => {
    const numPrefix = `${String(idx + 1).padStart(2, '0')}.`;
    const wrapped = doc.splitTextToSize(sanitizeForPdf(pt), contentWidth - 9);
    const blockHeight = wrapped.length * 4.1 + 1.8;

    ensureSpace(blockHeight);

    doc.setFont('courier', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(3, 105, 161);
    doc.text(numPrefix, marginX, cursorY);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);
    doc.text(wrapped, marginX + 8.5, cursorY);

    cursorY += blockHeight;
  });

  cursorY += 3;

  // 4. Data Table (if present)
  if (slide.table) {
    const tbl = slide.table;
    const colCount = tbl.headers.length;
    const colWidth = contentWidth / colCount;

    const renderTableHeader = () => {
      const headerWrapped = tbl.headers.map((h) =>
        doc.splitTextToSize(sanitizeForPdf(h), colWidth - 4)
      );
      const maxHeaderLines = Math.max(...headerWrapped.map((l) => l.length));
      const headerHeight = maxHeaderLines * 3.8 + 4;

      doc.setFillColor(241, 245, 249);
      doc.setDrawColor(203, 213, 225);
      doc.rect(marginX, cursorY, contentWidth, headerHeight, 'FD');

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(51, 65, 85);
      headerWrapped.forEach((lines, cIdx) => {
        const cellX = marginX + cIdx * colWidth;
        doc.text(lines, cellX + 2, cursorY + 4.2);
        if (cIdx > 0) {
          doc.line(cellX, cursorY, cellX, cursorY + headerHeight);
        }
      });

      cursorY += headerHeight;
    };

    ensureSpace(22);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text(sanitizeForPdf(tbl.caption), marginX, cursorY);
    cursorY += 3.5;

    renderTableHeader();

    tbl.rows.forEach((row) => {
      const cellWrapped = row.cells.map((cell) =>
        doc.splitTextToSize(sanitizeForPdf(cell), colWidth - 4)
      );
      const maxLines = Math.max(...cellWrapped.map((l) => l.length));
      const rowHeight = maxLines * 3.6 + 3.8;

      if (ensureSpace(rowHeight + 2)) {
        renderTableHeader();
      }

      if (row.highlight) {
        doc.setFillColor(240, 249, 255);
      } else {
        doc.setFillColor(255, 255, 255);
      }
      doc.setDrawColor(226, 232, 240);
      doc.rect(marginX, cursorY, contentWidth, rowHeight, 'FD');

      doc.setFont('helvetica', row.highlight ? 'bold' : 'normal');
      doc.setFontSize(7.4);
      doc.setTextColor(30, 41, 59);

      cellWrapped.forEach((lines, cIdx) => {
        const cellX = marginX + cIdx * colWidth;
        doc.text(lines, cellX + 2, cursorY + 4);
        if (cIdx > 0) {
          doc.setDrawColor(226, 232, 240);
          doc.line(cellX, cursorY, cellX, cursorY + rowHeight);
        }
      });

      cursorY += rowHeight;
    });

    cursorY += 5;
  }

  // 5. Oral Speaker Notes (if enabled)
  if (includeNotes && slide.speakerNotes) {
    const notesWrapped = doc.splitTextToSize(
      sanitizeForPdf(`"${slide.speakerNotes}"`),
      contentWidth - 8
    );
    const notesHeight = 8 + notesWrapped.length * 3.8 + 2.5;

    ensureSpace(notesHeight + 3);

    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(marginX, cursorY, contentWidth, notesHeight, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(
      sanitizeForPdf(
        `Guion de Sustentación Oral (${slide.presenterRole} · ${slide.durationMinutes} min)`
      ),
      marginX + 4,
      cursorY + 5
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(51, 65, 85);
    doc.text(notesWrapped, marginX + 4, cursorY + 9.5);

    cursorY += notesHeight + 4;
  }

  // 6. Add consistent footers (APA references + page numbers) to every generated page
  const totalPages = doc.getNumberOfPages();
  const apaText = sanitizeForPdf(`Cita APA 7ma: ${slide.apaReferences.join(' | ')}`);
  const apaWrapped = doc.splitTextToSize(apaText, contentWidth - 45);

  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    const footerY = pageHeight - 11.5;
    doc.setDrawColor(226, 232, 240);
    doc.line(marginX, footerY - 3, pageWidth - marginX, footerY - 3);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(100, 116, 139);
    doc.text(apaWrapped.slice(0, 2), marginX, footerY);

    doc.setFont('courier', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    doc.text(
      sanitizeForPdf(`Diapositiva ${slide.id}/${totalSlides} · Pág. ${p}/${totalPages}`),
      pageWidth - marginX,
      footerY + 1,
      { align: 'right' }
    );
  }

  const fileName = `OSITRAN_Yurimaguas_Diapositiva_${String(slide.id).padStart(2, '0')}.pdf`;
  doc.save(fileName);
  return fileName;
}
