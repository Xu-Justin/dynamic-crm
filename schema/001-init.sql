CREATE TABLE TBL_ORGANIZATION (
    ORGANIZATION_ID INT NOT NULL AUTO_INCREMENT,
    ORGANIZATION_NAME VARCHAR(255),
    REG_DT DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MDF_DT DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (ORGANIZATION_ID)
);

CREATE TABLE TBL_USER (
    USER_ID INT NOT NULL AUTO_INCREMENT,
    USER_NAME VARCHAR(255),
    USER_EMAIL VARCHAR(50),
    USER_PHONE_NUMBER VARCHAR(50),
    ORGANIZATION_ID INT NOT NULL,
    REG_DT DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MDF_DT DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (USER_ID),
    INDEX IDX_ORG_USER_ID (ORGANIZATION_ID, USER_ID)
);

CREATE TABLE TBL_ORGANIZATION_CUSTOM_FIELD (
    ORGANIZATION_ID INT NOT NULL,
    CUSTOM_FIELD_ID INT NOT NULL AUTO_INCREMENT,
    CUSTOM_FIELD_NAME VARCHAR(255) NOT NULL,
    CUSTOM_FIELD_TYPE VARCHAR(255) NOT NULL,
    REG_DT DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MDF_DT DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (CUSTOM_FIELD_ID),
    INDEX IDX_ORG_CUSTOM_FIELD_ID (ORGANIZATION_ID, CUSTOM_FIELD_ID)
);

CREATE TABLE TBL_USER_CUSTOM_FIELD (
    USER_ID INT NOT NULL,
    CUSTOM_FIELD_ID INT NOT NULL,
    CUSTOM_FIELD_VALUE TEXT,
    REG_DT DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    MDF_DT DATETIME NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (USER_ID, CUSTOM_FIELD_ID)
);
