-- Create table for question types
CREATE TABLE question_type (
    id SERIAL PRIMARY KEY,
    type TEXT NOT NULL
);

-- Create table for questions
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    type question_type NOT NULL
);

-- Create table for question options
CREATE TABLE question_options (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL,
    option_value TEXT NOT NULL,
    option_key INTEGER NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(id),
    UNIQUE (question_id, option_key)
);

-- Create table for resolutions
CREATE TABLE resolutions (
    id SERIAL PRIMARY KEY,
    resolution TEXT NOT NULL
);

-- Create table for resolution notes
CREATE TABLE resolution_notes (
    id SERIAL PRIMARY KEY,
    resolution_id INTEGER NOT NULL,
    note TEXT NOT NULL,
    note_order INTEGER NOT NULL,
    FOREIGN KEY (resolution_id) REFERENCES resolutions(id),
    UNIQUE (resolution_id, note_order)
);

-- Create table for users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create table for user responses
CREATE TABLE user_responses (
    id SERIAL PRIMARY KEY,
    question_id INTEGER NOT NULL,
    response_timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Create table for single select responses (type 1)
CREATE TABLE single_select_responses (
    response_id INTEGER PRIMARY KEY,
    selected_option_id INTEGER NOT NULL,
    FOREIGN KEY (response_id) REFERENCES user_responses(id),
    FOREIGN KEY (selected_option_id) REFERENCES question_options(id)
);

-- Create table for multi select responses (type 2)
CREATE TABLE multi_select_responses (
    response_id INTEGER NOT NULL,
    selected_option_id INTEGER NOT NULL,
    FOREIGN KEY (response_id) REFERENCES user_responses(id),
    FOREIGN KEY (selected_option_id) REFERENCES question_options(id),
    PRIMARY KEY (response_id, selected_option_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_question_id ON question_options(question_id);
CREATE INDEX idx_resolution_id ON resolution_notes(resolution_id);
CREATE INDEX idx_user_responses_session ON user_responses(session_id);
CREATE INDEX idx_user_responses_question ON user_responses(question_id);
CREATE INDEX idx_questionnaire_sessions_user ON questionnaire_sessions(user_id);

-- Insert all questions
INSERT INTO questions (id, question, type) VALUES 
    (0, 'What residential work are you doing?', '1'),
    (1, 'What interior work are you doing?', '2'),
    (2, 'What exterior work are you doing?', '2');

-- Insert all question options
INSERT INTO question_options (question_id, option_value, option_key) VALUES 
    -- Options for question 0
    (0, 'Interior Work', 0),
    (0, 'Exterior Work', 1),
    
    -- Options for question 1
    (1, 'Bathroom remodel', 0),
    (1, 'New bathroom', 1),
    (1, 'New laundry room', 2),
    (1, 'Other', 3),
    
    -- Options for question 2
    (2, 'Garage door replacement', 0),
    (2, 'Exterior doors', 1),
    (2, 'Fencing', 2),
    (2, 'Other', 3);

-- Insert all resolutions
INSERT INTO resolutions (id, resolution) VALUES 
    (0, 'No Permit Required'),
    (1, 'In-House Review Process'),
    (2, 'Over-the-Counter Submission Process');

-- Insert all resolution notes
INSERT INTO resolution_notes (resolution_id, note, note_order) VALUES 
    -- Notes for resolution 0
    (0, 'Nothing is required! You''re set to build.', 0),
    
    -- Notes for resolution 1
    (1, 'A building permit is required.', 0),
    (1, 'Include plan sets.', 1),
    (1, 'Submit application for in-house review.', 2),
    
    -- Notes for resolution 2
    (2, 'A building permit is required.', 0),
    (2, 'Submit application for OTC review.', 1);

-- Insert all question types
INSERT INTO question_type (id, type) VALUES 
    (1, 'Single Select'),
    (2, 'Multi Select');