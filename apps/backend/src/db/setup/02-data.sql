-- begin; --uncomment if running with rollback

INSERT INTO "public"."learning_resource_type"
            ("name",
             "description")
VALUES      ('Digital Learning',
             'Online learning'),
            ('Classroom',
             'In person classroom training'),
            ('Virtual Classroom',
             'Online classroom training'); 

INSERT INTO "public"."resource_status"
            ("name",
             "description")
VALUES      ('Not Started',
             'User has not not started the resource.'),
            ('In Progress',
             'User has started the resource but has not completed it yet.'),
            ('Completed',
             'User has completed the resource.'); 

INSERT INTO "public"."user_role"
            ("name",
             "description")
VALUES      ('Manager',
             'Lead role'),
            ('Individual Contributor',
             'IC Role'); 

-- rollback; --uncomment if running with rollback