import { savePDF } from '@progress/kendo-react-pdf';

import Template from './RecetaTemplate';

class DocService {
  createPdf = (html) => {
    savePDF(html, {
      paperSize: 'A4',
      fileName: 'form.pdf',
      landscape: true,
      margin: 3,
    });
  };
}

const Doc = new DocService();
export default Doc;
