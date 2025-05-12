import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Constants for A4 paper dimensions
const A4_WIDTH_PX = 794; // A4 width at 96 DPI
const A4_HEIGHT_PX = 1123; // A4 height at 96 DPI (matches the preview page break)
const PAGE_MARGIN_SIDES = 20; // Left/right margins
const PAGE_MARGIN_TOP_FIRST_PAGE = 20; // Top margin for first page
const PAGE_MARGIN_TOP_OTHER_PAGES = 40; // Top margin for other pages
const PAGE_MARGIN_BOTTOM = 40; // Bottom margin

// Fixed page break positions - these should match the positions where pages would naturally break
const PAGE_BREAK_POSITIONS = [1120, 2240, 3360]; // Add more if needed

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
    
    // Remove the visual page break elements
    const pageBreakElements = clone.querySelectorAll('.page-break-divider');
    pageBreakElements.forEach(pageBreak => {
      pageBreak.parentNode?.removeChild(pageBreak);
    });
    
    // Set styles for proper PDF rendering - use original margins for the first page
    clone.style.width = `${A4_WIDTH_PX}px`;
    clone.style.padding = `${PAGE_MARGIN_TOP_FIRST_PAGE}px ${PAGE_MARGIN_SIDES}px ${PAGE_MARGIN_BOTTOM}px`;
    clone.style.boxSizing = 'border-box';
    clone.style.margin = '0 auto'; // Center the content
    
    // Apply a style to override any problematic colors and improve layout
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      * {
        color-scheme: light !important;
        font-family: Arial, sans-serif !important;
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
      h1, h2, h3, h4, h5, h6 {
        margin-top: 1em;
        margin-bottom: 0.5em;
        page-break-after: avoid;
      }
      section, div.mb-6 {
        page-break-inside: avoid;
      }
      ul, li {
        page-break-inside: avoid;
      }
    `;
    clone.appendChild(styleElement);
    
    // Temporarily append the clone to the DOM
    document.body.appendChild(clone);
    
    try {
      // Use jsPDF directly with html2canvas for each page to reduce file size and improve layout
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
        compress: true, // Enable compression to reduce file size
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const contentWidth = pdfWidth - (PAGE_MARGIN_SIDES * 2);
      
      // Function to capture a specific portion of the document
      const captureSection = async (startY: number, endY: number, isFirstPage: boolean = false) => {
        const sectionHeight = endY - startY;
        
        // Set up canvas options with lower scale to reduce file size
        const canvasOptions = {
          scale: 1.5, // Lower scale to reduce file size
          useCORS: true,
          backgroundColor: '#FFFFFF',
          logging: false,
          x: 0,
          y: startY,
          width: clone.offsetWidth,
          height: sectionHeight,
          windowWidth: clone.offsetWidth,
          windowHeight: clone.scrollHeight,
        };
        
        const canvas = await html2canvas(clone, canvasOptions);
        
        // Calculate dimensions to fit in PDF
        const imgData = canvas.toDataURL('image/jpeg', 0.95); // Use JPEG with 95% quality to reduce size
        const ratio = canvas.width / contentWidth;
        const scaledHeight = canvas.height / ratio;
        
        const topMargin = isFirstPage ? PAGE_MARGIN_TOP_FIRST_PAGE : PAGE_MARGIN_TOP_OTHER_PAGES;
        
        return {
          imgData,
          scaledHeight,
          topMargin
        };
      };
      
      // Process the first page (from 0 to first page break)
      const firstPage = await captureSection(0, PAGE_BREAK_POSITIONS[0], true);
      pdf.addImage(
        firstPage.imgData,
        'JPEG',
        PAGE_MARGIN_SIDES,
        firstPage.topMargin,
        contentWidth,
        firstPage.scaledHeight
      );
      
      // Process remaining pages
      for (let i = 1; i < PAGE_BREAK_POSITIONS.length; i++) {
        const startY = PAGE_BREAK_POSITIONS[i-1];
        const endY = PAGE_BREAK_POSITIONS[i];
        
        if (startY >= clone.scrollHeight) break;
        
        const endPos = Math.min(endY, clone.scrollHeight);
        const page = await captureSection(startY, endPos);
        
        pdf.addPage();
        pdf.addImage(
          page.imgData,
          'JPEG',
          PAGE_MARGIN_SIDES,
          page.topMargin,
          contentWidth,
          page.scaledHeight
        );
        
        // Break if we've reached the end of the content
        if (endPos >= clone.scrollHeight) break;
      }
      
      // Save the PDF with compression
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