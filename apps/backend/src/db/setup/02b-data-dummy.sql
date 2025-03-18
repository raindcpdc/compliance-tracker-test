-- Dummy data

-- begin; --uncomment if running with rollback
INSERT INTO "public"."learning_resource"
            ("type_id",
             "name",
             "url",
             "description",
             "deadline_at",
             "is_mandatory",
             "is_active",
             "created_at")
VALUES      ('2',
             'Ethics, Integrity and Sexual Harassment Training',
             'www.abc.com',
             'Classroom type training',
             '2024-12-31 15:55:00+00',
             'true',
             'true',
             ( Now() AT TIME zone 'utc' :: text )),
            ('1',
             'DCPDC Privacy Policy 2024',
             'www.abc.com',
             'Online video',
             '2024-12-31 04:55:00+00',
             'true',
             'true',
             ( Now() AT TIME zone 'utc' :: text )),
            ('1',
             '2024 Global Anti-Corruption and Financial Crime Compliance Refresher',
             'www.abc.com',
             'Online video',
             '2024-12-31 04:55:00+00',
             'true',
             'true',
             ( Now() AT TIME zone 'utc' :: text )),
            ('3',
             'Next.js Conference',
             'www.abc.com',
             'Online conference',
             NULL,
             'false',
             'true',
             ( Now() AT TIME zone 'utc' :: text )); 

INSERT INTO "public"."compliance_resource"
            ("name",
             "description",
             "url",
             "is_active",
             "deadline_at",
             "created_at")
VALUES      (
             '2024 Annual Confirmation for Professional Staff',
             'Deloitte Asia Pacific and Deloitte Southeast Asia (SEA) requirements',
             'www.abc.com',
             'true',
             '2025-06-27 00:00:00+00',
             ( Now() AT TIME zone 'utc' :: text )),
            (
             'BIR Form 2316 Year 2022 and Filing of Income Tax Returns',
             'Filing of Income Tax Returns',
             'www.abc.com',
             'true',
             '2025-04-15 00:00:00+00',
             ( Now() AT TIME zone 'utc' :: text )),
            (
             'Directorship Appointments and/or Office Holdings',
             'SEA Directorship Policy Requirement',
             NULL,
             'true',
             '2025-01-30 00:00:00+00',
             ( Now() AT TIME zone 'utc' :: text ));

-- rollback; --uncomment if running with rollback