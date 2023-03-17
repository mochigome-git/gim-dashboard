--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Debian 14.5-2.pgdg110+2)
-- Dumped by pg_dump version 15.1 (Ubuntu 15.1-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: records; Type: TABLE; Schema: public; Owner: supabase_admin
--

CREATE TABLE public.records (
    record_id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    quantity integer,
    operator text,
    user_id uuid,
    created_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.records OWNER TO supabase_admin;

--
-- Name: records records_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.records
    ADD CONSTRAINT records_pkey PRIMARY KEY (record_id);


--
-- Name: records records_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.records
    ADD CONSTRAINT records_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: records Enable insert for authenticated users only; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable insert for authenticated users only" ON public.records FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: records Enable read access for all users; Type: POLICY; Schema: public; Owner: supabase_admin
--

CREATE POLICY "Enable read access for all users" ON public.records FOR SELECT USING (true);


--
-- Name: records; Type: ROW SECURITY; Schema: public; Owner: supabase_admin
--

ALTER TABLE public.records ENABLE ROW LEVEL SECURITY;

--
-- Name: TABLE records; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.records TO postgres;
GRANT ALL ON TABLE public.records TO anon;
GRANT ALL ON TABLE public.records TO authenticated;
GRANT ALL ON TABLE public.records TO service_role;


--
-- PostgreSQL database dump complete
--

