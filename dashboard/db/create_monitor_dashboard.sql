--alter table event DROP event_article;
-- alter table property DROP  property_article;

DROP INDEX IF EXISTS event_idx_1;
DROP INDEX IF EXISTS property_idx_1;
DROP table IF EXISTS event;
DROP table IF EXISTS property;
DROP INDEX IF EXISTS article_idx_1;
DROP table IF EXISTS article;
DROP table IF EXISTS message;



-- tables
-- Table: article
CREATE TABLE article (
    article_id SERIAL,
    article_identifier varchar(512)  NOT NULL,
    CONSTRAINT article_pk PRIMARY KEY (article_id)
);

CREATE INDEX article_idx_1 on article (article_id ASC);

-- Table: message
CREATE TABLE message (
    message_id varchar(512)  NOT NULL,
    timestamp timestamp  NOT NULL,
    CONSTRAINT message_pk PRIMARY KEY (message_id)
);

CREATE INDEX message_idx_1 on message (message_id ASC);


-- Table: event
CREATE TABLE event (
    event_id SERIAL ,
    version int  NOT NULL,
    run varchar(255)  NOT NULL,
    type varchar(255)  NOT NULL,
    timestamp timestamp  NOT NULL,
    status varchar(255)  NOT NULL,
    message text  NULL,
    article_id int  NOT NULL,
    CONSTRAINT event_pk PRIMARY KEY (event_id)
);

CREATE INDEX event_idx_1 on event (version ASC,run ASC,article_id ASC);


-- Table: property
CREATE TABLE property (
    property_id SERIAL,
    version int NOT NULL,
    name varchar(255)  NOT NULL,
    int_value int  NULL,
    text_value text  NULL,
    date_value int  NULL,
    property_type varchar(255)  NOT NULL,
    article_id int  NOT NULL,
    CONSTRAINT property_pk PRIMARY KEY (property_id)
);

CREATE INDEX property_idx_1 on property (article_id ASC);


-- foreign keys
-- Reference:  event_article (table: event)


ALTER TABLE event ADD CONSTRAINT event_article 
    FOREIGN KEY (article_id)
    REFERENCES article (article_id)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE 
;

-- Reference:  property_article (table: property)


ALTER TABLE property ADD CONSTRAINT property_article 
    FOREIGN KEY (article_id)
    REFERENCES article (article_id)
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE 
;

ALTER TABLE article ADD UNIQUE (article_identifier);

