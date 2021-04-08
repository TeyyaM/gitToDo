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
  return { fetchTodoByCategory };
};

module.exports = generateTodoHelpers;
