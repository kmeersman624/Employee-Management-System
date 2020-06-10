INSERT INTO department (name)
VALUES ("Accounting"), ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Chief Accountant", 100000, 1),
       ("Accountant", 70000, 1),
       ("Lead Engineer", 125000, 2),
       ("Engineer", 80000, 2);

INSERT INTO role (first_name, last_name, role_id, manager_id)
VALUES ("Sue", "Summers", 1, null), 
        ("John", "Johnson", 2, 1),
        ("Joe", "Smith", 3, null),
        ("Sally", "Sampson", 4, 3)