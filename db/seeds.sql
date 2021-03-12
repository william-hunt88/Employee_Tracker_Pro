INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, null),
  ('Virginia', 'Woolf', 2, null),
  ('Piers', 'Gaveston', 3, 4),
  ('Charles', 'LeRoi', 4, null),
  ('Katherine', 'Mansfield', 5, 1),
  ('Dora', 'Carrington', 6, 1),
  ('Edward', 'Bellamy', 7, 1),
  ('Montague', 'Summers', 8, 2),
  ('Octavia', 'Butler', 9, 2),
  ('Unica', 'Zurn', 10, 2),
  ('Doctor', 'Feelgood', 11, 3),
  ('Johnny', 'Sack', 6, 3);

  INSERT INTO role (title, salary, department_id)
  VALUES
  ('Production Manager', 50000, 3),
  ('Floor Manager', 50000, 3),
  ('Business Manager', 70000, 3),
  ('Venue Manger', 60000, 3),
  ('FOH Audio', 45000, 1),
  ('Monitors Audio', 40000, 1),
  ('A2', 35000, 1),
  ('Show Rep', 45000, 2),
  ('Stage Manager', 40000, 2),
  ('Hospitality', 35000, 2),
  ('Booking Agent', 50000, 2);

  INSERT INTO department (name)
  VALUES
  ('Production'),
  ('Day to Day'),
  ('Management');
