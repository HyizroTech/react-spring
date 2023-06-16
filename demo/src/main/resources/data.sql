INSERT INTO Header (header_Id,COMPANY_NAME,STREET,ZIP_CODE,CITY) VALUES
            (1L,'Rockware GmbH & Co. KG','Ammerthalstr.27','85551','Kirchheim');

INSERT INTO Footer (footer_Id,COMPANY_NAME,STREET,ZIP,CITY,WEBSITE,TELEPHONE,FAX,EMAIL,
                    Company_Local_Court,REGISTERED_OFFICE,SALES_TAX_ID ,BANK,IBAN,PARTNER,DIRECTOR,Partner_Local_Court) VALUES
(1L,'Rockware GmbH & Co. KG','Ammerthalstr. 27','85551','Kirchheim','www.rockware.de','+49 89 7201 7912','+49 8121 250704 2'
,'info@rockware.de','Registergericht München HRA 103323','München','DE 248 459 018','VR Bank Munich Country','DE23701664860007131003'
,'Rockware Verwaltung GmbH','Oliver Gebert Sebastian Stein',' München HRB 216271');

INSERT INTO roles(name) VALUES('ROLE_USER');
INSERT INTO roles(name) VALUES('ROLE_ADMIN');