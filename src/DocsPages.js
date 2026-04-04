import React from 'react';
import { Link } from 'react-router-dom';
import { CodeBlock, CodeGroup, EndpointBadge, ParamTable, Callout, ResponseField, Steps, Step } from './DocsComponents';
import { HugeiconsIcon } from '@hugeicons/react';
import { 
  PhoneDeveloperModeIcon, 
  BookOpen01Icon, 
  ChefHatIcon, 
  GlobalSearchIcon,
  Task01Icon,
  File01Icon,
  FilterIcon,
  ArrowRight01Icon,
  ClipboardIcon
} from '@hugeicons/core-free-icons';

const CardGrid = ({ cards }) => (
  <div className="card-grid">
    {cards.map((c, i) => {
      const inner = (
        <>
          <span className="feature-icon">{c.icon}</span>
          <h4>{c.title}</h4>
          <p>{c.desc}</p>
        </>
      );
      return c.link
        ? <Link key={i} className="feature-card" to={c.link}>{inner}</Link>
        : <div key={i} className="feature-card">{inner}</div>;
    })}
  </div>
);

/* ═══════════════════════════════════
   ALL PAGE CONTENT
   ═══════════════════════════════════ */

const Introduction = () => (
  <>
    <h1>Introduction</h1>
    <p className="lead">
      What the ChopAm API is, what data it provides, and who it's for.
    </p>
    <p>
      The ChopAm API is a REST API that gives you access to a curated database of Nigerian foods, recipes, and ingredients.
      It covers the full breadth of Nigerian culinary heritage — from everyday staples to festive dishes — organized by region, tribe, category, and ingredient.
    </p>
    <Callout type="note">
      Read operations require no authentication. You can start making requests immediately — no API key or account needed.
    </Callout>

    <h2 id="what-the-api-provides">What the API provides</h2>
    <p>Every food record includes a full recipe with step-by-step cooking instructions, prep and cook times, ingredient lists, serving sizes, chef tips, and regional variations.</p>
    <p>The data is organized across five dimensions:</p>
    <ul>
      <li><strong>Foods</strong> — the core catalogue of Nigerian dishes, each with a unique slug and full recipe</li>
      <li><strong>Recipes</strong> — detailed cooking instructions: ingredients, steps, servings, difficulty, and tips</li>
      <li><strong>Ingredients</strong> — individual components with local names, diaspora substitutions, and usage across dishes</li>
      <li><strong>Regions</strong> — geographic groupings such as South West, North, South South, and Nationwide</li>
      <li><strong>Tribes</strong> — ethnic associations including Yoruba, Igbo, Hausa, Edo, Ijaw, and more</li>
    </ul>

    <h2 id="base-url">Base URL</h2>
    <p>All API endpoints are relative to:</p>
    <CodeBlock title="Production">https://api.chopam.xyz</CodeBlock>
    <p>For example, to list all foods:</p>
    <CodeGroup>
      <CodeBlock title="cURL">curl https://api.chopam.xyz/foods</CodeBlock>
      <CodeBlock title="JavaScript">{`fetch('https://api.chopam.xyz/foods')
  .then(res => res.json())
  .then(data => console.log(data));`}</CodeBlock>
      <CodeBlock title="Python">{`import requests

response = requests.get('https://api.chopam.xyz/foods')
print(response.json())`}</CodeBlock>
    </CodeGroup>
    <h2 id="who-it-s-for">Who it's for</h2>
    <CardGrid cards={[
      { icon: <HugeiconsIcon icon={PhoneDeveloperModeIcon} />, title: 'App developers', desc: 'Add Nigerian food data to your mobile or web app with a few HTTP requests.' },
      { icon: <HugeiconsIcon icon={BookOpen01Icon} />, title: 'Recipe sites', desc: 'Power recipe pages with rich, structured content including steps, tips, and variations.' },
      { icon: <HugeiconsIcon icon={ChefHatIcon} />, title: 'Food platforms', desc: 'Browse, search, and filter a curated catalogue of Nigerian dishes.' },
      { icon: <HugeiconsIcon icon={GlobalSearchIcon} />, title: 'Diaspora food apps', desc: 'Ingredient substitution notes help diaspora cooks find local alternatives.' },
    ]} />

    <h2 id="whats-in-the-database">What's in the database</h2>
    <p>The catalogue includes dishes from all major Nigerian culinary traditions:</p>
    <ul>
      <li>Soups: Egusi, Banga, Oha, Afang, Okra</li>
      <li>Rice dishes: Jollof Rice, Ofada Rice, Coconut Rice</li>
      <li>Swallows and accompaniments: Pounded Yam, Eba, Amala</li>
      <li>Street food: Suya, Bole, Akara, Puff Puff</li>
      <li>Drinks and desserts: Zobo, Kunu, Chin Chin</li>
    </ul>

    <h2 id="no-authentication-required">No authentication required</h2>
    <p>Read operations — listing foods, retrieving a recipe, searching by ingredient — are fully open.</p>
    <Callout type="tip">
      If you're building a public-facing app, you can call the API directly from your frontend. No backend proxy is required for read requests.
    </Callout>
  </>
);

const Quickstart = () => (
  <>
    <h1>Quick Start</h1>
    <p className="lead">Make your first ChopAm API request in minutes — no API key required.</p>
    <Callout type="note">
      All examples use <code>https://api.chopam.xyz</code>. Replace with <code>http://localhost:8000</code> if running locally.
    </Callout>

    <Steps>
      <Step n={1} title="List all foods" id="1-list-all-foods">
        <p>Send a <code>GET</code> request to <code>/foods</code>. Returns up to 15 results by default.</p>
        <CodeGroup>
          <CodeBlock title="cURL">curl https://api.chopam.xyz/foods</CodeBlock>
          <CodeBlock title="JavaScript">{`const response = await fetch('https://api.chopam.xyz/foods');
const data = await response.json();
console.log(data.data.foods);`}</CodeBlock>
          <CodeBlock title="Python">{`import requests

response = requests.get('https://api.chopam.xyz/foods')
print(response.json()['data']['foods'])`}</CodeBlock>
        </CodeGroup>
      </Step>

      <Step n={2} title="Retrieve a single food with its full recipe" id="2-get-a-single-food">
        <p>Use the food's <code>slug</code> to fetch the complete record with ingredients and cooking steps.</p>
        <CodeGroup>
          <CodeBlock title="cURL">curl https://api.chopam.xyz/foods/egusi-soup</CodeBlock>
          <CodeBlock title="JavaScript">{`const response = await fetch('https://api.chopam.xyz/foods/egusi-soup');
const data = await response.json();
const { name, recipe } = data.data;
console.log(name, recipe.ingredients);`}</CodeBlock>
          <CodeBlock title="Python">{`import requests

response = requests.get('https://api.chopam.xyz/foods/egusi-soup')
data = response.json()['data']
print(data['name'], data['recipe']['ingredients'])`}</CodeBlock>
        </CodeGroup>
      </Step>

      <Step n={3} title="Filter and search" id="3-filter-and-search">
        <p>Narrow results using query parameters. All filters can be combined.</p>
        <ParamTable params={[
          { name: 'q', type: 'string', desc: 'Search by name or description',example:"?q=pepper soup" },
          { name: 'category', type: 'string', desc: 'Filter by food category',example:"?category=soup" },
          { name: 'region', type: 'string', desc: 'Filter by geographic region',example:"?region=South West" },
          { name: 'tribe', type: 'string', desc: 'Filter by ethnic group',example:"?tribe=Yoruba" },
          { name: 'tag', type: 'string', desc: 'Filter by tag',example:'?tag=festive' },
          { name: 'limit', type: 'number', desc: 'Number of results (default: 15)',example:"?limit=5" },
        ]} />
        <CodeGroup>
          <CodeBlock title="cURL">curl "https://api.chopam.xyz/foods?category=soup&tribe=Igbo&limit=5"</CodeBlock>
          <CodeBlock title="JavaScript">{`const params = new URLSearchParams({ category: 'soup', tribe: 'Igbo', limit: '5' });
const res = await fetch(\`https://api.chopam.xyz/foods?\${params}\`);
const { data } = await res.json();
console.log(data.foods);`}</CodeBlock>
          <CodeBlock title="Python">{`import requests

params = {'category': 'soup', 'tribe': 'Igbo', 'limit': 5}
response = requests.get('https://api.chopam.xyz/foods', params=params)
print(response.json()['data']['foods'])`}</CodeBlock>
        </CodeGroup>
      </Step>

      <Step n={4} title="Find foods by ingredient" id="4-find-by-ingredient">
        <p>Use the <code>/by/ingredient</code> endpoint to find dishes featuring specific components.</p>
        <CodeGroup>
          <CodeBlock title="cURL">curl "https://api.chopam.xyz/foods/by/ingredient?name=palm+oil"</CodeBlock>
          <CodeBlock title="JavaScript">{`const response = await fetch(
  'https://api.chopam.xyz/foods/by/ingredient?name=palm+oil'
);
const data = await response.json();
console.log(\`\${data.data.total} dishes use palm oil\`);`}</CodeBlock>
          <CodeBlock title="Python">{`import requests

params = {'name': 'palm oil'}
response = requests.get('https://api.chopam.xyz/foods/by/ingredient', params=params)
data = response.json()['data']
print(f"{data['total']} dishes use palm oil")`}</CodeBlock>
        </CodeGroup>
      </Step>
    </Steps>

    <h2>Next steps</h2>
    <CardGrid cards={[
      { icon: <HugeiconsIcon icon={Task01Icon} />, title: 'Browse foods', desc: 'Full reference for listing, searching, and filtering the food catalogue.', link: '/docs/list-foods' },
      { icon: <HugeiconsIcon icon={File01Icon} />, title: 'Get a single food', desc: 'Retrieve a complete food record with its recipe by slug.', link: '/docs/get-food' },
      { icon: <HugeiconsIcon icon={GlobalSearchIcon} />, title: 'Search by ingredient', desc: 'Find all dishes that use a specific ingredient.', link: '/docs/by-ingredient' },
      { icon: <HugeiconsIcon icon={FilterIcon} />, title: 'Filtering guide', desc: 'Filter by region, tribe, category and tag.', link: '/docs/filtering' },
    ]} />
  </>
);

const Foods = () => (
  <>
    <h1>Foods</h1>
    <p className="lead">The Food object is the core resource in the ChopAm API — it represents a Nigerian dish along with its cultural context.</p>
    <p>When you list foods via <code>GET /foods</code>, the API returns food objects <strong>without</strong> the nested recipe. Use <code>GET /foods/:slug</code> to get the full recipe.</p>
    <h2 id="fields">Fields</h2>
    <ResponseField name="id" type="string" required>Unique identifier (UUID v4).</ResponseField>
    <ResponseField name="name" type="string" required>Display name of the dish (e.g., "Egusi Soup").</ResponseField>
    <ResponseField name="slug" type="string" required>URL-safe identifier. Use to fetch a single food: <code>GET /foods/egusi-soup</code></ResponseField>
    <ResponseField name="description" type="string">Short human-readable summary of the dish.</ResponseField>
    <ResponseField name="region" type="string">Nigerian region — Nationwide, South West, South South, South East, North.</ResponseField>
    <ResponseField name="tribe" type="string[]">Ethnic groups — Yoruba, Igbo, Hausa, Edo, Ijaw, etc.</ResponseField>
    <ResponseField name="category" type="string">Dish type — soup, rice dish, swallow, street food, snack, side dish, porridge.</ResponseField>
    <ResponseField name="tags" type="string[]">Labels — everyday, festive, party, spicy, grilled, popular, etc.</ResponseField>
    <ResponseField name="recipe" type="object">Full recipe. Only present on single-food responses.</ResponseField>
    <ResponseField name="createdAt" type="string">ISO 8601 timestamp.</ResponseField>
    <h2 id="example">Example</h2>
    <CodeBlock title="GET /foods/egusi-soup">{`{
  "id": "c81c3944-753c-438e-8c88-17e8050dba45",
  "name": "Egusi Soup",
  "slug": "egusi-soup",
  "description": "A thick, hearty soup made from ground melon seeds, leafy greens, and assorted proteins. One of Nigeria's most beloved soups.",
  "region": "Nationwide",
  "tribe": ["Yoruba", "Igbo", "Edo"],
  "category": "soup",
  "tags": ["everyday", "festive", "popular"],
  "recipe": { ... },
  "createdAt": "2026-04-03T16:21:11.245Z"
}`}</CodeBlock>
    <Callout type="note">The <code>recipe</code> field is omitted from list responses. Use <code>GET /foods/:slug</code> to include it.</Callout>
  </>
);

const Recipes = () => (
  <>
    <h1>Recipes</h1>
    <p className="lead">A Recipe is always nested inside a Food object and contains everything needed to cook the dish.</p>
    <p>Recipes are only returned when you fetch a food by slug. There is no standalone <code>/recipes</code> endpoint.</p>
    <h2 id="fields">Fields</h2>
    <ResponseField name="servings" type="number">Number of servings the recipe produces.</ResponseField>
    <ResponseField name="prepTime" type="number">Preparation time in minutes.</ResponseField>
    <ResponseField name="cookTime" type="number">Cooking time in minutes.</ResponseField>
    <ResponseField name="difficulty" type="string">One of: <code>easy</code>, <code>medium</code>, <code>hard</code>.</ResponseField>
    <ResponseField name="tips" type="string">Expert tip for getting the dish right.</ResponseField>
    <ResponseField name="variations" type="string[]">Regional or personal variations.</ResponseField>
    <ResponseField name="ingredients" type="object[]">Each has <code>name</code>, <code>quantity</code>, optional <code>substitutes</code> and <code>notes</code>.</ResponseField>
    <ResponseField name="steps" type="object[]">Ordered steps — each has <code>order</code> and <code>instruction</code>.</ResponseField>
    <h2 id="example">Example</h2>
    <CodeBlock title="Recipe object">{`{
  "servings": 6,
  "prepTime": 20,
  "cookTime": 60,
  "difficulty": "medium",
  "tips": "Fry the egusi in palm oil before adding stock...",
  "variations": ["Use uziza leaves instead of bitterleaf"],
  "ingredients": [
    { "name": "Egusi (Melon Seeds)", "quantity": "2 cups", "substitutes": ["pumpkin seeds"] },
    { "name": "Palm Oil", "quantity": "½ cup" }
  ],
  "steps": [
    { "order": 1, "instruction": "Season beef and ponmo..." },
    { "order": 2, "instruction": "Heat palm oil in a pot..." }
  ]
}`}</CodeBlock>
    <Callout type="tip">Use <code>prepTime + cookTime</code> to calculate total time. Egusi Soup: 20 + 60 = 80 minutes total.</Callout>
  </>
);

const Ingredients = () => (
  <>
    <h1>Ingredients</h1>
    <p className="lead">Ingredients are embedded in recipes and describe what you need to cook a dish, including quantities, notes, and substitutes for hard-to-find items.</p>
    <p>There is no standalone <code>/ingredients</code> endpoint. Use <code>GET /foods/by/ingredient?name=...</code> to search by ingredient.</p>
    <h2 id="fields">Fields</h2>
    <ResponseField name="name" type="string" required>Ingredient name, may include local name in parentheses — e.g., "Egusi (Melon Seeds)".</ResponseField>
    <ResponseField name="quantity" type="string" required>Amount — e.g., "2 cups", "500g", "½ cup".</ResponseField>
    <ResponseField name="substitutes" type="string[]">Alternative ingredients when the original is unavailable.</ResponseField>
    <ResponseField name="notes" type="string">Preparation instructions — e.g., "washed and squeezed".</ResponseField>
    <h2 id="common-substitutes">Common substitutes</h2>
    <ParamTable 
      headers={['Ingredient', 'Common Substitute']}
      params={[
        { name: 'Egusi (Melon Seeds)', type: 'sub', desc: 'Pumpkin seeds' },
        { name: 'Stockfish', type: 'sub', desc: 'Salted cod' },
        { name: 'Iru (Locust Beans)', type: 'sub', desc: 'Miso paste' },
        { name: 'Scotch Bonnet', type: 'sub', desc: 'Habanero' },
        { name: 'Uziza Leaves', type: 'sub', desc: 'Scent leaves' },
        { name: 'White Yam', type: 'sub', desc: 'Taro (closest texture)' },
      ]} 
    />
    <Callout type="tip">The <code>substitutes</code> field is the most valuable data point for diaspora-focused apps. Use it to surface alternative shopping lists.</Callout>
  </>
);

const ApiOverview = () => (
  <>
    <h1>API Overview</h1>
    <p className="lead">Base URL, versioning, and general information about the ChopAm API.</p>
    <Callout type="note">No authentication is required for any read endpoint.</Callout>
    <h2 id="base-url">Base URL</h2>
    <CodeGroup>
      <CodeBlock title="Production">https://api.chopam.xyz</CodeBlock>
      <CodeBlock title="Local">http://localhost:8000</CodeBlock>
    </CodeGroup>
    <h2 id="root-endpoint">Root endpoint</h2>
    <EndpointBadge method="GET" path="/" />
    <p>Returns the API name, version, and a summary of available endpoints.</p>
    <CodeGroup>
      <CodeBlock title="cURL">curl https://api.chopam.xyz/</CodeBlock>
      <CodeBlock title="JavaScript">{`const res = await fetch('https://api.chopam.xyz/');
console.log(await res.json());`}</CodeBlock>
      <CodeBlock title="Python">{`import requests
print(requests.get('https://api.chopam.xyz/').json())`}</CodeBlock>
    </CodeGroup>
    <CodeBlock title="Response">{`{
  "name": "ChopAm API",
  "version": "2.0.0",
  "endpoints": {
    "GET /foods": "List all foods (query: q, region, tribe, category, tag, limit)",
    "GET /foods/:slug": "Single food with full recipe + ingredients",
    "GET /foods/by/ingredient?name=": "Foods that use an ingredient"
  }
}`}</CodeBlock>
    <h2 id="available-endpoints">Available endpoints</h2>
    <ParamTable 
      headers={['Endpoint', 'Description']}
      params={[
        { name: 'GET /foods', type: 'list', desc: 'List, search, and filter the food catalogue' },
        { name: 'GET /foods/:slug', type: 'detail', desc: 'Get a single food with its full recipe' },
        { name: 'GET /foods/by/ingredient', type: 'search', desc: 'Find foods containing a specific ingredient' },
      ]} 
    />
    <h2 id="response-envelope">Response envelope</h2>
    <CodeBlock title="Success">{`{ "success": true, "data": { ... } }`}</CodeBlock>
    <CodeBlock title="Error">{`{ "success": false, "error": "Human-readable message" }`}</CodeBlock>
  </>
);

const ListFoods = () => (
  <>
    <h1>List Foods</h1>
    <EndpointBadge method="GET" path="/foods" />
    <p className="lead">Returns a paginated list of Nigerian foods. Recipe details are excluded for performance.</p>
    <h2 id="query-parameters">Query parameters</h2>
    <ParamTable params={[
      { name: 'q', type: 'string', desc: 'Full-text search across name and description (case-insensitive substring)' },
      { name: 'region', type: 'string', desc: 'Filter by region — "South West", "North", "Nationwide", etc.' },
      { name: 'tribe', type: 'string', desc: 'Filter by ethnic group — "Yoruba", "Igbo", "Hausa", etc.' },
      { name: 'category', type: 'string', desc: 'Filter by category — "soup", "rice dish", "snack", etc.' },
      { name: 'tag', type: 'string', desc: 'Filter by tag — "festive", "everyday", "popular", etc.' },
      { name: 'limit', type: 'number', desc: 'Max results to return. Default: 15' },
    ]} />
    <h2 id="example-request">Example request</h2>
    <CodeGroup>
      <CodeBlock title="cURL">curl "https://api.chopam.xyz/foods?category=soup&limit=2"</CodeBlock>
      <CodeBlock title="JavaScript">{`const { success, data } = await fetch(
  'https://api.chopam.xyz/foods?category=soup&limit=2'
).then(r => r.json());

if (success) console.log(data.foods);`}</CodeBlock>
      <CodeBlock title="Python">{`import requests

params = {'category': 'soup', 'limit': 2}
response = requests.get('https://api.chopam.xyz/foods', params=params)
data = response.json()

if data['success']:
    print(data['data']['foods'])`}</CodeBlock>
    </CodeGroup>
    <h2 id="example-response">Example response</h2>
    <CodeBlock title="200 OK">{`{
  "success": true,
  "data": {
    "total": 2,
    "foods": [
      {
        "id": "c81c3944-...",
        "name": "Egusi Soup",
        "slug": "egusi-soup",
        "description": "A thick, hearty soup made from ground melon seeds, leafy greens, and assorted proteins. One of Nigeria's most beloved soups.",
        "region": "Nationwide",
        "tribe": ["Yoruba", "Igbo", "Edo"],
        "category": "soup",
        "tags": ["everyday", "festive", "popular"],
        "createdAt": "2026-04-03T16:21:11.245Z"
      }
    ]
  }
}`}</CodeBlock>
    <Callout type="note">The <code>recipe</code> field is omitted from list responses. Use <strong>Get Food</strong> to retrieve the full recipe.</Callout>
  </>
);

const GetFood = () => (
  <>
    <h1>Get Food</h1>
    <EndpointBadge method="GET" path="/foods/:slug" />
    <p className="lead">Returns a single food with its complete recipe, cooking instructions, and ingredient list.</p>
    <h2 id="path-parameters">Path parameters</h2>
    <ParamTable params={[
      { name: 'slug', type: 'string', required: true, desc: 'URL-safe food identifier — e.g., "egusi-soup", "jollof-rice"' },
    ]} />
    <h2 id="example-request">Example request</h2>
    <CodeGroup>
      <CodeBlock title="cURL">curl "https://api.chopam.xyz/foods/egusi-soup"</CodeBlock>
      <CodeBlock title="JavaScript">{`const { success, data } = await fetch(
  'https://api.chopam.xyz/foods/egusi-soup'
).then(r => r.json());

if (success) {
  const { name, recipe } = data;
  console.log(\`\${name} — serves \${recipe.servings}\`);
}`}</CodeBlock>
      <CodeBlock title="Python">{`import requests

response = requests.get('https://api.chopam.xyz/foods/egusi-soup')
data = response.json()

if data['success']:
    food = data['data']
    print(f"{food['name']} — serves {food['recipe']['servings']}")`}</CodeBlock>
    </CodeGroup>
    <h2 id="example-response">Example response</h2>
    <CodeBlock title="200 OK">{`{
  "success": true,
  "data": {
    "id": "c81c3944-...",
    "name": "Egusi Soup",
    "slug": "egusi-soup",
    "region": "Nationwide",
    "tribe": ["Yoruba", "Igbo", "Edo"],
    "category": "soup",
    "tags": ["everyday", "festive", "popular"],
    "recipe": {
      "servings": 6,
      "prepTime": 20,
      "cookTime": 60,
      "difficulty": "medium",
      "tips": "Fry the egusi in palm oil before adding stock...",
      "ingredients": [
        { "name": "Egusi (Melon Seeds)", "quantity": "2 cups" }
      ],
      "steps": [
        { "order": 1, "instruction": "Season beef and ponmo..." }
      ]
    },
    "createdAt": "2026-04-03T16:21:11.245Z"
  }
}`}</CodeBlock>
    <h3>404 — Food not found</h3>
    <CodeBlock title="404">{'{ "success": false, "error": "Food not found" }'}</CodeBlock>
  </>
);

const ByIngredient = () => (
  <>
    <h1>By Ingredient</h1>
    <EndpointBadge method="GET" path="/foods/by/ingredient" />
    <p className="lead">Returns all foods whose recipe contains a specific ingredient — case-insensitive, partial match.</p>
    <Callout type="warning">The <code>name</code> query parameter is required. Omitting it returns a 400 error.</Callout>
    <h2 id="query-parameters">Query parameters</h2>
    <ParamTable params={[
      { name: 'name', type: 'string', required: true, desc: 'Ingredient name — partial, case-insensitive. "palm" matches "Palm Oil", "Palm Kernel Oil", etc.' },
    ]} />
    <h2 id="example-request">Example request</h2>
    <CodeGroup>
      <CodeBlock title="cURL">curl "https://api.chopam.xyz/foods/by/ingredient?name=palm%20oil"</CodeBlock>
      <CodeBlock title="JavaScript">{`const ingredient = 'palm oil';
const { success, data } = await fetch(
  \`https://api.chopam.xyz/foods/by/ingredient?name=\${encodeURIComponent(ingredient)}\`
).then(r => r.json());

if (success) console.log(\`\${data.total} foods use \${ingredient}\`);`}</CodeBlock>
      <CodeBlock title="Python">{`import requests

params = {'name': 'palm oil'}
response = requests.get('https://api.chopam.xyz/foods/by/ingredient', params=params)
data = response.json()

if data['success']:
    print(f"{data['data']['total']} foods use palm oil")`}</CodeBlock>
    </CodeGroup>
    <h2 id="example-response">Example response</h2>
    <CodeBlock title="200 OK">{`{
  "success": true,
  "data": {
    "total": 8,
    "foods": [
      { "name": "Egusi Soup", "slug": "egusi-soup", "category": "soup" }
    ]
  }
}`}</CodeBlock>
    <h3>400 — Missing name parameter</h3>
    <CodeBlock title="400">{'{ "success": false, "error": "name query param required" }'}</CodeBlock>
  </>
);

const Searching = () => (
  <>
    <h1>Searching</h1>
    <p className="lead">Search Nigerian foods by name, description, or ingredient using the ChopAm API.</p>
    <h2 id="full-text-search">Full-text search</h2>
    <p>Add <code>?q=</code> to <code>GET /foods</code> to search across <code>name</code> and <code>description</code>. Case-insensitive substring match.</p>
    <CodeGroup>
      <CodeBlock title="cURL">curl "https://api.chopam.xyz/foods?q=jollof"</CodeBlock>
      <CodeBlock title="JavaScript">{`const res = await fetch('https://api.chopam.xyz/foods?q=jollof');
const { data } = await res.json();
console.log(data.foods);`}</CodeBlock>
      <CodeBlock title="Python">{`import requests

params = {'q': 'jollof'}
response = requests.get('https://api.chopam.xyz/foods', params=params)
data = response.json()
print(data['data']['foods'])`}</CodeBlock>
    </CodeGroup>
    <Callout type="tip">The <code>?q=</code> parameter matches any substring — "rice" matches "Jollof Rice", "Rice and Beans", etc. Use more specific terms for narrower results.</Callout>
    <h2 id="search-by-ingredient">Search by ingredient</h2>
    <p>Use <code>GET /foods/by/ingredient?name=</code> to find all foods that include a specific ingredient.</p>
    <CodeGroup>
      <CodeBlock title="cURL">curl "https://api.chopam.xyz/foods/by/ingredient?name=palm oil"</CodeBlock>
      <CodeBlock title="JavaScript">{`const res = await fetch('https://api.chopam.xyz/foods/by/ingredient?name=palm%20oil');
const { data } = await res.json();
console.log(data.foods);`}</CodeBlock>
      <CodeBlock title="Python">{`import requests
params = {'name': 'palm oil'}
res = requests.get('https://api.chopam.xyz/foods/by/ingredient', params=params)
print(res.json()['data']['foods'])`}</CodeBlock>
    </CodeGroup>
    <h2 id="combining-parameters">Combining parameters</h2>
    <CodeGroup>
      <CodeBlock title="cURL">curl "https://api.chopam.xyz/foods?q=pepper&limit=5"</CodeBlock>
      <CodeBlock title="JavaScript">{`const res = await fetch('https://api.chopam.xyz/foods?q=pepper&limit=5');
const { data } = await res.json();
console.log(data.foods);`}</CodeBlock>
      <CodeBlock title="Python">{`import requests
params = {'q': 'pepper', 'limit': 5}
res = requests.get('https://api.chopam.xyz/foods', params=params)
print(res.json()['data']['foods'])`}</CodeBlock>
    </CodeGroup>
  </>
);

const Filtering = () => (
  <>
    <h1>Filtering</h1>
    <p className="lead">Filter Nigerian foods by region, tribe, category, and tag. All filters are case-insensitive.</p>
    <Callout type="note">Each filter accepts a single value. To combine multiple values, make separate requests and merge the results in your application.</Callout>
    <h2 id="filter-by-region">Filter by region</h2>
    <ParamTable 
      headers={['Region', 'States/Coverage']}
      params={[
        { name: 'South West', type: 'region', desc: 'Lagos, Ogun, Oyo, Osun, Ondo, Ekiti' },
        { name: 'South South', type: 'region', desc: 'Rivers, Delta, Bayelsa, Cross River, Edo, Akwa Ibom' },
        { name: 'South East', type: 'region', desc: 'Enugu, Anambra, Imo, Abia, Ebonyi' },
        { name: 'North', type: 'region', desc: 'Kano, Kaduna, Sokoto, and northern states' },
        { name: 'Nationwide', type: 'region', desc: 'Eaten broadly across Nigeria' },
      ]} 
    />
    <CodeGroup>
      <CodeBlock title="cURL">curl "https://api.chopam.xyz/foods?region=South%20West"</CodeBlock>
      <CodeBlock title="JavaScript">{`const res = await fetch('https://api.chopam.xyz/foods?region=South%20West');
const { data } = await res.json();
console.log(data.foods);`}</CodeBlock>
      <CodeBlock title="Python">{`import requests

params = {'region': 'South West'}
response = requests.get('https://api.chopam.xyz/foods', params=params)
print(response.json()['data']['foods'])`}</CodeBlock>
    </CodeGroup>

    <h2 id="filter-by-tribe">Filter by tribe</h2>
    <CodeGroup>
      <CodeBlock title="cURL">curl "https://api.chopam.xyz/foods?tribe=Yoruba"</CodeBlock>
      <CodeBlock title="JavaScript">{`const res = await fetch('https://api.chopam.xyz/foods?tribe=Yoruba');
const { data } = await res.json();
console.log(data.foods);`}</CodeBlock>
      <CodeBlock title="Python">{`import requests

params = {'tribe': 'Yoruba'}
response = requests.get('https://api.chopam.xyz/foods', params=params)
print(response.json()['data']['foods'])`}</CodeBlock>
    </CodeGroup>

    <h2 id="filter-by-category">Filter by category</h2>
    <ParamTable params={[
      { name: 'soup', type: 'category', desc: 'Thick soups served with swallows' },
      { name: 'rice dish', type: 'category', desc: 'Rice-based meals' },
      { name: 'street food', type: 'category', desc: 'Popular roadside and market foods' },
      { name: 'snack', type: 'category', desc: 'Light bites and small chops' },
      { name: 'swallow', type: 'category', desc: 'Fufu, eba, amala, pounded yam' },
      { name: 'side dish', type: 'category', desc: 'Accompaniments like moi moi, fried plantain' },
    ]} />
    <CodeGroup>
      <CodeBlock title="cURL">curl "https://api.chopam.xyz/foods?category=soup"</CodeBlock>
      <CodeBlock title="JavaScript">{`const res = await fetch('https://api.chopam.xyz/foods?category=soup');
const { data } = await res.json();
console.log(data.foods);`}</CodeBlock>
      <CodeBlock title="Python">{`import requests

params = {'category': 'soup'}
response = requests.get('https://api.chopam.xyz/foods', params=params)
print(response.json()['data']['foods'])`}</CodeBlock>
    </CodeGroup>

    <h2 id="filter-by-tag">Filter by tag</h2>
    <CodeGroup>
      <CodeBlock title="cURL">curl "https://api.chopam.xyz/foods?tag=festive"</CodeBlock>
      <CodeBlock title="JavaScript">{`const res = await fetch('https://api.chopam.xyz/foods?tag=festive');
const { data } = await res.json();
console.log(data.foods);`}</CodeBlock>
      <CodeBlock title="Python">{`import requests

params = {'tag': 'festive'}
response = requests.get('https://api.chopam.xyz/foods', params=params)
print(response.json()['data']['foods'])`}</CodeBlock>
    </CodeGroup>
  </>
);

const Pagination = () => (
  <>
    <h1>Pagination</h1>
    <p className="lead">Control how many results the API returns using the <code>limit</code> parameter.</p>
    <p><code>GET /foods</code> returns up to <strong>15 results</strong> by default.</p>
    <h2 id="default-behaviour">Default behaviour</h2>
    <CodeGroup>
      <CodeBlock title="cURL">curl "https://api.chopam.xyz/foods"</CodeBlock>
      <CodeBlock title="JavaScript">{`fetch('https://api.chopam.xyz/foods')
  .then(r => r.json())
  .then(d => console.log(d.data.foods));`}</CodeBlock>
      <CodeBlock title="Python">{`import requests
print(requests.get('https://api.chopam.xyz/foods').json()['data']['foods'])`}</CodeBlock>
    </CodeGroup>
    <h2 id="setting-a-custom-limit">Setting a custom limit</h2>
    <CodeGroup>
      <CodeBlock title="cURL">curl "https://api.chopam.xyz/foods?limit=5"</CodeBlock>
      <CodeBlock title="JavaScript">{`const res = await fetch('https://api.chopam.xyz/foods?limit=5');
const { data } = await res.json();
console.log(data.foods);`}</CodeBlock>
      <CodeBlock title="Python">{`import requests

params = {'limit': 5}
response = requests.get('https://api.chopam.xyz/foods', params=params)
print(response.json()['data']['foods'])`}</CodeBlock>
    </CodeGroup>
    <Callout type="warning">There is no maximum enforced on <code>limit</code>. Requesting a very large number returns every matching record in one response. Prefer smaller, targeted requests.</Callout>
    <h2 id="the-total-field">The <code>total</code> field</h2>
    <p>The <code>total</code> field reflects the number of items <strong>actually returned</strong> — not the total matching records in the database. The API does not support offset-based pagination.</p>
    <CodeGroup>
      <CodeBlock title="cURL">curl "https://api.chopam.xyz/foods?category=soup&limit=10"</CodeBlock>
      <CodeBlock title="JavaScript">{`const res = await fetch('https://api.chopam.xyz/foods?category=soup&limit=10');
const { data } = await res.json();
console.log(data.total);`}</CodeBlock>
      <CodeBlock title="Python">{`import requests

params = {'category': 'soup', 'limit': 10}
response = requests.get('https://api.chopam.xyz/foods', params=params)
print(response.json()['data']['total'])`}</CodeBlock>
    </CodeGroup>
  </>
);

const ResponseFormat = () => (
  <>
    <h1>Response Format</h1>
    <p className="lead">All ChopAm API responses follow a consistent JSON envelope structure.</p>
    <h2 id="success-response">Success response</h2>
    <CodeBlock title="Success">{`{ "success": true, "data": { ... } }`}</CodeBlock>
    <ResponseField name="success" type="boolean" required>Always <code>true</code> for successful responses.</ResponseField>
    <ResponseField name="data" type="object" required>List endpoints return <code>{`{ total, foods }`}</code>. Single-item endpoints return the food object directly.</ResponseField>
    <h2 id="error-response">Error response</h2>
    <CodeBlock title="Error">{`{ "success": false, "error": "Food not found" }`}</CodeBlock>
    <ResponseField name="success" type="boolean" required>Always <code>false</code> for error responses.</ResponseField>
    <ResponseField name="error" type="string" required>A human-readable description of what went wrong.</ResponseField>
    <h2 id="http-status-codes">HTTP status codes</h2>
    <ParamTable 
      headers={['Status', 'Meaning']}
      params={[
        { name: '200', type: 'OK', desc: 'The request succeeded and the response contains the requested data.' },
        { name: '400', type: 'Bad Request', desc: 'Bad request — a required parameter is missing or invalid.' },
        { name: '404', type: 'Not Found', desc: 'Not found — the requested food slug or route does not exist' },
      ]} 
    />
  </>
);

const Errors = () => (
  <>
    <h1>Errors</h1>
    <p className="lead">How the ChopAm API signals errors and what each error means.</p>
    <Callout type="warning">Always check the <code>success</code> boolean before reading <code>data</code>. Do not rely solely on the HTTP status code.</Callout>
    <h2 id="error-envelope">Error envelope</h2>
    <CodeBlock title="Error">{`{ "success": false, "error": "Food not found" }`}</CodeBlock>
    <h2 id="common-errors">Common errors</h2>
    <ParamTable 
      headers={['Error Message', 'Cause']}
      params={[
        { name: '"Food not found"', type: '404', desc: 'The :slug in GET /foods/:slug doesn\'t match any food' },
        { name: '"name query param required"', type: '400', desc: 'GET /foods/by/ingredient called without ?name=' },
        { name: '"Not found"', type: '404', desc: 'The route doesn\'t exist — check URL for typos' },
      ]} 
    />
    <h2 id="handling-errors-in-javascript">Handling errors in JavaScript</h2>
    <CodeGroup>
      <CodeBlock title="JavaScript">{`async function getFood(slug) {
  const response = await fetch(
    \`https://api.chopam.xyz/foods/\${slug}\`
  );
  const body = await response.json();

  if (!body.success) {
    console.error(\`Error \${response.status}: \${body.error}\`);
    return null;
  }

  return body.data;
}`}</CodeBlock>
      <CodeBlock title="Python">{`import requests

def get_food(slug):
    response = requests.get(f'https://api.chopam.xyz/foods/{slug}')
    body = response.json()

    if not body['success']:
        print(f"Error {response.status_code}: {body['error']}")
        return None

    return body['data']`}</CodeBlock>
    </CodeGroup>
  </>
);

/* ── Registry ── */
export const pages = {
  introduction: Introduction,
  quickstart: Quickstart,
  foods: Foods,
  recipes: Recipes,
  ingredients: Ingredients,
  'api-overview': ApiOverview,
  'list-foods': ListFoods,
  'get-food': GetFood,
  'by-ingredient': ByIngredient,
  searching: Searching,
  filtering: Filtering,
  pagination: Pagination,
  'response-format': ResponseFormat,
  errors: Errors,
};
