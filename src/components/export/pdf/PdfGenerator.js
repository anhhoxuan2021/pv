import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { format } from 'date-fns';

// Define the PdfGenerator component
const PdfGenerator = () => {

    // Sample vendor data
    const vendorData = {
        vendorName: "Velavan B",
        vendorAddress: "14/203, Kallakulam, Seenapuram",
        vendorPinCode: "638057",
        contactPerson: "Santhosh D",
        contactPersonMobNo: "8993298712",
    }

    // Sample items data
    const itemsData = [
        { itemName: 'Water Tanks', quantity: "15", uom: "Liters", unitPrice: "1200", total: (15 * 1200).toString() },
        { itemName: 'Laptops', quantity: "5", uom: "Pieces", unitPrice: "25000", total: (5 * 25000).toString() },
        { itemName: 'Coffee Mugs', quantity: "50", uom: "Pieces", unitPrice: "50", total: (50 * 50).toString() },
        { itemName: 'Desk Chairs', quantity: "8", uom: "Pieces", unitPrice: "8000", total: (8 * 8000).toString() },
        { itemName: 'LED TVs', quantity: "3", uom: "Units", unitPrice: "30000", total: (3 * 30000).toString() },
        { itemName: 'Bookshelves', quantity: "2", uom: "Units", unitPrice: "5000", total: (2 * 5000).toString() },
        { itemName: 'Smartphones', quantity: "10", uom: "Pieces", unitPrice: "15000", total: (10 * 15000).toString() },
        { itemName: 'Desk Lamps', quantity: "20", uom: "Pieces", unitPrice: "100", total: (20 * 100).toString() },
        { itemName: 'Headphones', quantity: "25", uom: "Pairs", unitPrice: "500", total: (25 * 500).toString() },
        { itemName: 'Backpacks', quantity: "12", uom: "Pieces", unitPrice: "800", total: (12 * 800).toString() },
        { itemName: 'Fitness Trackers', quantity: "7", uom: "Pieces", unitPrice: "1200", total: (7 * 1200).toString() },
        { itemName: 'Digital Cameras', quantity: "4", uom: "Units", unitPrice: "15000", total: (4 * 15000).toString() },
        { itemName: 'Portable Speakers', quantity: "18", uom: "Pieces", unitPrice: "800", total: (18 * 800).toString() },
        { itemName: 'Sunglasses', quantity: "30", uom: "Pairs", unitPrice: "200", total: (30 * 200).toString() },
        { itemName: 'Running Shoes', quantity: "15", uom: "Pairs", unitPrice: "1000", total: (15 * 1000).toString() },
        { itemName: 'Gaming Consoles', quantity: "6", uom: "Units", unitPrice: "25000", total: (6 * 25000).toString() },
        { itemName: 'Wristwatches', quantity: "9", uom: "Pieces", unitPrice: "3000", total: (9 * 3000).toString() },
        { itemName: 'Power Banks', quantity: "20", uom: "Pieces", unitPrice: "500", total: (20 * 500).toString() },
        { itemName: 'Bluetooth Earbuds', quantity: "22", uom: "Pairs", unitPrice: "1000", total: (22 * 1000).toString() },
        { itemName: 'Home Printers', quantity: "3", uom: "Units", unitPrice: "8000", total: (3 * 8000).toString() },
    ];

    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Set document properties
    pdf.setProperties({
        title: "Request For Quotation"
    })

    // Add images and text to the PDF
    const callImage = "../../../images/icon/phone.jpg";
    const imageUrl = "./logo_1.jpg";
   
    pdf.addImage(imageUrl, 'JPEG', 10, 5, 40, 12);
    pdf.setFontSize(10);
    pdf.setFont('custom', 'bold');
    pdf.text('REQUEST FOR QUOTATION', 150, 12);

    // Line width in units (you can adjust this)
    pdf.setLineWidth(0.1);

    // Line color (RGB)
    pdf.setDrawColor(200, 200, 200);
    pdf.line(10, 18, 200, 18)
    pdf.text('Contact Person', 13, 23)
    pdf.setFont('custom', 'normal');
    pdf.text("Nithish Kumar CP", 13, 28)
    pdf.addImage(callImage, 'JPEG', 13, 29, 3, 3);
    pdf.text("9078382732", 16, 32)
    pdf.setFont('Newsreader', 'bold')
    pdf.text('RFQ No      :', 130, 23)
    pdf.text('RFQ Date   :', 130, 27)
    pdf.text('Due Date    :', 130, 31)
    pdf.setFont('Newsreader', 'normal')
    pdf.text("RFQ20240092", 155, 23)
    pdf.text(format(new Date(), 'MMM dd, yyyy'), 155, 27)
    pdf.text(format(new Date("2024-02-08 00:00:00.000 +0530"), 'MMM dd, yyyy'), 155, 31)
    pdf.line(10, 34, 200, 34)
    pdf.setFont('Newsreader', 'bold')
    pdf.text('To', 13, 39)
    pdf.setFont('Newsreader', 'bold')
    pdf.text('Purchase Centre Address :', 130, 39)
    pdf.setFont('Newsreader', 'normal')
    pdf.text('Head Office', 130, 44)
    pdf.text('CHENNAI', 130, 48)

    // Generate the vendor-specific content
    pdf.setFont('Newsreader', 'bold');
    pdf.text(`${vendorData?.vendorName}`, 13, 44);
    pdf.text(`${vendorData?.vendorAddress}`, 13, 48)
    pdf.setFont('Newsreader', 'normal');
    pdf.text(`P.O BOX : ${vendorData?.vendorPinCode}`, 13, 52);
    pdf.setFont('Newsreader', 'bold')
    pdf.text('Contact Person', 13, 56)
    pdf.setFont('Newsreader', 'normal')
    pdf.text(`${vendorData?.contactPerson}`, 13, 60);
    pdf.addImage(callImage, 'JPEG', 13, 61, 3, 3);
    pdf.text(`  ${vendorData?.contactPersonMobNo || "N/A"}`, 16, 64);
    pdf.setFont('Newsreader', 'bold')
    pdf.text('Dear Sir,', 13, 72)
    pdf.setFont('Newsreader', 'normal')
    pdf.text('Please send your most competitive offer/mentioning your Terms & Conditions before the due date. You can send the same to \nthe above mentioned e-mail/fax', 13, 79)
    pdf.setFont('Newsreader', 'normal')
    pdf.setFontSize(10);

    // Generate AutoTable for item details
    const itemDetailsRows = itemsData?.map((item, index) => [
        (index + 1).toString(),
        item.itemName.toString(),
        item.quantity?.toString(),
        item.uom?.toString(),
        item.total?.toLocaleString(),
    ]);
    const itemDetailsHeaders = ['S.No', 'Item Name', 'Quantity', 'UOM', 'Total'];
    const columnWidths = [15, 90, 30, 30, 23]; // Adjust column widths as needed
    // Define table styles
    const headerStyles = {
        fillColor: [240, 240, 240],
        textColor: [0],
        fontFamily: 'Newsreader',
        fontStyle: 'bold',
    };

    pdf.setFont('Newsreader');
    const itemDetailsYStart = 88;
    pdf.autoTable({
        head: [itemDetailsHeaders],
        body: itemDetailsRows,
        startY: itemDetailsYStart, // Adjust the Y position as needed
        headStyles: {
            fillColor: headerStyles.fillColor,
            textColor: headerStyles.textColor,
            fontStyle: headerStyles.fontStyle,
            fontSize: 10, // Adjust the font size as needed
            font: 'Newsreader', // Set the font family
            halign: 'left',
        },
        columnStyles: {
            0: { cellWidth: columnWidths[0] }, // Adjust column widths as needed
            1: { cellWidth: columnWidths[1] },
            2: { cellWidth: columnWidths[2] },
            3: { cellWidth: columnWidths[3] },
            4: { cellWidth: columnWidths[4] },
        },
        alternateRowStyles: { fillColor: [255, 255, 255] },
        bodyStyles: {
            fontSize: 10, // Adjust the font size for the body
            font: 'Newsreader', // Set the font family for the body
            cellPadding: { top: 1, right: 5, bottom: 1, left: 2 }, // Adjust cell padding
            textColor: [0, 0, 0], // Set text color for the body
            rowPageBreak: 'avoid', // Avoid row page breaks
        },
        margin: { top: 10, left: 13 },
    });

    // Add summary and page numbers
    const summaryYStart = pdf.internal.pageSize.getHeight() - 50;

    pdf.setFont('Newsreader', 'noraml')
    pdf.text('Thanking You,', 13, summaryYStart + 20)
    pdf.text('Yours Faithfully,', 13, summaryYStart + 24)
    pdf.text('For ', 13, summaryYStart + 28)
    pdf.setFont('Newsreader', 'bold')
    pdf.text('Aalam Info Solutions LLP', 19, summaryYStart + 28)

    const totalPages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        pdf.line(10, 283, 200, 283)
        pdf.setPage(i);
        pdf.setFont('Newsreader');
        pdf.text(
            `Page ${i} of ${totalPages}`,
            185,
            pdf.internal.pageSize.getHeight() - 5
        );
    }

    // Save the PDF 
    pdf.save(`RFQ.pdf`);

    // pdf open in a new tab
    const pdfDataUri = pdf.output('datauristring');
    const newTab = window.open();
    newTab?.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);

}

export default PdfGenerator