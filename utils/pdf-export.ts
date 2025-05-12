import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Constants for A4 paper dimensions
const A4_WIDTH_PX = 794; // A4 width at 96 DPI
const A4_HEIGHT_PX = 1123; // A4 height at 96 DPI (matches the preview page break)
const PAGE_MARGIN = 20;

/**
 * Exports a DOM element as a PDF file
 * @param elementId The ID of the element to export
 * @param filename The name of the PDF file
 */
export const exportToPdf = async (elementId: string, filename: string = 'resume.pdf'): Promise<void> => {
  try {
    // Get the element to be converted to PDF
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    // Create a clone to avoid modifying the original element
    const clone = element.cloneNode(true) as HTMLElement;
    
    // Remove the page break indicators that are only for the preview
    const pageBreakIndicators = clone.querySelectorAll('[class*="border-dashed border-blue-400"]');
    pageBreakIndicators.forEach(indicator => {
      indicator.parentNode?.removeChild(indicator);
    });
    
    // Set styles for proper PDF rendering
    clone.style.width = `${A4_WIDTH_PX}px`;
    clone.style.padding = `${PAGE_MARGIN}px`;
    clone.style.boxSizing = 'border-box';
    clone.style.margin = '0 auto'; // Center the content
    
    // Apply a style to override any problematic colors
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      * {
        color-scheme: light !important;
      }
      [data-theme] {
        color-scheme: light !important;
      }
      @page {
        margin: 0;
      }
      body {
        margin: 0;
      }
    `;
    clone.appendChild(styleElement);
    
    // Temporarily append the clone to the DOM
    document.body.appendChild(clone);
    
    try {
      // Create canvas from the element with simpler options
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#FFFFFF',
        logging: false,
        onclone: (clonedDoc) => {
          // This callback gives us another opportunity to modify the cloned document
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach(el => {
            if (el instanceof HTMLElement) {
              // Force standard colors for all elements
              el.style.colorScheme = 'light';
            }
          });
        }
      });
      
      // Calculate PDF dimensions
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const contentWidth = pdfWidth - (PAGE_MARGIN * 2);
      const ratio = canvas.width / contentWidth;
      const canvasHeight = canvas.height / ratio;
      
      // Function to add content to a page with margins
      const addContentToPage = (yPosition: number = 0) => {
        pdf.addImage(
          imgData, 
          'PNG', 
          PAGE_MARGIN, // Left margin
          PAGE_MARGIN + yPosition, // Top margin + position offset
          contentWidth, 
          canvasHeight
        );
      };
      
      // Add first page with margins
      addContentToPage();
      
      // If content exceeds page height, create additional pages with margins
      if (canvasHeight > pdfHeight - (PAGE_MARGIN * 2)) {
        let remainingHeight = canvasHeight;
        let position = -(pdfHeight - (PAGE_MARGIN * 2)); // Starting position for the second page
        
        while (remainingHeight > (pdfHeight - (PAGE_MARGIN * 2))) {
          pdf.addPage();
          addContentToPage(position);
          remainingHeight -= (pdfHeight - (PAGE_MARGIN * 2));
          position -= (pdfHeight - (PAGE_MARGIN * 2));
        }
      }
      
      // Save the PDF
      pdf.save(filename);
      
      return Promise.resolve();
    } finally {
      // Always remove the clone from the DOM
      document.body.removeChild(clone);
    }
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw error;
  }
}; 