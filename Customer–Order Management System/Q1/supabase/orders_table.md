```bash
create table orders(id uuid primary key,
                    product_name text not null,
                    quantity int not null,
                    price numeric not null,
                    order_status text default 'pending',
                    customer_id uuid,
                    foreign key(customer_id) references customers(id) on delete cascade,
                    created_at timestamp default now());
```