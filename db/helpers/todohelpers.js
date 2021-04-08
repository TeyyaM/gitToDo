const generateTodoHelpers = (pool) => {

  const fetchTodoByCategory = (categoryId, userId) => {
    const queryParams = [userId];
    let query = `SELECT todos.id, todos.name, deadline, categories.name as category_name
    FROM todos
    JOIN categories ON todos.category_id = categories.id
    WHERE user_id = $1 AND date_completed IS NULL`;
    if (categoryId !== "all") {
      query += ` AND category_id = $2`;
      queryParams.push(categoryId);
    }
    return pool.query(query, queryParams);
  };

  const fetchTodoByTodoId = (todoId, userId) => {
    const query = `SELECT todos.name, todos.deadline, todos.date_added,
    todos.date_completed, todos.note, categories.name as category
    FROM todos
    JOIN categories ON categories.id = todos.category_id
    WHERE todos.user_id = $1 AND todos.id = $2;`;
    const queryParams = [userId, todoId];
    return pool.query(query, queryParams);
  };

  return {
    fetchTodoByCategory,
    fetchTodoByTodoId
  };
};

module.exports = generateTodoHelpers;
