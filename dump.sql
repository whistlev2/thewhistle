--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3
-- Dumped by pg_dump version 11.3

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

SET default_with_oids = false;

--
-- Name: audit; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audit (
    id integer NOT NULL,
    report integer,
    "user" integer,
    "time" timestamp without time zone,
    action character varying
);


ALTER TABLE public.audit OWNER TO postgres;

--
-- Name: audit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.audit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.audit_id_seq OWNER TO postgres;

--
-- Name: audit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.audit_id_seq OWNED BY public.audit.id;


--
-- Name: forms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.forms (
    id integer NOT NULL,
    organisation integer,
    title character varying,
    description character varying,
    slug character varying,
    web boolean,
    published boolean DEFAULT false,
    created timestamp without time zone DEFAULT '2020-07-31 12:15:29.456683'::timestamp without time zone NOT NULL,
    edited timestamp without time zone DEFAULT '2020-07-31 12:15:29.456683'::timestamp without time zone NOT NULL
);


ALTER TABLE public.forms OWNER TO postgres;

--
-- Name: forms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.forms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.forms_id_seq OWNER TO postgres;

--
-- Name: forms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.forms_id_seq OWNED BY public.forms.id;


--
-- Name: formsectionlogic; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.formsectionlogic (
    id integer NOT NULL,
    form integer,
    logic json,
    test_logic json
);


ALTER TABLE public.formsectionlogic OWNER TO postgres;

--
-- Name: formsectionlogic_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.formsectionlogic_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.formsectionlogic_id_seq OWNER TO postgres;

--
-- Name: formsectionlogic_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.formsectionlogic_id_seq OWNED BY public.formsectionlogic.id;


--
-- Name: formsections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.formsections (
    id integer NOT NULL,
    form integer,
    type character varying,
    json json,
    test_json json
);


ALTER TABLE public.formsections OWNER TO postgres;

--
-- Name: formsections_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.formsections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.formsections_id_seq OWNER TO postgres;

--
-- Name: formsections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.formsections_id_seq OWNED BY public.formsections.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: notes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notes (
    id integer NOT NULL,
    report integer,
    "user" integer,
    "time" timestamp without time zone,
    comment character varying
);


ALTER TABLE public.notes OWNER TO postgres;

--
-- Name: notes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notes_id_seq OWNER TO postgres;

--
-- Name: notes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notes_id_seq OWNED BY public.notes.id;


--
-- Name: organisations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.organisations (
    id integer NOT NULL,
    name character varying,
    slug character varying,
    active boolean
);


ALTER TABLE public.organisations OWNER TO postgres;

--
-- Name: organisations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.organisations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.organisations_id_seq OWNER TO postgres;

--
-- Name: organisations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.organisations_id_seq OWNED BY public.organisations.id;


--
-- Name: questionresponses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questionresponses (
    id integer NOT NULL,
    report integer,
    section integer,
    question_ref character varying,
    definition json,
    value character varying
);


ALTER TABLE public.questionresponses OWNER TO postgres;

--
-- Name: questionresponses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questionresponses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.questionresponses_id_seq OWNER TO postgres;

--
-- Name: questionresponses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questionresponses_id_seq OWNED BY public.questionresponses.id;


--
-- Name: reports; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reports (
    id integer NOT NULL,
    form integer,
    date timestamp without time zone,
    assigned_to integer,
    status character varying,
    tags character varying,
    active boolean,
    location character varying,
    test boolean
);


ALTER TABLE public.reports OWNER TO postgres;

--
-- Name: reports_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reports_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reports_id_seq OWNER TO postgres;

--
-- Name: reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reports_id_seq OWNED BY public.reports.id;


--
-- Name: userforms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.userforms (
    id integer NOT NULL,
    "user" integer,
    form integer,
    user_role character varying,
    created_at timestamp without time zone DEFAULT '2020-07-31 12:15:30.91632'::timestamp without time zone NOT NULL
);


ALTER TABLE public.userforms OWNER TO postgres;

--
-- Name: userforms_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.userforms_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.userforms_id_seq OWNER TO postgres;

--
-- Name: userforms_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.userforms_id_seq OWNED BY public.userforms.id;


--
-- Name: userorgs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.userorgs (
    id integer NOT NULL,
    "user" integer,
    organisation integer,
    role character varying
);


ALTER TABLE public.userorgs OWNER TO postgres;

--
-- Name: userorgs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.userorgs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.userorgs_id_seq OWNER TO postgres;

--
-- Name: userorgs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.userorgs_id_seq OWNED BY public.userorgs.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    first_name character varying,
    surname character varying,
    email character varying,
    password character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: audit id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit ALTER COLUMN id SET DEFAULT nextval('public.audit_id_seq'::regclass);


--
-- Name: forms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forms ALTER COLUMN id SET DEFAULT nextval('public.forms_id_seq'::regclass);


--
-- Name: formsectionlogic id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formsectionlogic ALTER COLUMN id SET DEFAULT nextval('public.formsectionlogic_id_seq'::regclass);


--
-- Name: formsections id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formsections ALTER COLUMN id SET DEFAULT nextval('public.formsections_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: notes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notes ALTER COLUMN id SET DEFAULT nextval('public.notes_id_seq'::regclass);


--
-- Name: organisations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisations ALTER COLUMN id SET DEFAULT nextval('public.organisations_id_seq'::regclass);


--
-- Name: questionresponses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionresponses ALTER COLUMN id SET DEFAULT nextval('public.questionresponses_id_seq'::regclass);


--
-- Name: reports id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports ALTER COLUMN id SET DEFAULT nextval('public.reports_id_seq'::regclass);


--
-- Name: userforms id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userforms ALTER COLUMN id SET DEFAULT nextval('public.userforms_id_seq'::regclass);


--
-- Name: userorgs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userorgs ALTER COLUMN id SET DEFAULT nextval('public.userorgs_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: audit; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.audit (id, report, "user", "time", action) FROM stdin;
\.


--
-- Data for Name: forms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.forms (id, organisation, title, description, slug, web, published, created, edited) FROM stdin;
\.


--
-- Data for Name: formsectionlogic; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.formsectionlogic (id, form, logic, test_logic) FROM stdin;
\.


--
-- Data for Name: formsections; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.formsections (id, form, type, json, test_json) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, name, run_on) FROM stdin;
1	/20190603122534-initial-migration	2019-06-12 12:06:43.567
2	/20190603153818-add-sample-data	2019-06-12 12:06:43.596
180	/20200727191054-report-table	2020-08-12 17:47:30.908
181	/20200727191137-audit-table	2020-08-12 17:47:31.066
182	/20200727191145-notes-table	2020-08-12 17:47:31.195
183	/20200727191210-question-responses-table	2020-08-12 17:47:31.32
141	/20190605090441-add-organisation-table	2020-07-30 04:16:47.816
142	/20190605124519-add-user-table	2020-07-30 04:16:47.979
143	/20200527094500-userorgs-table	2020-07-30 04:16:48.108
168	/20200727170444-forms	2020-07-31 12:15:30.909
169	/20200727175316-user-form-table	2020-07-31 12:15:31.075
\.


--
-- Data for Name: notes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notes (id, report, "user", "time", comment) FROM stdin;
\.


--
-- Data for Name: organisations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.organisations (id, name, slug, active) FROM stdin;
7	End Everyday Racism	eer	t
8	Supply Chain Organising Coalition	scoc	t
9	Humans for Rights Network	hfrn	t
10	Global Rights Nigeria	grn	t
11	Test Organisation	test	t
\.


--
-- Data for Name: questionresponses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.questionresponses (id, report, section, question_ref, definition, value) FROM stdin;
\.


--
-- Data for Name: reports; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reports (id, form, date, assigned_to, status, tags, active, location, test) FROM stdin;
\.


--
-- Data for Name: userforms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.userforms (id, "user", form, user_role, created_at) FROM stdin;
\.


--
-- Data for Name: userorgs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.userorgs (id, "user", organisation, role) FROM stdin;
16	1	7	admin
17	1	8	admin
18	1	9	admin
19	1	10	admin
20	1	11	admin
21	9	7	admin
22	9	8	admin
23	9	9	admin
24	9	10	admin
25	9	11	admin
26	10	7	admin
27	11	11	admin
28	12	11	admin
29	13	7	admin
30	13	8	editor
31	13	9	editor
32	13	11	admin
33	13	10	editor
34	14	7	admin
35	14	11	admin
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, first_name, surname, email, password) FROM stdin;
1	Louis	Slater	lmcs97@gmail.com	$2b$10$MkCqkSJLAtGSY9nliRkeke5kJMSNhgOBRy/gBWcxQhzfyuutK0YAW
9	Ella	McPherson	em310@cam.ac.uk	$2b$10$SHY9Do0jc9dXSWU4BMoGEeeWFEBxfWIDHNnr84utzCRxyCdoqwbkq
10	Mónica	Moreno Figueroa	mm2051@cam.ac.uk	$2b$10$nNndJ.JSQIrvJ5hFvzrDbeb58lLiOomVOv03QiJuDKyfurnHJJagi
11	Lisa	Klaassen	lajk2@cam.ac.uk	$2b$10$y93hnIdjb3KLV5uFmY6A.uL9lU2JYbGxqR0lySEwYSaaTpxDb/NCy
12	Jamie	Hancock	jh2120@cam.ac.uk	$2b$10$FvBcQeHjfONma9ge1TyP0eRnvlM4vGZtJqMOG2iU3Z9XVh/HCyaWu
13	Saide	Mobayed	sam270@cam.ac.uk	$2b$10$ufVQQhnD7LNfxcRPCIKNMO3L/gDbwH127qo9/FmnWX4RI/.3eBdU2
14	Joe	Cotton	communications@sociology.cam.ac.uk	$2b$10$hnQ.Jg264HphwuCU1dx2sOWDjcdV9NbhSRZsYd/wUjLvu12hjj1ly
\.


--
-- Name: audit_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.audit_id_seq', 1, false);


--
-- Name: forms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.forms_id_seq', 50, true);


--
-- Name: formsectionlogic_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.formsectionlogic_id_seq', 45, true);


--
-- Name: formsections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.formsections_id_seq', 49, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 183, true);


--
-- Name: notes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notes_id_seq', 2, true);


--
-- Name: organisations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.organisations_id_seq', 11, true);


--
-- Name: questionresponses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questionresponses_id_seq', 24, true);


--
-- Name: reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reports_id_seq', 3, true);


--
-- Name: userforms_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.userforms_id_seq', 1, false);


--
-- Name: userorgs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.userorgs_id_seq', 35, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 14, true);


--
-- Name: audit audit_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit
    ADD CONSTRAINT audit_pkey PRIMARY KEY (id);


--
-- Name: forms forms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT forms_pkey PRIMARY KEY (id);


--
-- Name: formsectionlogic formsectionlogic_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formsectionlogic
    ADD CONSTRAINT formsectionlogic_pkey PRIMARY KEY (id);


--
-- Name: formsections formsections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formsections
    ADD CONSTRAINT formsections_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: notes notes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT notes_pkey PRIMARY KEY (id);


--
-- Name: organisations organisations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.organisations
    ADD CONSTRAINT organisations_pkey PRIMARY KEY (id);


--
-- Name: questionresponses questionresponses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionresponses
    ADD CONSTRAINT questionresponses_pkey PRIMARY KEY (id);


--
-- Name: reports reports_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT reports_pkey PRIMARY KEY (id);


--
-- Name: userforms userforms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userforms
    ADD CONSTRAINT userforms_pkey PRIMARY KEY (id);


--
-- Name: userorgs userorgs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userorgs
    ADD CONSTRAINT userorgs_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: reports assigned_to; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT assigned_to FOREIGN KEY (assigned_to) REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: formsections form; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formsections
    ADD CONSTRAINT form FOREIGN KEY (form) REFERENCES public.forms(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: formsectionlogic form; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.formsectionlogic
    ADD CONSTRAINT form FOREIGN KEY (form) REFERENCES public.forms(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: userforms form; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userforms
    ADD CONSTRAINT form FOREIGN KEY (form) REFERENCES public.forms(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: reports form; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reports
    ADD CONSTRAINT form FOREIGN KEY (form) REFERENCES public.forms(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: userorgs organisation; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userorgs
    ADD CONSTRAINT organisation FOREIGN KEY (organisation) REFERENCES public.organisations(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: forms organisation; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.forms
    ADD CONSTRAINT organisation FOREIGN KEY (organisation) REFERENCES public.organisations(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: audit report; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit
    ADD CONSTRAINT report FOREIGN KEY (report) REFERENCES public.reports(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: notes report; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT report FOREIGN KEY (report) REFERENCES public.reports(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: questionresponses report; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionresponses
    ADD CONSTRAINT report FOREIGN KEY (report) REFERENCES public.reports(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: questionresponses section; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questionresponses
    ADD CONSTRAINT section FOREIGN KEY (section) REFERENCES public.formsections(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: userorgs user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userorgs
    ADD CONSTRAINT "user" FOREIGN KEY ("user") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: userforms user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.userforms
    ADD CONSTRAINT "user" FOREIGN KEY ("user") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: audit user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.audit
    ADD CONSTRAINT "user" FOREIGN KEY ("user") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- Name: notes user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notes
    ADD CONSTRAINT "user" FOREIGN KEY ("user") REFERENCES public.users(id) ON UPDATE RESTRICT ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

