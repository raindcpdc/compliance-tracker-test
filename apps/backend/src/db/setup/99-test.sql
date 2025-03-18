-- to check if "on_auth_user_created" trigger exists
SELECT * FROM information_schema.triggers 
WHERE event_object_table = 'users' 
AND event_object_schema = 'auth'
AND trigger_name = 'on_auth_user_created';

-- to check if "handle_new_user" function exists
SELECT * FROM pg_proc 
WHERE proname = 'handle_new_user';

-- to run this function: SELECT test_user_trigger();
CREATE OR REPLACE FUNCTION test_user_trigger()
RETURNS void AS $$
DECLARE
    test_user_id uuid;
BEGIN
    -- Insert a test user into "auth.users"
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        raw_user_meta_data
    )
    VALUES (
        '00000000-0000-0000-0000-000000000000',
        gen_random_uuid(),
        'authenticated',
        'authenticated',
        'test@example.com',
        null, -- dummy password
        NOW(),
        '{"full_name": "Test User", "email": "test@example.com"}'::jsonb
    )
    RETURNING id INTO test_user_id;

    -- Verify the trigger worked
    ASSERT (
        SELECT COUNT(*)
        FROM public.user
        WHERE auth_id = test_user_id
    ) = 1, 'User was not created in public.user';

    -- Clean up, should also trigger a cascade delete on "public.user"
    DELETE FROM auth.users WHERE id = test_user_id;
END;
$$ LANGUAGE plpgsql;

-- to check if these functions that return data exists
SELECT * FROM pg_proc WHERE proname = 'get_unassigned_training_users';
SELECT * FROM pg_proc WHERE proname = 'get_unassigned_requirements_users';