package com.example.demo.service;


import com.example.demo.Repositories.*;
import com.example.demo.model.constant.Footer;
import com.example.demo.model.constant.Header;
import com.example.demo.model.profile.Language;
import com.example.demo.model.profile.UserProfile;
import com.example.demo.model.projects.Description;
import com.example.demo.model.projects.Project;
import com.example.demo.model.skills.Knowledge;
import com.example.demo.model.skills.Products;
import com.example.demo.model.skills.Programming;
import com.example.demo.model.skills.Standards;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.*;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component("pdfGenerator")
public class PdfGenerator {

    @Value("${pdfDir}")
    private String pdfDir;

    @Value("${logoImgPath}")
    private String logoImgPath;

    @Value("${logoImgScale}")
    private Float[] logoImgScale;

    @Value("${reportFileNameDateFormat}")
    private String reportFileNameDateFormat;


    @Autowired
    private UserProfileRepo userProfileRepo;

    @Autowired
    private FooterRepo footerRepo;

    @Autowired
    private HeaderRepo headerRepo;

    @Autowired
    private ProjectRepo project;


    float height = 0f;
    int counter=0;
    float yPos = 700f;
    float lastCellHeight ;
    String fileSequenceNum = "001";
    int numOfProccess = 0;
    // importing the needed fonts and colors for the design
    private static final BaseColor lightGrey = new BaseColor(242,242,242);
    private static final BaseColor darkerOrange = new BaseColor(240, 125, 25);
    private static final String Font1 = "resources/fonts/Cambria-Font-For-Windows.ttf";
    private static final String Font2 = "resources/fonts/Tahoma Regular font.ttf";
    private static final String Font3 = "resources/fonts/LucidaSansRegular.ttf";
    private static final String Font4 = "resources/fonts/lucidasansdemibold.ttf";
    private static final Font Cambria_Big = FontFactory.getFont(Font1,20,Font.BOLD,BaseColor.BLACK);
    private static final Font Cambria = FontFactory.getFont(Font1,14 ,Font.BOLD ,BaseColor.BLACK);
    private static final Font Tahoma_Footer = FontFactory.getFont(Font2,7 ,Font.BOLD ,darkerOrange);
    private static final Font Tahoma_Header = FontFactory.getFont(Font2,7.5f ,Font.BOLD ,darkerOrange);
    private static final String Smaller_Line = "\u2013";
    private static final String Small_Line = "―";
    private static final Font Lucid_Regular = FontFactory.getFont(Font3,10 ,BaseColor.BLACK);
    private static final Font Lucid_Bold = FontFactory.getFont(Font4,10 ,Font.BOLD,BaseColor.BLACK);
    private static final Font Colored_Line = FontFactory.getFont(Smaller_Line,10 ,BaseColor.GRAY.brighter());
    private static final String Bullet_List = "\u2022";

    public void generatePdfReport(Long id) {

        Document document = new Document(PageSize.A4);

        try {

            PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(getPdfNameWithDate(id)));

            document.open();
            addLogo(document, writer);
            addDocTitle(document, id);
            addFooter(document, writer);
            addBasicData(document, writer, id);
            addSkills(document, writer, id);
            addProject(document, writer, id);
            document.close();
            resetValues();

            System.out.println("------------------Your PDF Resume is ready!-------------------------");

        } catch (FileNotFoundException | DocumentException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
// reset values after generating the PDF
    private void resetValues() {
        this.yPos = 700f;
        this.height = 0.0f;
        this.numOfProccess=0;
    }
// set the header of the first page
    private void addLogo(Document document ,PdfWriter writer) {
            Header header=headerRepo.findById(1L).get();
        try {
            Image img = Image.getInstance(logoImgPath);
            img.scalePercent(logoImgScale[0], logoImgScale[1]);
            img.setAlignment(Element.ALIGN_RIGHT);
            document.add(img);
            PdfPTable table = new PdfPTable(1);
            table.setTotalWidth(document.right(document.rightMargin())-document.left(document.leftMargin()));
            table.addCell(getCell( header.getCompanyName() + "   " + header.getStreet() + "   " + header.getZipCode() + "  " + header.getCity()
                    ,Tahoma_Header ));
            table.writeSelectedRows(0,1,document.left(document.leftMargin()),table.getTotalHeight()+document.top(document.topMargin()),writer.getDirectContent());

        } catch (DocumentException | IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }
// create the header of other pages and allign them by using PDFTable
    private void addHeader(Document document, PdfWriter writer){
        Header header=headerRepo.findById(1L).get();
        PdfPTable table = new PdfPTable(1);
        table.setTotalWidth(document.right(document.rightMargin())-document.left(document.leftMargin()));
        table.addCell(getCell( header.getCompanyName() + "   " + header.getStreet() + "   " + header.getZipCode() + "  " + header.getCity()
                ,Tahoma_Header ));
        table.writeSelectedRows(0,1,document.left(document.leftMargin()),table.getTotalHeight()+document.top(document.topMargin()),writer.getDirectContent());

    }

    private void addDocTitle(Document document, Long id) throws DocumentException {
        UserProfile user= userProfileRepo.findById(id).get();
        try {
        Paragraph p1 = new Paragraph();
        leaveEmptyLine(p1, 5);
        p1.add(new Paragraph(Smaller_Line,Colored_Line));
        leaveEmptyLine(p1, 5);
        p1.add(new Paragraph("  Profile", Cambria));
        p1.setAlignment(Element.ALIGN_LEFT);
        leaveEmptyLine(p1, 1);
        p1.add(new Paragraph(   Small_Line +" "+ user.getFirstName() + " " + user.getLastName(), Cambria_Big));
        leaveEmptyLine(p1, 5);
        p1.add(new Paragraph(Smaller_Line,Colored_Line));
        document.add(p1);
        leaveEmptyLine(p1, 20);
        Image img = Image.getInstance(user.getPhoto());
        img.scaleToFit(250, 200);
        img.setAbsolutePosition(400,300);
        document.add(img);
    } catch (DocumentException | IOException e) {
        // TODO Auto-generated catch block
        e.printStackTrace();
    }
    }
// adding the basic data on first page and customize the look of the table to match the company theme
    private void addBasicData(Document document, PdfWriter writer, Long id) throws DocumentException {
        UserProfile userProfile = userProfileRepo.findById(id).get();
        PdfPTable table = new PdfPTable(2);
        float [] columnWidth={1,3};
        table.setTotalWidth(columnWidth);
        table.setTotalWidth(document.right(document.rightMargin()) - document.left(document.leftMargin()));
        PdfPCell cell = new PdfPCell();
        PdfPCell cell2 = new PdfPCell();
        Paragraph p1 = new Paragraph();
        p1 = new Paragraph("Education", Lucid_Bold);
        p1.setAlignment(Element.ALIGN_LEFT);
        cell.addElement(p1);
        p1 = new Paragraph(userProfile.getEducation() + "\n", Lucid_Regular);
        p1.setAlignment(Element.ALIGN_LEFT);
        cell2.addElement(p1);
        p1 = new Paragraph("Year Of Birth", Lucid_Bold);
        p1.setAlignment(Element.ALIGN_LEFT);
        cell.addElement(p1);
        p1 = new Paragraph(userProfile.getYearOfBirth() + "\n", Lucid_Regular);
        p1.setAlignment(Element.ALIGN_LEFT);
        cell2.addElement(p1);
        p1 = new Paragraph("Nationality", Lucid_Bold);
        p1.setAlignment(Element.ALIGN_LEFT);
        cell.addElement(p1);
        p1 = new Paragraph(userProfile.getNationality() + "\n", Lucid_Regular);
        p1.setAlignment(Element.ALIGN_LEFT);
        cell2.addElement(p1);
        p1 = new Paragraph("Languages", Lucid_Bold);
        p1.setAlignment(Element.ALIGN_LEFT);
        cell.addElement(p1);
        PdfPTable table1=new PdfPTable(userProfile.getLanguages().size());
        table1.setWidthPercentage(100);
        if (userProfile.getLanguages().size() != 0) {
            for (Language languageList : userProfile.getLanguages()) {
                table1.addCell(BasicCell(   languageList.getLanguage() + "(" + languageList.getProficiency() + ")" + ",",PdfPCell.ALIGN_LEFT));

            }

            cell2.addElement(table1);
        }
        cell.setUseVariableBorders(true);
        cell.setBorderColorTop(lightGrey);
        cell.setBorderColorBottom(lightGrey);
        cell.setBorderColorLeft(lightGrey);
        cell.setBorderColorRight(lightGrey);
        cell.setBackgroundColor(lightGrey);
        cell.setUseBorderPadding(true);
        cell.setBorderWidthTop(8);
        cell.setBorderWidthBottom(8);
        cell2.setBorder(Rectangle.BOTTOM| Rectangle.LEFT| Rectangle.TOP);
        cell2.setUseBorderPadding(true);
        cell2.setBorderWidthTop(8);
        cell2.setBorderColorTop(lightGrey);
        cell2.setBorderColorLeft(lightGrey);
        cell2.setBorderWidthLeft(8);
        cell2.setBorderWidthBottom(8);
        cell2.setBorderColorBottom(lightGrey);
        cell2.setBackgroundColor(BaseColor.WHITE);
        table.addCell(cell);
        table.addCell(cell2);
        table.writeSelectedRows(0, -1, 50, 230,writer.getDirectContent() ); // after testing this is the suitable Xpos,Ypos
    }

    //adding footer for the pages
    private void addFooter(Document document, PdfWriter writer) throws DocumentException {

        Footer footer=footerRepo.findById(1L).get();
        PdfPTable table = new PdfPTable(4);
        table.setTotalWidth(document.right(document.rightMargin())-document.left(document.leftMargin()));
        table.addCell(getCell(footer.getCompanyName() + "\n" +footer.getStreet() + "\n" + footer.getZip() + " " + footer.getCity() + "\n" + "\n" + footer.getWebsite()
                ,Tahoma_Footer ));
        table.addCell(getCell("Telefon:" +" " +footer.getTelephone() + "\n" + "Telefax:" + " " + footer.getFax() + "\n" + footer.getEmail(),Tahoma_Footer));
        table.addCell(getCell("Amtsgericht:"+ footer.getCompanyLocalCourt() + ";"+ "\n" + "Sitz:" + footer.getRegisteredOffice() + "\n" + "Umsatzsteuer-Id:" + footer.getSalesTaxId() + "\n" + footer.getBank() + "\n" + "IBAN:" + footer.getIban(),
                Tahoma_Footer ));
        table.addCell(getCell("Persönlich haftende Gesellschafterin:"+ "\n" + footer.getPartner() + "\n" +"Amtsgericht:" + footer.getPartnerLocalCourt() + ";" + "\n" + "Sitz:" + footer.getRegisteredOffice() + "\n" + "Geschäftsführer: " + footer.getDirector()
                ,Tahoma_Footer));
        table.writeSelectedRows(0,-1,document.left(document.leftMargin()),table.getTotalHeight()+document.bottom(document.bottomMargin()),writer.getDirectContent());
    }

    private void addSkills(Document document, PdfWriter writer, Long id) throws DocumentException {
        document.newPage();
        addHeader(document, writer);
        addFooter(document, writer);
        Paragraph p1 = new Paragraph();
        leaveEmptyLine(p1,4);
        p1.add(new Paragraph("  Skills", Cambria));
        p1.setAlignment(Element.ALIGN_LEFT);
        document.add(p1);
        UserProfile userProfile = userProfileRepo.findById(id).get();
        PdfPTable table = new PdfPTable(2);
        float [] columnWidth={3,10};
        table.setTotalWidth(columnWidth);
        table.setTotalWidth(document.right(document.rightMargin()) - document.left(document.leftMargin()));
        PdfPCell cell = new PdfPCell();
        PdfPCell cell2 = new PdfPCell();
        p1 = new Paragraph("Products", Lucid_Bold);
        p1.setAlignment(Element.ALIGN_LEFT);
        cell.addElement(p1);
        leaveEmptyLine(p1,userProfile.getProducts().size());
        if (userProfile.getProducts().size() != 0) {
            for (Products productList : userProfile.getProducts()) {
                p1 = new Paragraph(productList.getProductName(),Lucid_Regular);
                p1.setAlignment(Element.ALIGN_LEFT);
                cell2.setPaddingLeft(10);
                cell2.addElement(p1);
            }

        }

        p1 = new Paragraph("Programming and \n scripting languages", Lucid_Bold);
        p1.setAlignment(Element.ALIGN_LEFT);
        cell.addElement(p1);
        leaveEmptyLine(p1,userProfile.getProgrammings().size()-1);
        if (userProfile.getProgrammings().size() != 0) {
            for (Programming programmingList : userProfile.getProgrammings()) {
                p1 = new Paragraph(programmingList.getLanguageName(),Lucid_Regular);
                p1.setAlignment(Element.ALIGN_LEFT);
                cell2.setPaddingLeft(10);
                cell2.addElement(p1);
            }
        }

        p1 = new Paragraph("Standards", Lucid_Bold);
        p1.setAlignment(Element.ALIGN_LEFT);
        cell.addElement(p1);
        leaveEmptyLine(p1,userProfile.getStandards().size());
        if (userProfile.getStandards().size() != 0) {
            for (Standards standardList : userProfile.getStandards()) {
                p1 = new Paragraph(standardList.getStandard(),Lucid_Regular);
                p1.setAlignment(Element.ALIGN_LEFT);
                cell2.setPaddingLeft(10);
                cell2.addElement(p1);
            }

        }
        p1 = new Paragraph("Knowledge", Lucid_Bold);
        p1.setAlignment(Element.ALIGN_LEFT);
        cell.addElement(p1);
        leaveEmptyLine(p1,userProfile.getKnowledges().size());
        if (userProfile.getKnowledges().size() != 0) {
            for (Knowledge knowledgelist : userProfile.getKnowledges()) {
                p1 = new Paragraph(knowledgelist.getKnowledge(),Lucid_Regular);
                p1.setAlignment(Element.ALIGN_LEFT);
                cell2.setPaddingLeft(10);
                cell2.addElement(p1);
            }
        }
        cell.setUseVariableBorders(true);
        cell.setBorderColorTop(lightGrey);
        cell.setBorderColorBottom(lightGrey);
        cell.setBorderColorLeft(lightGrey);
        cell.setBorderColorRight(lightGrey);
        cell.setBackgroundColor(lightGrey);
        cell.setUseBorderPadding(true);
        cell.setBorderWidthTop(2);
        cell.setBorderWidthBottom(8);
        cell2.setBorder(Rectangle.BOTTOM| Rectangle.LEFT);
        cell2.setUseBorderPadding(true);
        cell2.setBorderColorLeft(lightGrey);
        cell2.setBorderWidthLeft(8);
        cell2.setBorderWidthBottom(8);
        cell2.setBorderColorBottom(lightGrey);
        cell2.setBackgroundColor(BaseColor.WHITE);
        table.addCell(cell);
        table.addCell(cell2);
        table.writeSelectedRows(0, 1, 50,700f ,writer.getDirectContent() );

    }

    //call sortingProjects function to sort the projects from the newest and then calling generateProjectTable function to generate each project on separates table
    private void addProject(Document document, PdfWriter writer, Long id) throws DocumentException {
        document.newPage();
        addHeader(document, writer);
        addFooter(document, writer);
        Paragraph p1 = new Paragraph();
        leaveEmptyLine(p1,4);
        p1.add(new Paragraph("  Projects", Cambria));
        p1.setAlignment(Element.ALIGN_LEFT);
        document.add(p1);
        UserProfile userProfile = userProfileRepo.findById(id).get();
        List<Project> sortedProjects = sortingProjects(id);
        if (userProfile.getProjects().size() != 0) {
            for (Project project:sortedProjects) {
                generateProjectTable(document, writer , project.getId(),userProfile.getProjects().size());
            }
        }

    }
// create a custom sorter to sort the projects based on the endDate,
// if endDate same then compare the startDate from the newest project
// after sorting all projects it returns them to addProject Function
    private List<Project> sortingProjects(Long id){
        UserProfile userProfile = userProfileRepo.findById(id).get();
        List<Project> projects = userProfile.getProjects().stream().sorted(new Comparator<>() {
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("MM/yy");
            LocalDateTime now = LocalDateTime.now();
            String today = dtf.format(now);
            YearMonth formatter1;
            YearMonth formatter;

            @Override
            public int compare(Project o1, Project o2) {
                if (Objects.equals(o1.getEndDate(), "today") && Objects.equals(o2.getEndDate(), "today")) {

                    formatter = YearMonth.parse(o2.getStartDate(), dtf);
                    formatter1 = YearMonth.parse(o1.getStartDate(), dtf);
                    return formatter.compareTo(formatter1);

                } else if (Objects.equals(o2.getEndDate(), "today") && !Objects.equals(o1.getEndDate(), "today")) {

                    formatter = YearMonth.parse(today, dtf);
                    formatter1 = YearMonth.parse(o1.getStartDate(), dtf);
                    return formatter.compareTo(formatter1);

                } else if (Objects.equals(o1.getEndDate(), "today") && !Objects.equals(o2.getEndDate(), "today")) {

                    formatter = YearMonth.parse(today, dtf);
                    formatter1 = YearMonth.parse(o1.getStartDate(), dtf);
                    return formatter1.compareTo(formatter);

                } else if (Objects.equals(o1.getEndDate(), o2.getEndDate())) {

                    formatter = YearMonth.parse(o2.getStartDate(), dtf);
                    formatter1 = YearMonth.parse(o1.getStartDate(), dtf);
                    return formatter.compareTo(formatter1);

                } else {

                    formatter = YearMonth.parse(o2.getStartDate(), dtf);
                    formatter1 = YearMonth.parse(o1.getStartDate(), dtf);
                    return formatter.compareTo(formatter1);
                }
            }
        }).collect(Collectors.toList());
        return projects;
    }
// numOfProccess: counts the number of projects generated and compare it with iterator to prevent creating empty page after finishing tables

    public void generateProjectTable(Document document , PdfWriter writer , Long id, int iterator) throws DocumentException {
            numOfProccess++;
            PdfPTable table = new PdfPTable(2);
            float[] columnWidth = {3, 10};
            table.setTotalWidth(columnWidth);
            table.setTotalWidth(document.right(document.rightMargin()) - document.left(document.leftMargin()));
            Project project1 = project.findById(id).get();
            Paragraph p1;
            PdfPCell cell = new PdfPCell();
            PdfPCell cell2 = new PdfPCell();
            p1 = new Paragraph(project1.getStartDate() + '-' + project1.getEndDate(), Lucid_Bold);
            p1.setAlignment(Element.ALIGN_LEFT);
            cell.setPaddingTop(-0.8f);
            cell.addElement(p1);
            leaveEmptyLine(p1, 1);
            p1 = new Paragraph(project1.getProjectTitle(), Lucid_Bold);
            p1.setAlignment(Element.ALIGN_LEFT);
            cell2.setPaddingTop(-15);
            cell2.addElement(p1);
            leaveEmptyLine(p1, 1);
            p1 = new Paragraph("Position\n", Lucid_Bold);
            p1.setAlignment(Element.ALIGN_LEFT);
            cell.addElement(p1);
            p1 = new Paragraph(project1.getProjectPosition(), Lucid_Regular);
            p1.setAlignment(Element.ALIGN_LEFT);
            cell2.addElement(p1);
            p1 = new Paragraph("Description", Lucid_Bold);
            p1.setAlignment(Element.ALIGN_LEFT);
            cell.addElement(p1);
            float cell_width = table.getTotalWidth() - cell.getWidth() - document.left(document.leftMargin()) - 39;
            for (Description d : project1.getDescriptions()) {
                Chunk p = new Chunk("  " + Bullet_List + "   " + d.getProjectDescription(), Lucid_Regular);
                //calculate cell width and textWidth to check if the text needed extra line and increment
                // counter to add extra spaces to align the content of the table dynamically
                float textWidth = p.getWidthPoint();
                if (textWidth > cell_width)
                    counter++;
            }

            leaveEmptyLine(p1, project1.getDescriptions().size() + counter);
            counter = 0;
            if (project1.getDescriptions().size() != 0) {
                for (Description descriptionList : project1.getDescriptions()) {
                    p1 = new Paragraph("  " + Bullet_List + "   " + descriptionList.getProjectDescription(), Lucid_Regular);
                    p1.setAlignment(Element.ALIGN_LEFT);
                    cell2.setPaddingLeft(10);
                    cell2.addElement(p1);
                }
            }
            p1 = new Paragraph("Technologies", Lucid_Bold);
            p1.setAlignment(Element.ALIGN_LEFT);
            cell.setPaddingBottom(-1.2f);
            cell.addElement(p1);

            p1 = new Paragraph(project1.getTechnologies(), Lucid_Regular);
            p1.setAlignment(Element.ALIGN_LEFT);
            cell2.setPaddingBottom(-40f);
            cell2.addElement(p1);
            cell.setUseVariableBorders(true);
            cell.setBorderColorTop(lightGrey);
            cell.setBorderColorBottom(lightGrey);
            cell.setBorderColorLeft(lightGrey);
            cell.setBorderColorRight(lightGrey);
            cell.setBackgroundColor(lightGrey);
            cell.setUseBorderPadding(true);
            cell.setBorderWidthBottom(8);
            cell2.setBorder(Rectangle.BOTTOM | Rectangle.LEFT | Rectangle.TOP);
            cell2.setUseBorderPadding(true);
            cell2.setBorderWidthTop(15);
            cell2.setBorderColorTop(lightGrey);
            cell2.setBorderColorLeft(lightGrey);
            cell2.setBorderWidthLeft(8);
            cell2.setBorderWidthBottom(15);
            cell2.setBorderColorBottom(lightGrey);
            cell2.setBackgroundColor(BaseColor.WHITE);
            table.addCell(cell);
            table.addCell(cell2);
            table.setKeepTogether(true);
            yPos = 700f - height; // after generating each table , it calculates Ypos to prevent it from collapsing with each other,
        // and if needed it open a new page and then continue generating the rest of tables

            if (yPos <= 148.0) {
                document.newPage();
                addHeader(document, writer);
                addFooter(document, writer);
                height = 0.0f;
                yPos = 700f - height;
            }

// get the position of each generated table bottom border and check if there is enough space to generate the next table
            lastCellHeight = table.writeSelectedRows(0, 1, 50, yPos, writer.getDirectContent());
            height += table.getTotalHeight() + 30f;

            if (numOfProccess==iterator){
                lastCellHeight=700f;
            }
            if (lastCellHeight - 118.0 <= 300){
                document.newPage();
                addHeader(document, writer);
                addFooter(document, writer);
                height = 0.0f;
                yPos = 700f - height;
            }


}

    public PdfPCell getCell(String text,Font font) {
        Paragraph p1;
        PdfPCell cell = new PdfPCell(p1= new Paragraph(text,font));
        p1.setExtraParagraphSpace(2);
        cell.setPaddingLeft(-15);
        p1.setAlignment(Element.ALIGN_LEFT);
        cell.setBorder(PdfPCell.NO_BORDER);
        return cell;
    }

    public PdfPCell BasicCell(String text, int alignment ) {
        Paragraph p1;
        PdfPCell cell = new PdfPCell(p1=new Paragraph(text,Lucid_Regular));
        p1.setAlignment(Element.ALIGN_JUSTIFIED_ALL);
        cell.setHorizontalAlignment(alignment);
        cell.setPaddingLeft(0);
        cell.setBorder(PdfPCell.NO_BORDER);
        return cell;
    }


    private static void leaveEmptyLine(Paragraph paragraph, int number) {
        for (int i = 0; i < number; i++) {
            paragraph.add(new Paragraph(" "));
        }
    }

// check if the generated Pdf already exist with the same name in directory,
// if true then it will give it a sequence of fileName(001) and increment it each time it have the same name for (updating the pdf data)
    private boolean checkFileExist(String name){
        File file = new File(name);
        return file.exists();

    }

    private String getPdfNameWithDate(Long id) {
        UserProfile user = userProfileRepo.findById(id).get();
        String localDateString = LocalDateTime.now().format(DateTimeFormatter.ofPattern(reportFileNameDateFormat));
        String fileName =  pdfDir + user.getFirstName() + "_" + user.getLastName() + "_" + localDateString + ".pdf";
        boolean check = checkFileExist(fileName);
        if (check){
            fileName = pdfDir + user.getFirstName() + "_" + user.getLastName() + "(" + fileSequenceNum +")"+ localDateString + ".pdf";
           int counter = Integer.parseInt(fileSequenceNum) +1;
           fileSequenceNum = String.valueOf(counter);
            return fileName;
        }
        else {
            return fileName;
        }
   }

}
