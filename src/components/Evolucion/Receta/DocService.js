import { savePDF } from '@progress/kendo-react-pdf';

class DocService {
  createPdf = (html, paciente) => {
    savePDF(html, {
      keepTogether: 'p',
      paperSize: 'A4',
      fileName: `${paciente}.pdf`,
      landscape: true,
      margin: 3,
    });
  };
}

const Doc = new DocService();
export default Doc;
