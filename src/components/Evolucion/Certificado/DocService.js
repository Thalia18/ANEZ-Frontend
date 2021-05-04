import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html, paciente) => {
    savePDF(html, {
      paperSize: 'A4',
      fileName: `${paciente}.pdf`,
      landscape: false,
      margin: 10,
    });
  };
}

const Doc = new DocService();
export default Doc;
