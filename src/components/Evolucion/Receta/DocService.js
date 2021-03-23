import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html) => {
    savePDF(html, {
      keepTogether: 'p',
      paperSize: 'A4',
      fileName: 'ANEZ.pdf',
      landscape: true,
      margin: 3,
    });
  };
}

const Doc = new DocService();
export default Doc;
