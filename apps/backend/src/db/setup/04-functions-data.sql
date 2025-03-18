DROP FUNCTION IF EXISTS get_unassigned_training_users(smallint);
DROP FUNCTION IF EXISTS get_unassigned_requirements_users(smallint);

-- to test: SELECT * from get_unassigned_training_users(1::smallint);
CREATE OR REPLACE FUNCTION get_unassigned_training_users(
  training_resource_id smallint
)
RETURNS TABLE (
  id integer, 
  first_name character varying, 
  last_name character varying,
  email character varying
) 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT u.id, u.first_name, u.last_name, u.email
  FROM public.user u
  EXCEPT
  SELECT ul.id, ul.first_name, ul.last_name, ul.email
  FROM public.user ul
  JOIN public.assigned_learning_resource alr ON ul.id = alr.user_id
  WHERE alr.resource_id = training_resource_id;
END;
$$ LANGUAGE plpgsql;

-- to test: SELECT * from get_unassigned_requirements_users(1::smallint);
CREATE OR REPLACE FUNCTION get_unassigned_requirements_users(
  requirement_resource_id smallint
)
RETURNS TABLE (
  id integer, 
  first_name character varying, 
  last_name character varying,
  email character varying
) 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT u.id, u.first_name, u.last_name, u.email
  FROM public.user u
  EXCEPT
  SELECT ul.id, ul.first_name, ul.last_name, ul.email
  FROM public.user ul
  JOIN public.assigned_compliance_resource acr ON ul.id = acr.user_id
  WHERE acr.resource_id = requirement_resource_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION save_user_assignments(
    resource_type smallint,
    resource_value smallint,
    unassigned_user_ids bigint[],
    assigned_user_ids bigint[]
) 
RETURNS void 
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
    IF resource_type = 1 THEN
        DELETE FROM assigned_learning_resource alr1
        WHERE resource_id = resource_value
          AND user_id = ANY(unassigned_user_ids);

        INSERT INTO assigned_learning_resource (resource_id, user_id) 
        SELECT resource_value, unnest(assigned_user_ids);

    ELSIF resource_type = 2 THEN
        DELETE FROM assigned_compliance_resource
        WHERE resource_id = resource_value
          AND user_id = ANY(unassigned_user_ids);

        INSERT INTO assigned_compliance_resource (resource_id, user_id)
        SELECT resource_value, unnest(assigned_user_ids);

    ELSE
        RAISE EXCEPTION 'Invalid resource_type';
    END IF;
END;
$$ LANGUAGE plpgsql;