INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, 0),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 3, 0),
  ('Edward', 'Bellamy', 3, 0),
  ('Montague', 'Summers', 3, 1),
  ('Octavia', 'Butler', 3, 1),
  ('Unica', 'Zurn', 2, 1);

  INSERT INTO role (title, salary, department_id)
  VALUES
  ('Production Manager', 50,000, 1)
  ('FOH Audio', 45,000, 1),
  ('Monitors Audio', 40,000, 1),
  ('A2', 35,000, 1),
  ('Show Rep', 45,000, 2),
  ('Stage Manager', 40,000, 2),
  ('Hospitality', 35,000, 2),
  ('Booking Agent', 50,000, 3),
  ('Venue Manger', 60,000, 3),
  ('Business Mangaer', 70,000, 3);

  INSERT INTO department (name)
  VALUES
  ('Production'),
  ('Day to Day'),
  ('Management');
