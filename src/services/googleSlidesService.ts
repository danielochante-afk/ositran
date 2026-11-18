import { SlideData, PRESENTATION_METADATA } from '../data/slidesData';

interface CreatePresentationResult {
  presentationId: string;
  presentationUrl: string;
}

/**
 * Creates a complete, multi-slide Google Slides presentation via the Google Slides v1 REST API
 * using the authenticated user's OAuth Bearer token.
 */
export async function exportToGoogleSlides(
  accessToken: string,
  slides: SlideData[],
  onProgress?: (status: string) => void
): Promise<CreatePresentationResult> {
  if (onProgress) onProgress('Creando presentación en Google Slides...');

  // 1. Create the blank presentation
  const createRes = await fetch('https://slides.googleapis.com/v1/presentations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: `${PRESENTATION_METADATA.caseTitle} (${PRESENTATION_METADATA.resolution}) - MGPD02`,
    }),
  });

  if (!createRes.ok) {
    const errText = await createRes.text();
    throw new Error(`Error al crear la presentación en Google Slides: ${createRes.status} ${errText}`);
  }

  const createdData = await createRes.json();
  const presentationId: string = createdData.presentationId;
  const defaultFirstSlideId: string | undefined = createdData.slides?.[0]?.objectId;

  if (onProgress) onProgress('Generando estructura de las 12 diapositivas y contenido técnico...');

  // 2. Build batchUpdate requests to create 12 custom slides and populate text boxes & tables
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requests: any[] = [];

  slides.forEach((slide, index) => {
    const slideObjectId = `slide_ositran_${index + 1}`;
    const headerBoxId = `header_box_${index + 1}`;
    const titleBoxId = `title_box_${index + 1}`;
    const bodyBoxId = `body_box_${index + 1}`;
    const footerBoxId = `footer_box_${index + 1}`;

    // Create blank slide
    requests.push({
      createSlide: {
        objectId: slideObjectId,
        insertionIndex: index,
        slideLayoutReference: {
          predefinedLayout: 'BLANK',
        },
      },
    });

    // Top Kicker / MGPD02 Section Header Box
    requests.push({
      createShape: {
        objectId: headerBoxId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: slideObjectId,
          size: {
            width: { magnitude: 650, unit: 'PT' },
            height: { magnitude: 28, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 35,
            translateY: 18,
            unit: 'PT',
          },
        },
      },
    });

    const headerText = `${slide.sectionCode.toUpperCase()}  ·  ${slide.sectionTitle}  ·  Rúbrica MGPD02: ${slide.mgpdCriterion}`;
    requests.push({
      insertText: {
        objectId: headerBoxId,
        insertionIndex: 0,
        text: headerText,
      },
    });

    requests.push({
      updateTextStyle: {
        objectId: headerBoxId,
        style: {
          fontFamily: 'Arial',
          fontSize: { magnitude: 9, unit: 'PT' },
          bold: true,
          foregroundColor: {
            opaqueColor: {
              rgbColor: { red: 0.01, green: 0.52, blue: 0.78 },
            },
          },
        },
        fields: 'fontFamily,fontSize,bold,foregroundColor',
      },
    });

    // Main Slide Title + Subtitle Box
    requests.push({
      createShape: {
        objectId: titleBoxId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: slideObjectId,
          size: {
            width: { magnitude: 650, unit: 'PT' },
            height: { magnitude: 68, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 35,
            translateY: 42,
            unit: 'PT',
          },
        },
      },
    });

    const titleText = `${slide.title}\n${slide.subtitle}`;
    requests.push({
      insertText: {
        objectId: titleBoxId,
        insertionIndex: 0,
        text: titleText,
      },
    });

    requests.push({
      updateTextStyle: {
        objectId: titleBoxId,
        textRange: {
          type: 'FIXED_RANGE',
          startIndex: 0,
          endIndex: slide.title.length,
        },
        style: {
          fontFamily: 'Georgia',
          fontSize: { magnitude: 17, unit: 'PT' },
          bold: true,
          foregroundColor: {
            opaqueColor: {
              rgbColor: { red: 0.06, green: 0.09, blue: 0.16 },
            },
          },
        },
        fields: 'fontFamily,fontSize,bold,foregroundColor',
      },
    });

    requests.push({
      updateTextStyle: {
        objectId: titleBoxId,
        textRange: {
          type: 'FIXED_RANGE',
          startIndex: slide.title.length + 1,
          endIndex: titleText.length,
        },
        style: {
          fontFamily: 'Arial',
          fontSize: { magnitude: 10.5, unit: 'PT' },
          italic: true,
          foregroundColor: {
            opaqueColor: {
              rgbColor: { red: 0.28, green: 0.33, blue: 0.41 },
            },
          },
        },
        fields: 'fontFamily,fontSize,italic,foregroundColor',
      },
    });

    // Body Content Box (Key Points + Stats/Table Summary + Economic Theory)
    requests.push({
      createShape: {
        objectId: bodyBoxId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: slideObjectId,
          size: {
            width: { magnitude: 650, unit: 'PT' },
            height: { magnitude: 245, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 35,
            translateY: 112,
            unit: 'PT',
          },
        },
      },
    });

    const bodyLines: string[] = [];
    slide.keyPoints.forEach((pt) => {
      bodyLines.push(`• ${pt}`);
    });

    if (slide.economicConcept) {
      bodyLines.push('');
      bodyLines.push(
        `[Teoría Económica: ${slide.economicConcept.term}] ${
          slide.economicConcept.formula ? `(${slide.economicConcept.formula}) ` : ''
        }— ${slide.economicConcept.explanation}`
      );
    }

    if (slide.table) {
      bodyLines.push('');
      bodyLines.push(` síntesis de ${slide.table.caption}:`);
      slide.table.rows.slice(0, 5).forEach((r) => {
        bodyLines.push(`   ▸ ${r.cells.join('  |  ')}`);
      });
    }

    const fullBodyText = bodyLines.join('\n');
    requests.push({
      insertText: {
        objectId: bodyBoxId,
        insertionIndex: 0,
        text: fullBodyText,
      },
    });

    requests.push({
      updateTextStyle: {
        objectId: bodyBoxId,
        style: {
          fontFamily: 'Arial',
          fontSize: { magnitude: 9.5, unit: 'PT' },
          foregroundColor: {
            opaqueColor: {
              rgbColor: { red: 0.12, green: 0.16, blue: 0.23 },
            },
          },
        },
        fields: 'fontFamily,fontSize,foregroundColor',
      },
    });

    // Footer Box (APA References & Timing)
    requests.push({
      createShape: {
        objectId: footerBoxId,
        shapeType: 'TEXT_BOX',
        elementProperties: {
          pageObjectId: slideObjectId,
          size: {
            width: { magnitude: 650, unit: 'PT' },
            height: { magnitude: 32, unit: 'PT' },
          },
          transform: {
            scaleX: 1,
            scaleY: 1,
            translateX: 35,
            translateY: 362,
            unit: 'PT',
          },
        },
      },
    });

    const footerText = `Diapositiva ${slide.id} de ${slides.length}  ·  Tiempo asignado: ${slide.durationMinutes} min (${slide.presenterRole})  ·  Fuente APA 7ma: ${slide.apaReferences[0] || 'OSITRAN (2016)'}`;
    requests.push({
      insertText: {
        objectId: footerBoxId,
        insertionIndex: 0,
        text: footerText,
      },
    });

    requests.push({
      updateTextStyle: {
        objectId: footerBoxId,
        style: {
          fontFamily: 'Arial',
          fontSize: { magnitude: 8, unit: 'PT' },
          foregroundColor: {
            opaqueColor: {
              rgbColor: { red: 0.39, green: 0.45, blue: 0.55 },
            },
          },
        },
        fields: 'fontFamily,fontSize,foregroundColor',
      },
    });
  });

  // Remove the initial default blank slide created by Google Slides
  if (defaultFirstSlideId) {
    requests.push({
      deleteObject: {
        objectId: defaultFirstSlideId,
      },
    });
  }

  const batchRes = await fetch(
    `https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ requests }),
    }
  );

  if (!batchRes.ok) {
    const errText = await batchRes.text();
    throw new Error(`Error al poblar las diapositivas en Google Slides: ${batchRes.status} ${errText}`);
  }

  if (onProgress) onProgress('¡Presentación generada exitosamente en Google Slides!');

  return {
    presentationId,
    presentationUrl: `https://docs.google.com/presentation/d/${presentationId}/edit`,
  };
}
