# ERD

users
------
id SERIAL PK
name
email
password



todos
----------
id SERIAL PK
user_id
category (ie watch, read, eat, buy)
name (ie Vikings, Think Fast and Slow, coxinha, buy ergonomic keyboard)
note
date_added
deadline
date_completed

