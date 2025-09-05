import {
    // Type checking utilities
    isEmpty,
    isDefined,
    isString,
    isNumber,
    isBoolean,
    isObject,
    isArray,
    isFunction,
    isNull,
    isUndefined,
    
    // Value utilities
    toNumberSafe,
    getValueOrFallback,
    
    // Object utilities
    deepClone,
    pick,
    omit,
    
    // String utilities
    capitalize,
    toCamelCase,
    toKebabCase,
    toSnakeCase,
    toPascalCase,
    truncate,
    
    // Array utilities
    unique,
    groupBy,
    sortBy,
    
    // Performance utilities
    debounce,
    throttle,
    
    // Random utilities
    randomString,
    randomNumber
} from '@apx-ui/toolkit';

/**
 * Comprehensive Generic Utilities Demo
 * 
 * This demo showcases all generic utility functions available in the toolkit
 * including type checking, value manipulation, object utilities, and performance helpers.
 */

console.log('=== Comprehensive Generic Utilities Demo ===\n');

/**
 * 1. Type Checking Utilities
 */
console.log('--- 1. Type Checking Utilities ---');

// Basic type checking
console.log('🔍 Basic Type Checking:');
const typeTests = [
    { value: 'hello', label: 'String' },
    { value: 123, label: 'Number' },
    { value: true, label: 'Boolean' },
    { value: {}, label: 'Object' },
    { value: [], label: 'Array' },
    { value: () => {}, label: 'Function' },
    { value: null, label: 'Null' },
    { value: undefined, label: 'Undefined' }
];

typeTests.forEach(({ value, label }) => {
    console.log(`  ${label}:`);
    console.log(`    isString: ${isString(value)}`);
    console.log(`    isNumber: ${isNumber(value)}`);
    console.log(`    isBoolean: ${isBoolean(value)}`);
    console.log(`    isObject: ${isObject(value)}`);
    console.log(`    isArray: ${isArray(value)}`);
    console.log(`    isFunction: ${isFunction(value)}`);
    console.log(`    isNull: ${isNull(value)}`);
    console.log(`    isUndefined: ${isUndefined(value)}`);
    console.log('');
});

// Empty value checking
console.log('📭 Empty Value Checking:');
const emptyTests = [
    { value: '', label: 'Empty string' },
    { value: '   ', label: 'Whitespace string' },
    { value: [], label: 'Empty array' },
    { value: {}, label: 'Empty object' },
    { value: null, label: 'Null' },
    { value: undefined, label: 'Undefined' },
    { value: 0, label: 'Zero' },
    { value: false, label: 'False' },
    { value: 'hello', label: 'Non-empty string' },
    { value: [1, 2, 3], label: 'Non-empty array' },
    { value: { a: 1 }, label: 'Non-empty object' }
];

emptyTests.forEach(({ value, label }) => {
    console.log(`  ${label}: ${isEmpty(value) ? 'Empty' : 'Not empty'}`);
});

// Defined value checking
console.log('\n✅ Defined Value Checking:');
const definedTests = [
    { value: 'hello', label: 'String' },
    { value: 123, label: 'Number' },
    { value: 0, label: 'Zero' },
    { value: false, label: 'False' },
    { value: null, label: 'Null' },
    { value: undefined, label: 'Undefined' }
];

definedTests.forEach(({ value, label }) => {
    console.log(`  ${label}: ${isDefined(value) ? 'Defined' : 'Not defined'}`);
});

/**
 * 2. Value Utilities
 */
console.log('\n--- 2. Value Utilities ---');

// Safe number conversion
console.log('🔢 Safe Number Conversion:');
const numberTests = [
    { value: '123', fallback: 0 },
    { value: '123.45', fallback: 0 },
    { value: 'abc', fallback: 0 },
    { value: '123abc', fallback: 0 },
    { value: '', fallback: 0 },
    { value: null, fallback: 0 },
    { value: undefined, fallback: 0 },
    { value: '123', fallback: 999 },
    { value: 'abc', fallback: 999 }
];

numberTests.forEach(({ value, fallback }) => {
    const result = toNumberSafe(value, fallback);
    console.log(`  "${value}" with fallback ${fallback}: ${result}`);
});

// Value or fallback
console.log('\n🔄 Value or Fallback:');
const fallbackTests = [
    { value: 'hello', fallback: 'default' },
    { value: null, fallback: 'default' },
    { value: undefined, fallback: 'default' },
    { value: '', fallback: 'default' },
    { value: 0, fallback: 999 },
    { value: false, fallback: true }
];

fallbackTests.forEach(({ value, fallback }) => {
    const result = getValueOrFallback(value, fallback);
    console.log(`  ${JSON.stringify(value)} with fallback ${JSON.stringify(fallback)}: ${JSON.stringify(result)}`);
});

/**
 * 3. Object Utilities
 */
console.log('\n--- 3. Object Utilities ---');

// Deep clone
console.log('🔄 Deep Clone:');
const originalObject = {
    name: 'John',
    age: 30,
    address: {
        street: '123 Main St',
        city: 'New York',
        coordinates: {
            lat: 40.7128,
            lng: -74.0060
        }
    },
    hobbies: ['reading', 'gaming', 'cooking'],
    isActive: true
};

const clonedObject = deepClone(originalObject);
clonedObject.name = 'Jane';
clonedObject.address.city = 'Los Angeles';
clonedObject.hobbies.push('swimming');

console.log('  Original object:');
console.log(`    Name: ${originalObject.name}`);
console.log(`    City: ${originalObject.address.city}`);
console.log(`    Hobbies: ${originalObject.hobbies.join(', ')}`);

console.log('  Cloned object (modified):');
console.log(`    Name: ${clonedObject.name}`);
console.log(`    City: ${clonedObject.address.city}`);
console.log(`    Hobbies: ${clonedObject.hobbies.join(', ')}`);

console.log('  Deep clone successful: ' + (originalObject.name !== clonedObject.name ? '✅' : '❌'));

// Pick specific properties
console.log('\n📝 Pick Properties:');
const user = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    phone: '+1234567890',
    address: '123 Main St',
    isActive: true
};

const pickedUser = pick(user, ['name', 'email', 'age']);
console.log('  Original user:', Object.keys(user));
console.log('  Picked user (name, email, age):', Object.keys(pickedUser));
console.log('  Picked data:', pickedUser);

// Omit specific properties
console.log('\n🚫 Omit Properties:');
const omittedUser = omit(user, ['id', 'phone', 'address', 'isActive']);
console.log('  Original user:', Object.keys(user));
console.log('  Omitted user (without id, phone, address, isActive):', Object.keys(omittedUser));
console.log('  Omitted data:', omittedUser);

/**
 * 4. String Utilities
 */
console.log('\n--- 4. String Utilities ---');

// String case conversions
console.log('🔤 String Case Conversions:');
const stringTests = [
    'hello world',
    'hello-world',
    'hello_world',
    'HelloWorld',
    'helloWorld',
    'HELLO WORLD'
];

stringTests.forEach(str => {
    console.log(`  Original: "${str}"`);
    console.log(`    Capitalize: "${capitalize(str)}"`);
    console.log(`    Camel case: "${toCamelCase(str)}"`);
    console.log(`    Kebab case: "${toKebabCase(str)}"`);
    console.log(`    Snake case: "${toSnakeCase(str)}"`);
    console.log(`    Pascal case: "${toPascalCase(str)}"`);
    console.log('');
});

// String truncation
console.log('✂️ String Truncation:');
const truncateTests = [
    { str: 'This is a very long string that needs to be truncated', length: 20 },
    { str: 'Short', length: 20 },
    { str: 'This is a very long string that needs to be truncated', length: 30, suffix: '...' },
    { str: 'This is a very long string that needs to be truncated', length: 25, suffix: ' [more]' }
];

truncateTests.forEach(({ str, length, suffix }) => {
    const result = truncate(str, length, suffix);
    console.log(`  "${str}" (${length} chars${suffix ? `, suffix: "${suffix}"` : ''}): "${result}"`);
});

/**
 * 5. Array Utilities
 */
console.log('\n--- 5. Array Utilities ---');

// Unique values
console.log('🔢 Unique Values:');
const arrayTests = [
    [1, 2, 2, 3, 3, 3, 4],
    ['a', 'b', 'b', 'c', 'c', 'c', 'd'],
    [1, '1', 2, '2', 3, '3'],
    ['hello', 'world', 'hello', 'world', 'test']
];

arrayTests.forEach(arr => {
    const uniqueArr = unique(arr);
    console.log(`  Original: [${arr.join(', ')}]`);
    console.log(`  Unique: [${uniqueArr.join(', ')}]`);
    console.log('');
});

// Group by property
console.log('📊 Group By Property:');
const users = [
    { id: 1, name: 'John', department: 'Engineering', age: 30 },
    { id: 2, name: 'Jane', department: 'Marketing', age: 25 },
    { id: 3, name: 'Bob', department: 'Engineering', age: 35 },
    { id: 4, name: 'Alice', department: 'Marketing', age: 28 },
    { id: 5, name: 'Charlie', department: 'Sales', age: 32 }
];

const groupedByDept = groupBy(users, 'department');
console.log('  Grouped by department:');
Object.entries(groupedByDept).forEach(([dept, users]) => {
    console.log(`    ${dept}: ${users.map(u => u.name).join(', ')}`);
});

const groupedByAge = groupBy(users, 'age');
console.log('\n  Grouped by age:');
Object.entries(groupedByAge).forEach(([age, users]) => {
    console.log(`    Age ${age}: ${users.map(u => u.name).join(', ')}`);
});

// Sort by property
console.log('\n📈 Sort By Property:');
const sortedByName = sortBy(users, 'name');
const sortedByAge = sortBy(users, 'age');
const sortedByAgeDesc = sortBy(users, 'age', 'desc');

console.log('  Sorted by name (asc):');
sortedByName.forEach(user => console.log(`    ${user.name} (${user.age})`));

console.log('\n  Sorted by age (asc):');
sortedByAge.forEach(user => console.log(`    ${user.name} (${user.age})`));

console.log('\n  Sorted by age (desc):');
sortedByAgeDesc.forEach(user => console.log(`    ${user.name} (${user.age})`));

/**
 * 6. Performance Utilities
 */
console.log('\n--- 6. Performance Utilities ---');

// Debounce example
console.log('⏱️ Debounce Example:');
let debounceCount = 0;
const debouncedFunction = debounce(() => {
    debounceCount++;
    console.log(`  Debounced function called ${debounceCount} times`);
}, 100);

console.log('  Calling debounced function 5 times rapidly...');
for (let i = 0; i < 5; i++) {
    debouncedFunction();
}

// Wait for debounce to complete
setTimeout(() => {
    console.log(`  Final count: ${debounceCount} (should be 1)`);
}, 200);

// Throttle example
console.log('\n🚦 Throttle Example:');
let throttleCount = 0;
const throttledFunction = throttle(() => {
    throttleCount++;
    console.log(`  Throttled function called ${throttleCount} times`);
}, 100);

console.log('  Calling throttled function 5 times rapidly...');
for (let i = 0; i < 5; i++) {
    throttledFunction();
}

// Wait for throttle to complete
setTimeout(() => {
    console.log(`  Final count: ${throttleCount} (should be 2-3)`);
}, 300);

/**
 * 7. Random Utilities
 */
console.log('\n--- 7. Random Utilities ---');

// Random string generation
console.log('🎲 Random String Generation:');
const stringLengths = [5, 10, 15, 20];
stringLengths.forEach(length => {
    const randomStr = randomString(length);
    console.log(`  Length ${length}: "${randomStr}"`);
});

// Random number generation
console.log('\n🎯 Random Number Generation:');
const numberRanges = [
    { min: 1, max: 10 },
    { min: 10, max: 100 },
    { min: 0, max: 1 },
    { min: -10, max: 10 }
];

numberRanges.forEach(({ min, max }) => {
    const randomNum = randomNumber(min, max);
    console.log(`  Range ${min}-${max}: ${randomNum}`);
});

/**
 * 8. Real-World Usage Scenarios
 */
console.log('\n--- 8. Real-World Usage Scenarios ---');

// Form validation and sanitization
console.log('📝 Form Validation and Sanitization:');
interface FormData {
    name: string;
    email: string;
    age: string;
    phone: string;
    website: string;
    bio: string;
}

const rawFormData: FormData = {
    name: '  John Doe  ',
    email: '  john@example.com  ',
    age: '30',
    phone: '+1 (234) 567-8900',
    website: 'https://example.com',
    bio: 'This is a very long bio that should be truncated for display purposes in the user interface'
};

const sanitizedFormData = {
    name: rawFormData.name.trim(),
    email: rawFormData.email.trim(),
    age: toNumberSafe(rawFormData.age, 0),
    phone: rawFormData.phone.replace(/\D/g, ''),
    website: rawFormData.website.trim(),
    bio: truncate(rawFormData.bio.trim(), 100, '...')
};

console.log('  Raw form data:');
Object.entries(rawFormData).forEach(([key, value]) => {
    console.log(`    ${key}: "${value}"`);
});

console.log('\n  Sanitized form data:');
Object.entries(sanitizedFormData).forEach(([key, value]) => {
    console.log(`    ${key}: ${typeof value === 'string' ? `"${value}"` : value}`);
});

// Data processing pipeline
console.log('\n🔄 Data Processing Pipeline:');
interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    rating: number;
    inStock: boolean;
}

const rawProducts: Product[] = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999.99, rating: 4.5, inStock: true },
    { id: 2, name: 'Mouse', category: 'Electronics', price: 29.99, rating: 4.2, inStock: true },
    { id: 3, name: 'Keyboard', category: 'Electronics', price: 79.99, rating: 4.0, inStock: false },
    { id: 4, name: 'Monitor', category: 'Electronics', price: 299.99, rating: 4.8, inStock: true },
    { id: 5, name: 'Chair', category: 'Furniture', price: 199.99, rating: 4.3, inStock: true },
    { id: 6, name: 'Desk', category: 'Furniture', price: 399.99, rating: 4.1, inStock: false }
];

// Filter in-stock products
const inStockProducts = rawProducts.filter(product => product.inStock);

// Group by category
const productsByCategory = groupBy(inStockProducts, 'category');

// Sort by rating (descending)
const sortedProducts = sortBy(inStockProducts, 'rating', 'desc');

// Create summary
const summary = {
    totalProducts: rawProducts.length,
    inStockProducts: inStockProducts.length,
    categories: Object.keys(productsByCategory).length,
    averagePrice: inStockProducts.reduce((sum, p) => sum + p.price, 0) / inStockProducts.length,
    topRatedProduct: sortedProducts[0]?.name || 'None'
};

console.log('  Product summary:');
console.log(`    Total products: ${summary.totalProducts}`);
console.log(`    In stock: ${summary.inStockProducts}`);
console.log(`    Categories: ${summary.categories}`);
console.log(`    Average price: $${summary.averagePrice.toFixed(2)}`);
console.log(`    Top rated: ${summary.topRatedProduct}`);

console.log('\n  Products by category:');
Object.entries(productsByCategory).forEach(([category, products]) => {
    console.log(`    ${category}: ${products.map(p => p.name).join(', ')}`);
});

// API response handling
console.log('\n🌐 API Response Handling:');
interface ApiResponse {
    data: any;
    error: string | null;
    status: number;
    timestamp: string;
}

const mockApiResponses: ApiResponse[] = [
    { data: { users: [{ id: 1, name: 'John' }] }, error: null, status: 200, timestamp: '2024-01-15T10:00:00Z' },
    { data: null, error: 'Not found', status: 404, timestamp: '2024-01-15T10:01:00Z' },
    { data: { products: [] }, error: null, status: 200, timestamp: '2024-01-15T10:02:00Z' },
    { data: null, error: 'Server error', status: 500, timestamp: '2024-01-15T10:03:00Z' }
];

mockApiResponses.forEach((response, index) => {
    console.log(`  Response ${index + 1}:`);
    console.log(`    Status: ${response.status}`);
    console.log(`    Has data: ${isDefined(response.data) && !isEmpty(response.data)}`);
    console.log(`    Has error: ${isDefined(response.error) && !isEmpty(response.error)}`);
    console.log(`    Error message: ${getValueOrFallback(response.error, 'No error')}`);
    console.log('');
});

console.log('\n=== Comprehensive Generic Utilities Demo Complete ===');
console.log('Key Features:');
console.log('✅ 20+ generic utility functions');
console.log('✅ Type checking and validation');
console.log('✅ Value manipulation and conversion');
console.log('✅ Object utilities (clone, pick, omit)');
console.log('✅ String utilities (case conversion, truncation)');
console.log('✅ Array utilities (unique, groupBy, sortBy)');
console.log('✅ Performance utilities (debounce, throttle)');
console.log('✅ Random utilities (string, number generation)');
console.log('✅ Real-world usage scenarios');
