-- Crear la base de datos
CREATE DATABASE prueba_woowup;

-- Usar la base de datos recién creada
USE prueba_woowup;

-- Crear la tabla Clientes
CREATE TABLE Clientes (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50),
    Apellido VARCHAR(50)
);

-- Crear la tabla Ventas
CREATE TABLE Ventas (
    Id_ventas INT AUTO_INCREMENT PRIMARY KEY,
    Fecha DATE,
    Sucursal VARCHAR(50),
    Numero_factura INT,
    Importe FLOAT,
    Id_cliente INT,
    FOREIGN KEY (Id_cliente) REFERENCES Clientes(Id)
);

-- Insertar datos de ejemplo en la tabla Clientes
INSERT INTO Clientes (Nombre, Apellido) VALUES ('Juan', 'Pérez');
INSERT INTO Clientes (Nombre, Apellido) VALUES ('Ana', 'García');
INSERT INTO Clientes (Nombre, Apellido) VALUES ('Luis', 'Martínez');

-- Insertar datos de ejemplo en la tabla Ventas
INSERT INTO Ventas (Fecha, Sucursal, Numero_factura, Importe, Id_cliente) VALUES ('2023-10-15', 'Sucursal A', 101, 60000, 1);
INSERT INTO Ventas (Fecha, Sucursal, Numero_factura, Importe, Id_cliente) VALUES ('2024-01-10', 'Sucursal B', 102, 70000, 1);
INSERT INTO Ventas (Fecha, Sucursal, Numero_factura, Importe, Id_cliente) VALUES ('2024-02-05', 'Sucursal C', 103, 80000, 2);
INSERT INTO Ventas (Fecha, Sucursal, Numero_factura, Importe, Id_cliente) VALUES ('2024-03-20', 'Sucursal A', 104, 20000, 3);
INSERT INTO Ventas (Fecha, Sucursal, Numero_factura, Importe, Id_cliente) VALUES ('2024-04-25', 'Sucursal B', 105, 28000, 2);

-- Consulta para obtener clientes con compras mayores a 100,000 en los últimos 12 meses
SELECT c.Id, c.Nombre, c.Apellido
FROM Clientes c
JOIN Ventas v ON c.Id = v.Id_cliente
WHERE v.Fecha >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
GROUP BY c.Id, c.Nombre, c.Apellido
HAVING SUM(v.Importe) > 100000;
