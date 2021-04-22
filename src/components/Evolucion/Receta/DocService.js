import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html, paciente) => {
    savePDF(html, {
      paperSize: 'auto',
      fileName: `${paciente}.pdf`,
      landscape: true,
      margin: 10,
    });
  };
}

const Doc = new DocService();
export default Doc;
