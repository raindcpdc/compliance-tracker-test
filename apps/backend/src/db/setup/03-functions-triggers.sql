-- Note: GitHub user metadata only has a "full name", no separate "first name" and "last name"
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  RAISE NOTICE 'New user data: id=%, email=%, metadata=%', 
        NEW.id, 
        NEW.email, 
        NEW.raw_user_meta_data;
  INSERT INTO public.user (
    auth_id,
    role_id,
    email,
    first_name 
  )
  VALUES (
    NEW.id,
    2, -- default Individual Contributor role
    COALESCE(
      (NEW.raw_user_meta_data->>'email')::text,
      NEW.email
    ),
    (NEW.raw_user_meta_data->>'full_name')::text
  );
  RETURN NEW;
  EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Error in handle_new_user: %', SQLERRM;
        RAISE;
END;
$$ LANGUAGE plpgsql;

-- trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

