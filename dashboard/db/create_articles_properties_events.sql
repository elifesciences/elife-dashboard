
insert into article values (1,'09003');
INSERT INTO event (event_id, version, run, type, "timestamp", status, message, article_id)
VALUES (11, 3, 'b6ef5d1f-23b3-4f4e-9ba3-7de24f885171', 'Convert JATS', '2016-02-08 14:14:49.619248', 'start', 'Starting conversion of article xml to EIF for 09003', 1);
INSERT INTO property (property_id, version, name, int_value, text_value, date_value, property_type, article_id)
VALUES (21, 3, 'doi', NULL, '10.7554/eLife.09003', NULL, 'text', 1);

insert into article values (2, '09672');
INSERT INTO event (event_id, version, run, type, "timestamp", status, message, article_id)
VALUES (3, 2, 'dc319cf8-8f7a-42d6-bec9-33fde4d51db0', 'Expand Article', '2016-02-07 02:18:37.979042', 'start', 'Starting expansion of article 09672', 2);
INSERT INTO property (property_id, version, name, int_value, text_value, date_value, property_type, article_id)
VALUES (14, 2, 'doi', NULL, '10.7554/eLife.09672', NULL, 'text', 2);

insert into article values (7, '11407');
INSERT INTO event (event_id, version, run, type, "timestamp", status, message, article_id)
VALUES (8, 2, 'dc319cf8-8f7a-42d6-bec9-33fde4d51db0', 'Expand Article', '2016-02-07 02:18:37.979042', 'start', 'Starting expansion of article 09672', 7);
INSERT INTO property (property_id, version, name, int_value, text_value, date_value, property_type, article_id)
VALUES (18, 3, 'doi', NULL, '10.7554/eLife.09003', NULL, 'text', 7);

