
USE myemployees;

#region testsnippet
## 5、分组函数        ★       

SELECT SUM(salary),AVG(salary),MIN(salary),MAX(salary),COUNT(salary) FROM employees;

SELECT COUNT(employee_id) FROM employees;

SELECT COUNT(salary) FROM employees;

SELECT COUNT(salary) FROM employees WHERE salary > 2500;

SELECT COUNT(manager_id) FROM employees;
#endregion testsnippet

# 5.1 统计结果集的行数，推荐使用count(*)
SELECT COUNT(*) FROM employees;

SELECT COUNT(*) FROM employees WHERE department_id=30;

SELECT COUNT(1) FROM employees;

SELECT COUNT(1) FROM employees WHERE department_id=30;

SELECT * FROM employees;

#5.2 搭配distinct实现去重统计
# 需求，查询部门个数
SELECT COUNT(DISTINCT department_id) FROM employees;

#5.3 思考：每个部门的总工资、平均工资？需要用到分组查询，只用分组函数无法实现
SELECT SUM(salary) FROM employees WHERE department_id = 30;
SELECT SUM(salary) FROM employees WHERE department_id = 35;


## 6、分组查询		   ★	

SELECT SUM(salary),AVG(salary),department_id FROM employees GROUP BY department_id;	

# 查询每个工种的平均工资
SELECT AVG(salary),job_id FROM employees GROUP BY job_id;

# 查询每个领导的手下人数（有的部门没有领导，需要过滤下）
SELECT COUNT(*),manager_id FROM employees WHERE manager_id IS NOT NULL GROUP BY manager_id;

# 查询邮箱中包含a字符的 每个部门的最高工资
SELECT MAX(salary) 最高工资 ,department_id FROM employees WHERE email LIKE '%a%' GROUP BY department_id;


# 查询每个领导手下有奖金的员工的平均工资
SELECT AVG(salary) 平均工资,manager_id FROM employees WHERE commission_pct IS NOT NULL GROUP BY manager_id;

# 查询哪个部门的员工个数>5
# 需要使用分组后筛选having
SELECT COUNT(*),department_id FROM employees GROUP BY department_id HAVING COUNT(*)>5;

# 分组函数做条件只可能放在having后面

# 求每个工种没有奖金的员工的最高工资>12000的工种编号和最高工资
SELECT MAX(salary),job_id FROM employees WHERE commission_pct IS NULL GROUP BY job_id HAVING MAX(salary)>12000;

# 领导编号>102的每个领导手下的最低工资大于5000的领导编号和最低工资
SELECT MIN(salary) 最低工资,manager_id FROM employees WHERE manager_id > 102 GROUP BY manager_id HAVING MIN(salary)>5000;

# 可以实现排序
# 查询每个工种没有奖金的员工的最高工资>6000的工种编号和最高工资，按最高工资升序
SELECT MAX(salary),job_id FROM employees WHERE commission_pct IS NULL GROUP BY job_id HAVING MAX(salary)>6000 ORDER BY MAX(salary) ASC;


# 按多个字段分组
# 查询每个工种每个部门的最低工资，并按先按工种升序再最低工资降序
SELECT MIN(salary),job_id,department_id FROM employees GROUP BY job_id,department_id ORDER BY job_id ASC,MIN(salary) DESC;


## 7、连接查询	 	★
USE girls;

# 笛卡尔乘积（错误实例）
# beauty 12行，boys4行，最终输出了12*4=48行。
SELECT `name`,`boyname` FROM beauty,boys;

# 正确查询
SELECT `name`,`boyname` FROM beauty,boys WHERE beauty.boyfriend_id = boys.id;


# 简单的两表连接
USE myemployees;
# 查询员工名和部门名
SELECT * FROM employees;
SELECT * FROM employees e,departments d WHERE e.department_id = d.department_id;
SELECT last_name,department_name FROM employees e,departments d WHERE e.department_id = d.department_id;

# SQL92语法
# 查询部门编号>100的部门名称和所在的城市名
SELECT department_id,department_name,city FROM departments d,locations l WHERE d.location_id = l.`location_id` AND d.`department_id`>100;

# 查询有奖金的员工名、部门名
SELECT `first_name`,`last_name`,`department_name` FROM `employees` e,`departments` d WHERE e.`department_id` = d.`department_id` AND e.`commission_pct` IS NOT NULL;

# 查询城市名中第二个字符为o的部门名和城市名
SELECT `department_name`,`city`  FROM `departments` d,`locations` l WHERE d.`location_id`=l.`location_id` AND l.`city` LIKE '_o%';

# 查询每个城市的部门个数
SELECT COUNT(*),l.city FROM `departments` d,`locations` l  WHERE d.`location_id` = l.`location_id` GROUP BY l.`city`;

# 查询有奖金的每个部门的部门名和部门的领导编号和该部门的最低工资
SELECT d.`department_name`,d.`manager_id`,MIN(salary) FROM `employees` e,`departments` d WHERE e.`department_id`=d.`department_id` GROUP BY d.`department_id`;

# 查询哪个部门的员工个数>5，并按员工个数进行降序
SELECT COUNT(*),d.`department_name` FROM `employees` e,`departments` d WHERE e.`department_id`=d.`department_id` GROUP BY d.`department_name` HAVING COUNT(*) >5 ORDER BY COUNT(*) DESC;


# 内连接 -> 等值连接：SQL99 与 SQL92语法 查询对比
# 查询有奖金的员工名、部门名（SQL92语法）
SELECT `first_name`,`last_name`,`department_name` FROM `employees` e,`departments` d WHERE e.`department_id` = d.`department_id` AND e.`commission_pct` IS NOT NULL;

# 查询有奖金的员工名、部门名（SQL99语法）
SELECT `first_name`,`last_name`,`department_name` FROM `employees` e JOIN `departments` d ON e.`department_id` = d.`department_id` WHERE e.`commission_pct` IS NOT NULL;

# 查询哪个部门的员工个数>5，并按员工个数进行降序（SQL92语法）
SELECT COUNT(*),d.`department_name` FROM `employees` e,`departments` d WHERE e.`department_id`=d.`department_id` GROUP BY d.`department_name` HAVING COUNT(*) >5 ORDER BY COUNT(*) DESC;

# 查询哪个部门的员工个数>5，并按员工个数进行降序（SQL99语法）
SELECT COUNT(*),d.`department_name` FROM `employees` e JOIN `departments` d ON e.`department_id`=d.`department_id` GROUP BY d.`department_name` HAVING COUNT(*) >5 ORDER BY COUNT(*) DESC;

# 内连接 -> 非等值连接（SQL99语法）
# 查询部门编号在10-90之间的员工的工资级别，并按级别进行分组
SELECT COUNT(*),`grade` FROM `employees` e JOIN `sal_grade` g ON e.`salary` WHERE e.`salary` BETWEEN g.`min_salary` AND g.`max_salary` GROUP BY g.`grade`;

# 内连接 -> 自连接（SQL99语法）
# 查询员工名和对应的领导名
SELECT e.`last_name`,m.`last_name` FROM `employees` e JOIN `employees` m ON e.`manager_id` = m.`employee_id`;


# 外连接（左连接、右连接）
/*
说明：查询结果为主表中所有的记录，如果从表有匹配项，则显示匹配项，如果从表没有匹配项，则显示null
应用场景：一般用于查询主标中有但从表中没有的记录
特点：
1. 外连接分主从表，两表的顺序不能任意调换。
2. 左连接的话，左边为主表
3. 右连接的话，右边为主表
语法：
# outer 可省略
select 查询列表
from 表1 别名
left|right [outer] join 表2 别名
on 连接条件
where 筛选条件;
*/
USE girls;
# 查询所有女神的记录，以及对应的男神名，如果没有对应的男神，则显示为null
# 左连接
SELECT * FROM beauty b LEFT JOIN boys bo ON b.`boyfriend_id` = bo.`id`;

# 查询所有男神的记录，以及对应的女神名
# 左连接
SELECT * FROM  boys bo LEFT JOIN beauty b ON b.`boyfriend_id` = bo.`id`;

# 右连接
SELECT * FROM beauty b RIGHT JOIN boys bo ON b.`boyfriend_id` = bo.`id`;

# 查询哪个女神没有男朋友，则显示为null
# 左连接
SELECT b.`name` FROM beauty b LEFT JOIN boys bo ON b.`boyfriend_id` = bo.`id` WHERE bo.`id` IS NULL;

# 右连接
SELECT b.`name` FROM boys bo RIGHT JOIN beauty b ON b.`boyfriend_id` = bo.`id` WHERE bo.`id` IS NULL;

# 5.8 子查询
/*
说明：当一个查询语句中又嵌套了另一个完整的select语句，则被嵌套的select语句称为子查询或内查询，外面的select语句称为主查询或外查询。
子查询不一定必须出现在语句内部，只是出现在语句内部的时候较多！
*/

# 单行子查询
# 查询和 Zlotkey 相同部门的员工姓名和工资
SELECT `last_name`,`salary` FROM `employees` WHERE `department_id` = (
 SELECT `department_id` FROM `employees` WHERE `last_name` = 'Zlotkey'
);

# 查询工资比公司平均工资高的员工的员工号，姓名和工资。
SELECT `employee_id`,`last_name`,`salary` FROM `employees` WHERE `salary`>(
 SELECT AVG(`salary`) FROM `employees`
);

# 多行子查询
# 返回location_id 是1400 或 1700 的部门中的所有员工姓名
SELECT `last_name` FROM `employees` WHERE `department_id` IN (
 SELECT `department_id` FROM `departments` WHERE `location_id` IN (1400,1700)
);

# 返回其他部门中比job_id为'IT_PROG'部门所有工资都低的员工的员工号、姓名、job_id 以及 salary
SELECT `employee_id`,`job_id`,`salary` FROM `employees` WHERE `salary` < ANY(
 SELECT DISTINCT `salary` FROM `employees` WHERE `job_id` = 'IT_PROG'
);


# 放到其他位置的子查询
# 放在select后面
SELECT (
 SELECT COUNT(*) FROM `employees` WHERE `department_id` = 50
) 个数;

# 放在from后面
# 查询每个部门的平均工资的工资级别
SELECT dep_ag.`department_id`,dep_ag.ag,`grade` FROM `sal_grade` g JOIN(
 SELECT AVG(`salary`) ag,`department_id` FROM `employees` GROUP BY `department_id`
) dep_ag ON dep_ag.ag BETWEEN g.`min_salary` AND g.`max_salary`;


# 放在exists后面
# 查询有无名字叫"张三丰"的员工信息
SELECT EXISTS(
 SELECT * FROM `employees` WHERE `last_name` = 'Abel'
) 有无Abel;

# 查询没有女朋友的男神信息
USE girls;
SELECT bo.* FROM boys bo WHERE bo.id NOT IN(
 SELECT `boyfriend_id` FROM `beauty` b
);

## 9、分页查询       ★
/*
公式：
假如要显示的页数是page，每页显示的条目数为size
SELECT * FROM `employees` limit (page-1)*size,size,

page size = 10
1	limit 0,10
2	limit 10,10
3	limit 20,10
4 	limit 30,10

*/
USE myemployees; 
# 查询员工信息表的前5条
SELECT  * FROM employees LIMIT 5;
SELECT  * FROM employees LIMIT 0,5;
SELECT  * FROM employees LIMIT 5,5;

# 查询有奖金的，且工资较高的第11名到第20名
SELECT * FROM `employees` WHERE  `commission_pct` IS NOT NULL ORDER BY `salary` DESC;
SELECT * FROM `employees` WHERE  `commission_pct` IS NOT NULL ORDER BY `salary` DESC LIMIT 10,20;


# UNION
SELECT * FROM `jobs` UNION
SELECT * FROM `china` UNION
SELECT * FROM `departments`;

SELECT 1,'test' UNION
SELECT 1,'test' UNION
SELECT 2,'test' UNION
SELECT 2,'test';

SELECT 1,'test' UNION ALL
SELECT 1,'test' UNION ALL
SELECT 2,'test' UNION ALL
SELECT 2,'test';


SET autocommit = 0;
START TRANSACTION;
UPDATE stuinfo SET age = age + 5 WHERE stuname = 'huangweijie';
UPDATE stuinfo SET age = age - 5 WHERE stuname = 'zhangwenli';
COMMIT; 	# 提交
ROLLBACK;   # 回滚



EXPLAIN SELECT DISTINCT `FileMark` FROM stdcontent;

EXPLAIN SELECT * FROM stdcontent WHERE filemark = 'filezyba2607rwmvnsxl9dpcq1goj835267b';

SHOW ENGINES;
SHOW INDEX FROM stdcontent;

SHOW VARIABLES LIKE '%lower_case%';

SHOW VARIABLES LIKE 'log_bin_trust_function_creators';

SELECT * FROM stdcontent WHERE id = 10;

SELECT * FROM stdcontent WHERE TYPE = "level40-mbH40" GROUP BY filemark;

SELECT filemark,TYPE FROM stdcontent WHERE TYPE = "level40-mbH40" GROUP BY filemark,idx;


DROP INDEX idx_plaintxt ON stdcontent;
CREATE FULLTEXT INDEX idx_plaintxt ON stdcontent(PlainTxt) WITH PARSER ngram;


SHOW VARIABLES LIKE 'ngram_token_size%';
REPAIR TABLE stdcontent QUICK;

SHOW INDEX FROM stdcontent;

SHOW VARIABLES LIKE '%innodb_ft_%';

SET innodb_ft_min_token_size = 1;

SHOW ENGINES;

EXPLAIN SELECT COUNT(*) AS `c` FROM `StdContent`

SHOW TABLES;

SHOW VARIABLES;

SHOW VARIABLES LIKE '%slow_query_log%';

SHOW VARIABLES LIKE '%LOG%';

SHOW VARIABLES LIKE 'long_query_time%';



