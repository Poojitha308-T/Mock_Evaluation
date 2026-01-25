```bash
create table customers(id uuid primary key, 
                      full_name text not null,
                      email text not null unique,   
                      phone text not null, 
                      created_at timestamp default now());

```
