const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        // Cargar el archivo index.html de cv-web
        const filePath = path.join(__dirname, 'cv-web', 'index.html');
        
        await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });
        
        // Esperar un poco más para asegurar que la imagen cargue si es necesario
        await new Promise(r => setTimeout(r, 1000));

        const pdfPath = path.join(__dirname, 'docs', 'CV_Juan_Alberto_Puente.pdf');
        
        await page.pdf({
            path: pdfPath,
            format: 'A4',
            printBackground: true,
            margin: { top: '0', bottom: '0', left: '0', right: '0' },
            scale: 0.8 // Escalar un poco para que quepa bien en una hoja
        });
        
        console.log('PDF generado exitosamente en:', pdfPath);
        await browser.close();
    } catch (err) {
        console.error('Error generando PDF:', err);
    }
})();
