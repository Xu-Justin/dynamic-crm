-- Insert organizations
INSERT INTO TBL_ORGANIZATION (ORGANIZATION_NAME)
VALUES ('Acme Inc.'), ('Blue Sky Inc.');

-- Insert custom fields for Acme Inc.
INSERT INTO TBL_ORGANIZATION_CUSTOM_FIELD (ORGANIZATION_ID, CUSTOM_FIELD_NAME, CUSTOM_FIELD_TYPE)
VALUES
((SELECT ORGANIZATION_ID FROM TBL_ORGANIZATION WHERE ORGANIZATION_NAME = 'Acme Inc.'), 'Date of Birth', 'DATE'),
((SELECT ORGANIZATION_ID FROM TBL_ORGANIZATION WHERE ORGANIZATION_NAME = 'Acme Inc.'), 'GENDER', 'GENDER');

-- Insert custom fields for Blue Sky Inc.
INSERT INTO TBL_ORGANIZATION_CUSTOM_FIELD (ORGANIZATION_ID, CUSTOM_FIELD_NAME, CUSTOM_FIELD_TYPE)
VALUES
((SELECT ORGANIZATION_ID FROM TBL_ORGANIZATION WHERE ORGANIZATION_NAME = 'Blue Sky Inc.'), 'Instagram Handler', 'TEXT'),
((SELECT ORGANIZATION_ID FROM TBL_ORGANIZATION WHERE ORGANIZATION_NAME = 'Blue Sky Inc.'), 'Subscription Level', 'NUMBER');

-- Insert users for Acme Inc.
INSERT INTO TBL_CUSTOMER (CUSTOMER_NAME, CUSTOMER_EMAIL, CUSTOMER_PHONE_NUMBER, ORGANIZATION_ID)
VALUES
('John Doe', 'john.doe@acme.com', '123-456-7890', (SELECT ORGANIZATION_ID FROM TBL_ORGANIZATION WHERE ORGANIZATION_NAME = 'Acme Inc.')),
('Jane Smith', 'jane.smith@acme.com', '098-765-4321', (SELECT ORGANIZATION_ID FROM TBL_ORGANIZATION WHERE ORGANIZATION_NAME = 'Acme Inc.'));

-- Insert users for Blue Sky Inc.
INSERT INTO TBL_CUSTOMER (CUSTOMER_NAME, CUSTOMER_EMAIL, CUSTOMER_PHONE_NUMBER, ORGANIZATION_ID)
VALUES
('Alice Johnson', 'alice.johnson@bluesky.com', '555-111-2222', (SELECT ORGANIZATION_ID FROM TBL_ORGANIZATION WHERE ORGANIZATION_NAME = 'Blue Sky Inc.')),
('Bob Lee', 'bob.lee@bluesky.com', '555-333-4444', (SELECT ORGANIZATION_ID FROM TBL_ORGANIZATION WHERE ORGANIZATION_NAME = 'Blue Sky Inc.'));

-- Insert user custom field values for Acme Inc.
INSERT INTO TBL_CUSTOMER_CUSTOM_FIELD (CUSTOMER_ID, CUSTOM_FIELD_ID, CUSTOM_FIELD_VALUE)
VALUES
((SELECT CUSTOMER_ID FROM TBL_CUSTOMER WHERE CUSTOMER_EMAIL = 'john.doe@acme.com'),
 (SELECT CUSTOM_FIELD_ID FROM TBL_ORGANIZATION_CUSTOM_FIELD WHERE CUSTOM_FIELD_NAME = 'Date of Birth' AND ORGANIZATION_ID = (SELECT ORGANIZATION_ID FROM TBL_ORGANIZATION WHERE ORGANIZATION_NAME = 'Acme Inc.')),
 '1990-01-01'),
((SELECT CUSTOMER_ID FROM TBL_CUSTOMER WHERE CUSTOMER_EMAIL = 'john.doe@acme.com'),
 (SELECT CUSTOM_FIELD_ID FROM TBL_ORGANIZATION_CUSTOM_FIELD WHERE CUSTOM_FIELD_NAME = 'GENDER' AND ORGANIZATION_ID = (SELECT ORGANIZATION_ID FROM TBL_ORGANIZATION WHERE ORGANIZATION_NAME = 'Acme Inc.')),
 'Male'),
((SELECT CUSTOMER_ID FROM TBL_CUSTOMER WHERE CUSTOMER_EMAIL = 'jane.smith@acme.com'),
 (SELECT CUSTOM_FIELD_ID FROM TBL_ORGANIZATION_CUSTOM_FIELD WHERE CUSTOM_FIELD_NAME = 'Date of Birth' AND ORGANIZATION_ID = (SELECT ORGANIZATION_ID FROM TBL_ORGANIZATION WHERE ORGANIZATION_NAME = 'Acme Inc.')),
 '1985-05-15'),
((SELECT CUSTOMER_ID FROM TBL_CUSTOMER WHERE CUSTOMER_EMAIL = 'jane.smith@acme.com'),
 (SELECT CUSTOM_FIELD_ID FROM TBL_ORGANIZATION_CUSTOM_FIELD WHERE CUSTOM_FIELD_NAME = 'GENDER' AND ORGANIZATION_ID = (SELECT ORGANIZATION_ID FROM TBL_ORGANIZATION WHERE ORGANIZATION_NAME = 'Acme Inc.')),
 'Female');

-- Insert user custom field values for Blue Sky Inc.
INSERT INTO TBL_CUSTOMER_CUSTOM_FIELD (CUSTOMER_ID, CUSTOM_FIELD_ID, CUSTOM_FIELD_VALUE)
VALUES
((SELECT CUSTOMER_ID FROM TBL_CUSTOMER WHERE CUSTOMER_EMAIL = 'alice.johnson@bluesky.com'),
 (SELECT CUSTOM_FIELD_ID FROM TBL_ORGANIZATION_CUSTOM_FIELD WHERE CUSTOM_FIELD_NAME = 'Instagram Handler' AND ORGANIZATION_ID = (SELECT ORGANIZATION_ID FROM TBL_ORGANIZATION WHERE ORGANIZATION_NAME = 'Blue Sky Inc.')),
 '@alice_johnson'),
((SELECT CUSTOMER_ID FROM TBL_CUSTOMER WHERE CUSTOMER_EMAIL = 'alice.johnson@bluesky.com'),
 (SELECT CUSTOM_FIELD_ID FROM TBL_ORGANIZATION_CUSTOM_FIELD WHERE CUSTOM_FIELD_NAME = 'Subscription Level' AND ORGANIZATION_ID = (SELECT ORGANIZATION_ID FROM TBL_ORGANIZATION WHERE ORGANIZATION_NAME = 'Blue Sky Inc.')),
 '2'),
((SELECT CUSTOMER_ID FROM TBL_CUSTOMER WHERE CUSTOMER_EMAIL = 'bob.lee@bluesky.com'),
 (SELECT CUSTOM_FIELD_ID FROM TBL_ORGANIZATION_CUSTOM_FIELD WHERE CUSTOM_FIELD_NAME = 'Instagram Handler' AND ORGANIZATION_ID = (SELECT ORGANIZATION_ID FROM TBL_ORGANIZATION WHERE ORGANIZATION_NAME = 'Blue Sky Inc.')),
 '@bob_lee'),
((SELECT CUSTOMER_ID FROM TBL_CUSTOMER WHERE CUSTOMER_EMAIL = 'bob.lee@bluesky.com'),
 (SELECT CUSTOM_FIELD_ID FROM TBL_ORGANIZATION_CUSTOM_FIELD WHERE CUSTOM_FIELD_NAME = 'Subscription Level' AND ORGANIZATION_ID = (SELECT ORGANIZATION_ID FROM TBL_ORGANIZATION WHERE ORGANIZATION_NAME = 'Blue Sky Inc.')),
 '1');
