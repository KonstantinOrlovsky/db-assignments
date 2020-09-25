'use strict';

/********************************************************************************************
 *                                                                                          *
 * The goal of the task is to get basic knowledge of SQL functions and                      *
 * approaches to work with data in SQL.                                                     *
 * https://dev.mysql.com/doc/refman/5.7/en/function-reference.html                          *
 *                                                                                          *
 * The course do not includes basic syntax explanations. If you see the SQL first time,     *
 * you can find explanation and some trainings at W3S                                       *
 * https://www.w3schools.com/sql/sql_syntax.asp                                             *
 *                                                                                          *
 ********************************************************************************************/


/**
 *  Create a SQL query to return next data ordered by city and then by name:
 * | Employy Id | Employee Full Name | Title | City |
 *
 * @return {array}
 *
 */
async function task_1_1(db) {
    // The first task is example, please follow the style in the next functions.
    let result = await db.query(`
        SELECT
           EmployeeID as 'Employee Id',
           CONCAT(FirstName, ' ', LastName) AS 'Employee Full Name',
           Title as 'Title',
           City as 'City'
        FROM Employees
        ORDER BY City, 'Employee Full Name'
    `);
    return result[0];
}

/**
 *  Create a query to return an Order list ordered by order id descending:
 * | Order Id | Order Total Price | Total Order Discount, % |
 *
 * NOTES: Discount in OrderDetails is a discount($) per Unit.
 * @return {array}
 *
 */
async function task_1_2(db) {
    let result = await db.query(`
        SELECT 
           OrderId as 'Order Id',
           SUM(UnitPrice * Quantity) as 'Order Total Price',
           ROUND(SUM(Discount * Quantity) / SUM(UnitPrice * Quantity) * 100, 3) as 'Total Order Discount, %'
        FROM OrderDetails
        GROUP BY OrderID
        ORDER BY OrderID DESC
    `);
    return result[0];
}

/**
 *  Create a query to return all customers from USA without Fax:
 * | CustomerId | CompanyName |
 *
 * @return {array}
 *
 */
async function task_1_3(db) {
    let result = await db.query(`
        SELECT 
           CustomerID as CustomerId, 
           CompanyName 
        FROM Customers
        WHERE Country = 'USA' AND Fax IS NULL
        ORDER BY CustomerID 
    `);
    return result[0];
}

/**
 * Create a query to return:
 * | Customer Id | Total number of Orders | % of all orders |
 *
 * order data by % - higher percent at the top, then by CustomerID asc
 *
 * @return {array}
 *
 */
async function task_1_4(db) {
    let result = await db.query(`
        SELECT
           CustomerID as 'Customer Id',
           COUNT(CustomerID) as 'Total number of Orders',
           ROUND(COUNT(CustomerID) / (SELECT count(CustomerID) FROM Orders) * 100, 5) as '% of all orders'
        FROM Orders
        GROUP BY CustomerID
        ORDER BY COUNT(CustomerID) DESC, CustomerID
    `);
    return result[0];
}

/**
 * Return all products where product name starts with 'A', 'B', .... 'F' ordered by name.
 * | ProductId | ProductName | QuantityPerUnit |
 *
 * @return {array}
 *
 */
async function task_1_5(db) {
    let result = await db.query(`
        SELECT
           ProductID as 'ProductId',
           ProductName as 'ProductName',
           QuantityPerUnit as 'QuantityPerUnit'
        FROM Products
        WHERE  LEFT(ProductName, 1) BETWEEN 'A' AND 'F' 
        ORDER BY ProductName
    `);
    return result[0];
}

/**
 *
 * Create a query to return all products with category and supplier company names:
 * | ProductName | CategoryName | SupplierCompanyName |
 *
 * Order by ProductName then by SupplierCompanyName
 * @return {array}
 *
 */
async function task_1_6(db) {
    let result = await db.query(`
        SELECT
           P.ProductName as 'ProductName',
           C.CategoryName as 'CategoryName',
           S.CompanyName as 'SupplierCompanyName'
        FROM Products as P
        JOIN Categories as C ON C.CategoryID = P.CategoryID
        JOIN Suppliers as S ON S.SupplierID = P.SupplierID
        ORDER BY ProductName, \`SupplierCompanyName\`
    `);
    return result[0];
}

/**
 *
 * Create a query to return all employees and full name of person to whom this employee reports to:
 * | EmployeeId | FullName | ReportsTo |
 *
 * Order data by EmployeeId.
 * Reports To - Full name. If the employee does not report to anybody leave "-" in the column.
 * @return {array}
 *
 */
async function task_1_7(db) {
    let result = await db.query(`
        SELECT
           a.EmployeeID as 'EmployeeId',
           CONCAT(a.FirstName, ' ', a.LastName) as 'FullName',
		   IFNULL(CONCAT(b.FirstName, ' ', b.LastName), '-') as 'ReportsTo'
        FROM Employees as a 
        LEFT JOIN Employees as b 
        ON a.ReportsTo = b.EmployeeID
        ORDER BY EmployeeID
    `);
    return result[0];
}

/**
 *
 * Create a query to return:
 * | CategoryName | TotalNumberOfProducts |
 *
 * @return {array}
 *
 */
async function task_1_8(db) {
    let result = await db.query(`
        SELECT
           CategoryName as 'CategoryName',
           COUNT(ProductName) as 'TotalNumberOfProducts'
        FROM Categories as C
        LEFT JOIN Products as P
        ON C.CategoryID = P.CategoryID
        GROUP BY CategoryName
        ORDER BY CategoryName
    `);
    return result[0];
}

/**
 *
 * Create a SQL query to find those customers whose contact name containing the 1st character is 'F' and the 4th character is 'n' and rests may be any character.
 * | CustomerID | ContactName |
 *
 * @return {array}
 *
 */
async function task_1_9(db) {
    let result = await db.query(`
        SELECT
           CustomerID as 'CustomerID',
           ContactName as 'ContactName'
        FROM Customers
        WHERE ContactName LIKE 'F__n%'
    `);
    return result[0];
}

/**
 * Write a query to get discontinued Product list:
 * | ProductID | ProductName |
 *
 * @return {array}
 *
 */
async function task_1_10(db) {
    let result = await db.query(`
    SELECT
       ProductID as 'ProductID',
       ProductName as 'ProductName'
    FROM Products
    WHERE Discontinued != 0
`);
return result[0];
}

/**
 * Create a SQL query to get Product list (name, unit price) where products cost between $5 and $15:
 * | ProductName | UnitPrice |
 *
 * Order by UnitPrice then by ProductName
 *
 * @return {array}
 *
 */
async function task_1_11(db) {
    let result = await db.query(`
    SELECT
       ProductName as 'ProductName',
       UnitPrice as 'UnitPrice'
    FROM Products
    WHERE UnitPrice BETWEEN 5 AND 15
    ORDER BY UnitPrice, ProductName
    `);
    return result[0];
}

/**
 * Write a SQL query to get Product list of twenty most expensive products:
 * | ProductName | UnitPrice |
 *
 * Order products by price then by ProductName.
 *
 * @return {array}
 *
 */
async function task_1_12(db) {
    let result = await db.query(`
        SELECT
           ProductName as 'ProductName',
           UnitPrice as 'UnitPrice'
        FROM (SELECT a.ProductName as 'ProductName',
                     a.UnitPrice as 'UnitPrice' 
              FROM Products as a
              ORDER BY UnitPrice DESC, ProductName 
              LIMIT 20 ) as b
        ORDER BY UnitPrice, ProductName
    `);
    return result[0];
}

/**
 * Create a SQL query to count current and discontinued products:
 * | TotalOfCurrentProducts | TotalOfDiscontinuedProducts |
 *
 * @return {array}
 *
 */
async function task_1_13(db) {
    let result = await db.query(`
        SELECT
           (SELECT 
               COUNT(ProductName) 
            FROM Products)  as 'TotalOfCurrentProducts',
           COUNT(ProductName) as 'TotalOfDiscontinuedProducts'
        FROM Products
        WHERE Discontinued != 0
    `);
return result[0];
}

/**
 * Create a SQL query to get Product list of stock is less than the quantity on order:
 * | ProductName | UnitsOnOrder| UnitsInStock |
 *
 * @return {array}
 *
 */
async function task_1_14(db) {
    let result = await db.query(`
        SELECT
           ProductName as 'ProductName',
           UnitsOnOrder as 'UnitsOnOrder',
           UnitsInStock as 'UnitsInStock'
        FROM Products
        WHERE UnitsInStock < UnitsOnOrder
    `);
    return result[0];
}

/**
 * Create a SQL query to return the total number of orders for every month in 1997 year:
 * | January | February | March | April | May | June | July | August | September | November | December |
 *
 * @return {array}
 *
 */
async function task_1_15(db) {
    let result = await db.query(`
        SELECT
           COUNT(IF(MONTHNAME(OrderDate) = 'January', 1, NULL)) AS 'January',
           COUNT(IF(MONTHNAME(OrderDate) = 'February', 1, NULL)) AS 'February',
           COUNT(IF(MONTHNAME(OrderDate) = 'March', 1, NULL)) AS 'March',
           COUNT(IF(MONTHNAME(OrderDate) = 'April', 1, NULL)) AS 'April',
           COUNT(IF(MONTHNAME(OrderDate) = 'May', 1, NULL)) AS 'May',
           COUNT(IF(MONTHNAME(OrderDate) = 'June', 1, NULL)) AS 'June',
           COUNT(IF(MONTHNAME(OrderDate) = 'July', 1, NULL)) AS 'July',
           COUNT(IF(MONTHNAME(OrderDate) = 'August', 1, NULL)) AS 'August',
           COUNT(IF(MONTHNAME(OrderDate) = 'September', 1, NULL)) AS 'September',
           COUNT(IF(MONTHNAME(OrderDate) = 'October', 1, NULL)) AS 'October',
           COUNT(IF(MONTHNAME(OrderDate) = 'November', 1, NULL)) AS 'November',
           COUNT(IF(MONTHNAME(OrderDate) = 'December', 1, NULL)) AS 'December'
        FROM Orders  
        WHERE YEAR(OrderDate) = 1997
    `);
    return result[0];
}

/**
 * Create a SQL query to return all orders where ship postal code is provided:
 * | OrderID | CustomerID | ShipCountry |
 *
 * @return {array}
 *
 */
async function task_1_16(db) {
    let result = await db.query(`
        SELECT
           OrderID as 'OrderID',
           CustomerID as 'CustomerID',
           ShipCountry as 'ShipCountry'
        FROM Orders
        WHERE ShipPostalCode IS NOT NULL
    `);
    return result[0];
}

/**
 * Create SQL query to display the average price of each categories's products:
 * | CategoryName | AvgPrice |
 *
 * @return {array}
 *
 * Order by AvgPrice descending then by CategoryName
 *
 */
async function task_1_17(db) {
    let result = await db.query(`
        SELECT
        CategoryName as 'CategoryName',
           AVG(UnitPrice) as 'AvgPrice'
        FROM Categories as C 
        JOIN Products as P 
        ON P.CategoryID = C.CategoryID
        GROUP BY CategoryName
        ORDER BY \`AvgPrice\` DESC, CategoryName
    `);
    return result[0];
}

/**
 * Create a SQL query to calcualte total orders count by each day in 1998:
 * | OrderDate | Total Number of Orders |
 *
 * OrderDate needs to be in the format '%Y-%m-%d %T'
 * @return {array}
 *
 */
async function task_1_18(db) {
    let result = await db.query(`
        SELECT
           DATE_FORMAT(OrderDate, '%Y-%m-%d %T') as 'OrderDate',
           COUNT(CustomerID) as 'Total Number of Orders'
        FROM Orders 
        WHERE YEAR(OrderDate) = 1998
        GROUP BY OrderDate
        ORDER BY OrderDate
    `);
    return result[0];
}

/**
 * Create a SQL query to display customer details whose total orders amount is more than 10000$:
 * | CustomerID | CompanyName | TotalOrdersAmount, $ |
 *
 * Order by "TotalOrdersAmount, $" descending then by CustomerID
 * @return {array}
 *
 */
async function task_1_19(db) {
    let result = await db.query(`
        SELECT
           C.CustomerID as 'CustomerID',
           C.CompanyName as 'CompanyName',
           SUM(OD.UnitPrice * OD.Quantity) as 'TotalOrdersAmount, $'
        FROM Customers as C
        JOIN Orders as O ON C.CustomerID = O.CustomerID
        JOIN OrderDetails as OD ON O.OrderID = OD.OrderID
        GROUP BY C.CustomerID
        HAVING \`TotalOrdersAmount, $\` > 10000
        ORDER BY \`TotalOrdersAmount, $\` DESC
    `);
    return result[0];
}

/**
 *
 * Create a SQL query to find the employee that sold products for the largest amount:
 * | EmployeeID | Employee Full Name | Amount, $ |
 *
 * @return {array}
 *
 */
async function task_1_20(db) {
    let result = await db.query(`
        SELECT
           E.EmployeeID as 'EmployeeID',
           CONCAT(E.FirstName, ' ', E.LastName) as 'Employee Full Name',
           SUM(UnitPrice * Quantity) as 'Amount, $'
        FROM Employees as E
        JOIN Orders as O ON E.EmployeeID = O.EmployeeID
        JOIN OrderDetails as OD ON O.OrderID = OD.OrderID
        GROUP BY EmployeeID
        ORDER BY \`Amount, $\` DESC LIMIT 1
    `);
    return result[0];
}

/**
 * Write a SQL statement to get the maximum purchase amount of all the orders.
 * | OrderID | Maximum Purchase Amount, $ |
 *
 * @return {array}
 */
async function task_1_21(db) {
    let result = await db.query(`
        SELECT
        OrderID as 'OrderID',
           SUM(UnitPrice * Quantity) as 'Maximum Purchase Amount, $'
        FROM OrderDetails
        GROUP BY OrderID
        ORDER BY \`Maximum Purchase Amount, $\` DESC LIMIT 1 
    `);
    return result[0];
}

/**
 * Create a SQL query to display the name of each customer along with their most expensive purchased product:
 * | CompanyName | ProductName | PricePerItem |
 *
 * order by PricePerItem descending and them by CompanyName and ProductName acceding
 * @return {array}
 */
async function task_1_22(db) {
    let result = await db.query(`
        SELECT
            CompanyName as "CompanyName",
            ProductName as "ProductName",
            OD.UnitPrice as "PricePerItem"
        FROM Customers as C
        JOIN Orders as O ON O.CustomerID=C.CustomerID
        JOIN OrderDetails as OD ON OD.OrderID=O.OrderID
        JOIN Products as P ON P.ProductID=OD.ProductID
        WHERE OD.UnitPrice = (
            SELECT MAX(OD1.UnitPrice)
            FROM Customers as C1
            JOIN Orders as O1 ON O1.CustomerID = C1.CustomerID
            JOIN OrderDetails as OD1 ON O1.OrderID = OD1.OrderID
            WHERE C.CustomerID = C1.CustomerID
        )
        GROUP BY PricePerItem, CompanyName, ProductName
        ORDER BY PricePerItem DESC, CompanyName, ProductName;
    `);
    return result[0];
}

module.exports = {
    task_1_1: task_1_1,
    task_1_2: task_1_2,
    task_1_3: task_1_3,
    task_1_4: task_1_4,
    task_1_5: task_1_5,
    task_1_6: task_1_6,
    task_1_7: task_1_7,
    task_1_8: task_1_8,
    task_1_9: task_1_9,
    task_1_10: task_1_10,
    task_1_11: task_1_11,
    task_1_12: task_1_12,
    task_1_13: task_1_13,
    task_1_14: task_1_14,
    task_1_15: task_1_15,
    task_1_16: task_1_16,
    task_1_17: task_1_17,
    task_1_18: task_1_18,
    task_1_19: task_1_19,
    task_1_20: task_1_20,
    task_1_21: task_1_21,
    task_1_22: task_1_22
};
