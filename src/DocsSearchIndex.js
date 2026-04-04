export const SEARCH_INDEX = [
  /* ── GET STARTED ── */
  
  // Introduction
  { title: 'Introduction', slug: 'introduction', group: 'Get Started', content: 'What the ChopAm API is, what data it provides, and who it\'s for. Nigerian foods, recipes, and ingredients. No authentication required.' },
  { title: 'What the API provides', pageTitle: 'Introduction', slug: 'introduction', anchor: 'what-the-api-provides', group: 'Get Started', content: 'Every food record includes recipes, cooking instructions, prep and cook times, ingredients, and regional variations.' },
  { title: 'Base URL', pageTitle: 'Introduction', slug: 'introduction', anchor: 'base-url', group: 'Get Started', content: 'All API endpoints are relative to https://api.chopam.xyz.' },
  { title: 'Who it\'s for', pageTitle: 'Introduction', slug: 'introduction', anchor: 'who-it-s-for', group: 'Get Started', content: 'App developers, recipe sites, food platforms, and diaspora food apps looking for substitutions.' },
  { title: 'What\'s in the database', pageTitle: 'Introduction', slug: 'introduction', anchor: 'whats-in-the-database', group: 'Get Started', content: 'Soups, rice dishes, swallows, street food, drinks, and desserts from across Nigeria.' },
  { title: 'No authentication required', pageTitle: 'Introduction', slug: 'introduction', anchor: 'no-authentication-required', group: 'Get Started', content: 'Read operations are fully open. Call the API directly from your frontend without a proxy.' },

  // Quick Start
  { title: 'Quick Start', slug: 'quickstart', group: 'Get Started', content: 'Make your first ChopAm API request in minutes without an API key.' },
  { title: '1. List all foods', pageTitle: 'Quick Start', slug: 'quickstart', anchor: '1-list-all-foods', group: 'Get Started', content: 'Send a GET request to /foods. Returns up to 15 results by default. JavaScript, Python, and cURL examples.' },
  { title: '2. Retrieve a single food', pageTitle: 'Quick Start', slug: 'quickstart', anchor: '2-get-a-single-food', group: 'Get Started', content: 'Use the slug (e.g., egusi-soup) to fetch the complete record with ingredients and cooking steps.' },
  { title: '3. Filter and search', pageTitle: 'Quick Start', slug: 'quickstart', anchor: '3-filter-and-search', group: 'Get Started', content: 'Narrow results using query parameters: q, category, region, tribe, tag, limit.' },
  { title: '4. Find foods by ingredient', pageTitle: 'Quick Start', slug: 'quickstart', anchor: '4-find-by-ingredient', group: 'Get Started', content: 'Find dishes featuring specific components like palm oil using /by/ingredient.' },
  { title: 'Next steps', pageTitle: 'Quick Start', slug: 'quickstart', anchor: 'next-steps', group: 'Get Started', content: 'Browse foods, get a single food, search by ingredient, or follow the filtering guide.' },

  /* ── CORE CONCEPTS ── */

  // Foods
  { title: 'Foods', slug: 'foods', group: 'Core Concepts', content: 'The core resource in the ChopAm API representing a Nigerian dish with its cultural context.' },
  { title: 'Fields', pageTitle: 'Foods', slug: 'foods', anchor: 'fields', group: 'Core Concepts', content: 'id (UUID v4), name, slug, description, region, tribe, category, tags, and recipe.' },
  { title: 'Example', pageTitle: 'Foods', slug: 'foods', anchor: 'example', group: 'Core Concepts', content: 'Sample JSON response for Egusi Soup including full recipe data.' },
  { title: 'createdAt', pageTitle: 'Foods', slug: 'foods', anchor: 'fields', group: 'Core Concepts', content: 'ISO 8601 timestamp for record creation.' },

  // Recipes
  { title: 'Recipes', slug: 'recipes', group: 'Core Concepts', content: 'Nested inside a Food object, containing everything needed to cook the dish. No standalone endpoint.' },
  { title: 'Fields', pageTitle: 'Recipes', slug: 'recipes', anchor: 'fields', group: 'Core Concepts', content: 'servings, prepTime, cookTime, difficulty (easy, medium, hard), tips, variations, ingredients, steps.' },
  { title: 'servings', pageTitle: 'Recipes', slug: 'recipes', anchor: 'fields', group: 'Core Concepts', content: 'Number of servings the recipe produces.' },
  { title: 'prepTime', pageTitle: 'Recipes', slug: 'recipes', anchor: 'fields', group: 'Core Concepts', content: 'Preparation time in minutes.' },
  { title: 'cookTime', pageTitle: 'Recipes', slug: 'recipes', anchor: 'fields', group: 'Core Concepts', content: 'Cooking time in minutes.' },
  { title: 'difficulty', pageTitle: 'Recipes', slug: 'recipes', anchor: 'fields', group: 'Core Concepts', content: 'Difficulty level: easy, medium, hard.' },
  { title: 'tips', pageTitle: 'Recipes', slug: 'recipes', anchor: 'fields', group: 'Core Concepts', content: 'Expert chef tips for the dish.' },
  { title: 'variations', pageTitle: 'Recipes', slug: 'recipes', anchor: 'fields', group: 'Core Concepts', content: 'Regional or personal recipe variations.' },

  // Ingredients
  { title: 'Ingredients', slug: 'ingredients', group: 'Core Concepts', content: 'Description of what is needed to cook a dish: quantities, notes, and substitutes.' },
  { title: 'Fields', pageTitle: 'Ingredients', slug: 'ingredients', anchor: 'fields', group: 'Core Concepts', content: 'name (with local parentheses), quantity, substitutes, and preperation notes.' },
  { title: 'Common substitutes', pageTitle: 'Ingredients', slug: 'ingredients', anchor: 'common-substitutes', group: 'Core Concepts', content: 'Egusi (melon seeds) -> pumpkin seeds, Stockfish -> salted cod, Uziza -> scent leaves, Iru -> miso paste.' },

  /* ── API REFERENCE ── */

  // API Overview
  { title: 'API Overview', slug: 'api-overview', group: 'API Reference', content: 'Base URL, versioning, root endpoint, and available endpoints.' },
  { title: 'Root endpoint', pageTitle: 'API Overview', slug: 'api-overview', anchor: 'root-endpoint', group: 'API Reference', content: 'GET / returns API name, version, and a summary of endpoints.' },
  { title: 'Available endpoints', pageTitle: 'API Overview', slug: 'api-overview', anchor: 'available-endpoints', group: 'API Reference', content: 'List foods, get single food, search by ingredient.' },
  { title: 'Response envelope', pageTitle: 'API Overview', slug: 'api-overview', anchor: 'response-envelope', group: 'API Reference', content: 'Standard JSON: { success: true, data: { ... } } or { success: false, error: "..." }.' },

  // List Foods
  { title: 'List Foods', slug: 'list-foods', group: 'API Reference', content: 'GET /foods returns a paginated list of Nigerian foods. Recipes are excluded.' },
  { title: 'Query parameters', pageTitle: 'List Foods', slug: 'list-foods', anchor: 'query-parameters', group: 'API Reference', content: 'q (search string), region, tribe, category, tag, limit (default 15).' },
  { title: 'Example request', pageTitle: 'List Foods', slug: 'list-foods', anchor: 'example-request', group: 'API Reference', content: 'Sample GET /foods?category=soup requests.' },
  { title: 'Example response', pageTitle: 'List Foods', slug: 'list-foods', anchor: 'example-response', group: 'API Reference', content: 'Success 200 response with food list.' },

  // Get Food
  { title: 'Get Food', slug: 'get-food', group: 'API Reference', content: 'GET /foods/:slug returns a single food with its full recipe and cooking instructions.' },
  { title: 'Path parameters', pageTitle: 'Get Food', slug: 'get-food', anchor: 'path-parameters', group: 'API Reference', content: 'slug (URL-safe identifier like jollof-rice).' },
  { title: 'Example request', pageTitle: 'Get Food', slug: 'get-food', anchor: 'example-request', group: 'API Reference', content: 'Sample request for GET /foods/egusi-soup.' },
  { title: 'Example response', pageTitle: 'Get Food', slug: 'get-food', anchor: 'example-response', group: 'API Reference', content: 'Success response with recipe data and steps.' },

  // By Ingredient
  { title: 'By Ingredient', slug: 'by-ingredient', group: 'API Reference', content: 'GET /foods/by/ingredient find foods containing specific components. Partial name match.' },
  { title: 'Query parameters', pageTitle: 'By Ingredient', slug: 'by-ingredient', anchor: 'query-parameters', group: 'API Reference', content: 'name (required) - ingredient to search for.' },

  /* ── GUIDES ── */

  // Searching
  { title: 'Searching', slug: 'searching', group: 'Guides', content: 'Search Nigerian foods by name, description, or ingredient.' },
  { title: 'Full-text search', pageTitle: 'Searching', slug: 'searching', anchor: 'full-text-search', group: 'Guides', content: 'Search across name and description fields using ?q= param.' },
  { title: 'Search by ingredient', pageTitle: 'Searching', slug: 'searching', anchor: 'search-by-ingredient', group: 'Guides', content: 'Find all foods that use a specific ingredient using GET /foods/by/ingredient.' },
  { title: 'Combining parameters', pageTitle: 'Searching', slug: 'searching', anchor: 'combining-parameters', group: 'Guides', content: 'Search with ?q= and limit=5 for narrow results.' },

  // Filtering
  { title: 'Filtering', slug: 'filtering', group: 'Guides', content: 'Filter Nigerian foods by region, tribe, category, and tag.' },
  { title: 'Filter by region', pageTitle: 'Filtering', slug: 'filtering', anchor: 'filter-by-region', group: 'Guides', content: 'South West, South South, South East, North, Nationwide.' },
  { title: 'Filter by tribe', pageTitle: 'Filtering', slug: 'filtering', anchor: 'filter-by-tribe', group: 'Guides', content: 'Ethnic filters: Yoruba, Igbo, Hausa, Edo, Ijaw, etc.' },
  { title: 'Filter by category', pageTitle: 'Filtering', slug: 'filtering', anchor: 'filter-by-category', group: 'Guides', content: 'Soup, rice dish, street food, snack, swallow, side dish.' },
  { title: 'Filter by tag', pageTitle: 'Filtering', slug: 'filtering', anchor: 'filter-by-tag', group: 'Guides', content: 'Festive, everyday, popular, party tags.' },

  // Pagination
  { title: 'Pagination', slug: 'pagination', group: 'Guides', content: 'Control result count using the limit parameter. Default 15.' },
  { title: 'Default behaviour', pageTitle: 'Pagination', slug: 'pagination', anchor: 'default-behaviour', group: 'Guides', content: 'GET /foods returns 15 results without offset.' },
  { title: 'Setting a custom limit', pageTitle: 'Pagination', slug: 'pagination', anchor: 'setting-a-custom-limit', group: 'Guides', content: 'Request all matching records by setting a large limit.' },
  { title: 'Total field', pageTitle: 'Pagination', slug: 'pagination', anchor: 'the-total-field', group: 'Guides', content: 'Reflects the actual number of items returned in the response.' },

  // Response Format
  { title: 'Response Format', slug: 'response-format', group: 'Guides', content: 'Consistent JSON structure for all API results.' },
  { title: 'Success response', pageTitle: 'Response Format', slug: 'response-format', anchor: 'success-response', group: 'Guides', content: 'Status 200 with success: true and data object.' },
  { title: 'Error response', pageTitle: 'Response Format', slug: 'response-format', anchor: 'error-response', group: 'Guides', content: 'Status 400/404 with success: false and error message.' },
  { title: 'HTTP status codes', pageTitle: 'Response Format', slug: 'response-format', anchor: 'http-status-codes', group: 'Guides', content: '200 (OK), 400 (Bad Request), 404 (Not Found).' },

  // Errors
  { title: 'Errors', slug: 'errors', group: 'Guides', content: 'How the API signals errors and what each error means.' },
  { title: 'Error envelope', pageTitle: 'Errors', slug: 'errors', anchor: 'error-envelope', group: 'Guides', content: 'success: false, error: description.' },
  { title: 'Common errors', pageTitle: 'Errors', slug: 'errors', anchor: 'common-errors', group: 'Guides', content: 'Food not found, missing name param, route doesn\'t exist.' },
  { title: 'Handling errors in JavaScript', pageTitle: 'Errors', slug: 'errors', anchor: 'handling-errors-in-javascript', group: 'Guides', content: 'Check success boolean and log body.error with response.status.' },

  /* ── TECHNICAL TERMS (EXHAUSTIVE) ── */
  { title: 'UUID v4', slug: 'foods', anchor: 'fields', group: 'Core Concepts', content: 'The id field in the food resource is a unique identifier (UUID v4).' },
  { title: 'Yoruba', slug: 'filtering', anchor: 'filter-by-tribe', group: 'Guides', content: 'Filter foods by Yoruba ethnic group.' },
  { title: 'Igbo', slug: 'filtering', anchor: 'filter-by-tribe', group: 'Guides', content: 'Filter foods by Igbo ethnic group.' },
  { title: 'Hausa', slug: 'filtering', anchor: 'filter-by-tribe', group: 'Guides', content: 'Filter foods by Hausa ethnic group.' },
  { title: 'South West', slug: 'filtering', anchor: 'filter-by-region', group: 'Guides', content: 'Filter foods from Lagos, Ogun, Oyo, Osun, Ondo, Ekiti.' },
  { title: 'South South', slug: 'filtering', anchor: 'filter-by-region', group: 'Guides', content: 'Filter foods from Rivers, Delta, Bayelsa, Cross River, Edo, Akwa Ibom.' },
  { title: 'Soup', slug: 'filtering', anchor: 'filter-by-category', group: 'Guides', content: 'Filter by thick soups served with swallows (Egusi, Banga, Oha, Afang).' },
  { title: 'Rice dish', slug: 'filtering', anchor: 'filter-by-category', group: 'Guides', content: 'Filter by rice-based meals (Jollof Rice, Ofada Rice, Coconut Rice).' },
  { title: 'Palm Oil', slug: 'searching', anchor: 'search-by-ingredient', group: 'Guides', content: 'Find dishes using palm oil.' },
  { title: 'Uziza', slug: 'ingredients', anchor: 'common-substitutes', group: 'Core Concepts', content: 'Uziza leaves used in African cooking. Substitute with scent leaves.' },
  { title: '404 error', slug: 'response-format', anchor: 'http-status-codes', group: 'Guides', content: 'Not Found — the requested food slug or route does not exist.' },
  { title: '400 error', slug: 'response-format', anchor: 'http-status-codes', group: 'Guides', content: 'Bad Request — a required parameter is missing or invalid.' },
  { title: '200 OK', slug: 'response-format', anchor: 'http-status-codes', group: 'Guides', content: 'The request succeeded and the response contains data.' },
  { title: 'fetch', slug: 'quickstart', anchor: '1-list-all-foods', group: 'Get Started', content: 'JavaScript fetch API used to make network requests.' },
  { title: 'URLSearchParams', slug: 'quickstart', anchor: '3-filter-and-search', group: 'Get Started', content: 'JavaScript object to handle query parameters easily.' },
  { title: 'requests.get', slug: 'quickstart', anchor: '1-list-all-foods', group: 'Get Started', content: 'Python Requests library for making HTTP GET calls.' },
  { title: 'curl', slug: 'quickstart', anchor: '1-list-all-foods', group: 'Get Started', content: 'Command line tool for making network requests.' }
];
