import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
    clone.style.width = '794px'; // A4 width at 96 DPI (794px)
    clone.style.padding = '20px';
    clone.style.boxSizing = 'border-box';
    
    // Apply a style to override any problematic colors
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      * {
        color-scheme: light !important;
      }
      [data-theme] {
        color-scheme: light !important;
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
      
      // Calculate PDF dimensions (A4)
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / pdfWidth;
      const canvasHeight = canvas.height / ratio;
      
      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, canvasHeight);
      
      // If content exceeds page height, create additional pages
      if (canvasHeight > pdfHeight) {
        let remainingHeight = canvasHeight;
        let position = -pdfHeight; // Starting position for the second page
        
        while (remainingHeight > pdfHeight) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, canvasHeight);
          remainingHeight -= pdfHeight;
          position -= pdfHeight;
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