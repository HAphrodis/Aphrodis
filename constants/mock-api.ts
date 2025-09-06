////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////
// constants\mock-api.ts
import { faker } from "@faker-js/faker";
import { matchSorter } from "match-sorter"; // For filtering

// Define the shape of User data

type Gender = "male" | "female";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ======================MEMBER=======================

// Mock member data store
export const fakeMembers = {
  records: [] as Member[], // Holds the list of member objects

  // Initialize with sample data
  initialize() {
    const sampleMembers: Member[] = [];
    function generateRandomMemberData(id: number): Member {
      const departments = ["Nutrition and Dietetics", "Environmental Science"];
      const levels = ["1", "2", "3", "4"];

      return {
        id,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: `${faker.internet.email()}`,
        phone: `001-${Math.floor(Math.random() * 900) + 100}-${
          Math.floor(Math.random() * 900) + 100
        }-${Math.floor(Math.random() * 10000)}`,
        student_id: `STU${Math.floor(Math.random() * 10000)}`,
        department: faker.helpers.arrayElement(departments),
        level: faker.helpers.arrayElement(levels),
        status: "Accepted",
        profile_picture: `https://api.slingacademy.com/public/sample-members/${id}.png`,
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleMembers.push(generateRandomMemberData(i));
    }

    this.records = sampleMembers;
  },

  // Get all members with optional department filtering and search
  async getAll({
    departments = [],
    search,
  }: {
    departments?: string[];
    search?: string;
  }) {
    let members = [...this.records];

    // Filter members based on selected departments
    if (departments.length > 0) {
      members = members.filter((member) =>
        departments.includes(member.department),
      );
    }

    // Search functionality across multiple fields
    if (search) {
      members = matchSorter(members, search, {
        keys: ["first_name", "last_name", "email", "department"],
      });
    }

    return members;
  },

  // Get paginated results with optional department filtering and search
  async getMembers({
    page = 1,
    limit = 10,
    departments,
    search,
  }: {
    page?: number;
    limit?: number;
    departments?: string;
    search?: string;
  }) {
    const departmentsArray = departments ? departments.split(".") : [];
    const allMembers = await this.getAll({
      departments: departmentsArray,
      search,
    });
    const totalMembers = allMembers.length; // Total number of members

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedMembers = allMembers.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: "Sample data for testing and learning purposes",
      total_members: totalMembers,
      offset,
      limit,
      members: paginatedMembers,
    };
  },

  // Get a specific member by its ID
  async getMemberById(id: number) {
    await delay(1000); // Simulate a delay

    // Find the member by its ID
    const member = this.records.find((member) => member.id === id);

    if (!member) {
      return {
        success: false,
        message: `Member with ID ${id} not found`,
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Member with ID ${id} found`,
      data: member,
    };
  },
};

// Initialize sample members
fakeMembers.initialize();

// ======================SUBSCRIBER=======================

// Define the shape of Subscriber data
export type Subscriber = {
  id: number;
  timestamp: string;
  email: string;
  names: string;
};

// Mock subscriber data store
export const fakeSubscribers = {
  records: [] as Subscriber[], // Holds the list of subscriber objects

  // Initialize with sample data
  initialize() {
    const sampleSubscribers: Subscriber[] = [];
    function generateRandomSubscriberData(id: number): Subscriber {
      return {
        id,
        timestamp: faker.date.recent().toISOString(),
        email: faker.internet.email(),
        names: `${faker.person.firstName()} ${faker.person.lastName()}`,
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleSubscribers.push(generateRandomSubscriberData(i));
    }

    this.records = sampleSubscribers;
  },

  // Get all subscribers with optional search
  async getAll({ search }: { search?: string }) {
    let subscribers = [...this.records];

    // Search functionality across names and email
    if (search) {
      subscribers = matchSorter(subscribers, search, {
        keys: ["names", "email"],
      });
    }

    return subscribers;
  },

  // Get paginated results with optional search
  async getSubscribers({
    page = 1,
    limit = 10,
    search,
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    await delay(1000);
    const allSubscribers = await this.getAll({ search });
    const totalSubscribers = allSubscribers.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedSubscribers = allSubscribers.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: "Sample data for testing and learning purposes",
      total_subscribers: totalSubscribers,
      offset,
      limit,
      subscribers: paginatedSubscribers,
    };
  },

  // Get a specific subscriber by its ID
  async getSubscriberById(id: number) {
    await delay(1000); // Simulate a delay

    // Find the subscriber by its ID
    const subscriber = this.records.find((subscriber) => subscriber.id === id);

    if (!subscriber) {
      return {
        success: false,
        message: `Subscriber with ID ${id} not found`,
      };
    }

    // Mock current time

    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Subscriber with ID ${id} found`,
      data: subscriber,
    };
  },
};

// Initialize sample subscribers
fakeSubscribers.initialize();

// ======================MESSAGE=======================
// Define the shape of Message data
export type Message = {
  id: number;
  sender_names: string;
  content: string;
  timestamp: string;
  read: boolean;
  sender_email: string;
};

// Mock message data store
export const fakeMessages = {
  records: [] as Message[], // Holds the list of message objects

  // Initialize with sample data
  initialize() {
    const sampleMessages: Message[] = [];
    function generateRandomMessageData(id: number): Message {
      return {
        id,
        sender_names: `${faker.person.firstName()} ${faker.person.lastName()}`,
        content: faker.lorem.sentence(),
        timestamp: faker.date.recent().toISOString(),
        read: faker.datatype.boolean(),
        sender_email: faker.internet.email(),
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 50; i++) {
      sampleMessages.push(generateRandomMessageData(i));
    }

    this.records = sampleMessages;
  },

  // Get all messages with optional read status filtering and search
  async getAll({
    readStatus,
    search,
  }: {
    readStatus?: boolean;
    search?: string;
  }) {
    let messages = [...this.records];

    // Filter messages based on read status
    if (readStatus !== undefined) {
      messages = messages.filter((message) => message.read === readStatus);
    }

    // Search functionality across content
    if (search) {
      messages = matchSorter(messages, search, {
        keys: ["content"],
      });
    }

    return messages;
  },

  // Get paginated results with optional read status filtering and search
  async getMessages({
    page = 1,
    limit = 10,
    readStatus,
    search,
  }: {
    page?: number;
    limit?: number;
    readStatus?: boolean;
    search?: string;
  }) {
    await delay(1000);
    const allMessages = await this.getAll({ readStatus, search });
    const totalMessages = allMessages.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedMessages = allMessages.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: "Sample data for testing and learning purposes",
      total_messages: totalMessages,
      offset,
      limit,
      messages: paginatedMessages,
    };
  },

  // Get a specific message by its ID
  async getMessageById(id: number) {
    await delay(1000); // Simulate a delay

    // Find the message by its ID
    const message = this.records.find((message) => message.id === id);

    if (!message) {
      return {
        success: false,
        message: `Message with ID ${id} not found`,
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Message with ID ${id} found`,
      data: message,
    };
  },
};

// Initialize sample messages
fakeMessages.initialize();

export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude: number;
  latitude: number;
  gender: Gender;
  date_of_birth: string;
  job: string;
  profile_picture: string;
};

// Mock user data store
export const fakeUsers = {
  records: [] as User[], // Holds the list of user objects

  // Initialize with sample data
  initialize() {
    const sampleUsers: User[] = [];
    function generateRandomUserData(id: number): User {
      const genders = ["male", "female"];
      const jobs = [
        "Software Engineer",
        "Data Scientist",
        "Marketing Manager",
        "Graphic Designer",
        "Sales Manager",
        "Product Manager",
      ];
      const cities = [
        "San Francisco",
        "New York City",
        "Los Angeles",
        "Chicago",
        "Houston",
        "Phoenix",
        "Philadelphia",
        "San Antonio",
        "San Diego",
        "Dallas",
        "San Jose",
        "Austin",
        "Jacksonville",
      ];
      const states = [
        "California",
        "New York",
        "Texas",
        "Florida",
        "Illinois",
        "Pennsylvania",
        "Ohio",
        "Georgia",
        "North Carolina",
        "Michigan",
      ];

      return {
        id,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: `${faker.internet.email()}`,
        phone: `001-${Math.floor(Math.random() * 900) + 100}-${
          Math.floor(Math.random() * 900) + 100
        }-${Math.floor(Math.random() * 10000)}`,
        street: `${Math.floor(
          Math.random() * 1000,
        )} ${faker.location.street()}`,
        city: faker.helpers.arrayElement(cities),
        state: faker.helpers.arrayElement(states),
        country: "USA",
        zipcode: faker.location.zipCode(),
        longitude: faker.location.longitude(),
        latitude: faker.location.latitude(),
        gender: faker.helpers.arrayElement(genders) as Gender,
        date_of_birth: faker.date
          .between({ from: "1980-01-01", to: "2000-01-01" })
          .toISOString()
          .split("T")[0],
        job: faker.helpers.arrayElement(jobs),
        profile_picture: `https://api.slingacademy.com/public/sample-users/${id}.png`,
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleUsers.push(generateRandomUserData(i));
    }

    this.records = sampleUsers;
  },

  // Get all users with optional gender filtering and search
  async getAll({
    genders = [],
    search,
  }: {
    genders?: string[];
    search?: string;
  }) {
    let users = [...this.records];

    // Filter users based on selected genders
    if (genders.length > 0) {
      users = users.filter((user) => genders.includes(user.gender));
    }

    // Search functionality across multiple fields
    if (search) {
      users = matchSorter(users, search, {
        keys: [
          "first_name",
          "last_name",
          "email",
          "job",
          "city",
          "street",
          "state",
          "country",
        ],
      });
    }

    return users;
  },

  // Get paginated results with optional gender filtering and search
  async getUsers({
    page = 1,
    limit = 10,
    genders,
    search,
  }: {
    page?: number;
    limit?: number;
    genders?: string;
    search?: string;
  }) {
    const gendersArray = genders ? genders.split(".") : [];
    // console.log('gendersArray', gendersArray);
    const allUsers = await this.getAll({ genders: gendersArray, search });
    const totalUsers = allUsers.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedUsers = allUsers.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: "Sample data for testing and learning purposes",
      total_users: totalUsers,
      offset,
      limit,
      users: paginatedUsers,
    };
  },
};

// Initialize sample users
fakeUsers.initialize();

// Define the shape of Product data
export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

// Mock product data store
export const fakeProducts = {
  records: [] as Product[], // Holds the list of product objects

  // Initialize with sample data
  initialize() {
    const sampleProducts: Product[] = [];
    function generateRandomProductData(id: number): Product {
      const categories = [
        "Electronics",
        "Furniture",
        "Clothing",
        "Toys",
        "Groceries",
        "Books",
        "Jewelry",
        "Beauty Products",
      ];

      return {
        id,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        created_at: faker.date
          .between({ from: "2022-01-01", to: "2023-12-31" })
          .toISOString(),
        price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
        photo_url: `https://api.slingacademy.com/public/sample-products/${id}.png`,
        category: faker.helpers.arrayElement(categories),
        updated_at: faker.date.recent().toISOString(),
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleProducts.push(generateRandomProductData(i));
    }

    this.records = sampleProducts;
  },

  // Get all products with optional category filtering and search
  async getAll({
    categories = [],
    search,
  }: {
    categories?: string[];
    search?: string;
  }) {
    let products = [...this.records];

    // Filter products based on selected categories
    if (categories.length > 0) {
      products = products.filter((product) =>
        categories.includes(product.category),
      );
    }

    // Search functionality across multiple fields
    if (search) {
      products = matchSorter(products, search, {
        keys: ["name", "description", "category"],
      });
    }

    return products;
  },

  // Get paginated results with optional category filtering and search
  async getProducts({
    page = 1,
    limit = 10,
    categories,
    search,
  }: {
    page?: number;
    limit?: number;
    categories?: string;
    search?: string;
  }) {
    await delay(1000);
    const categoriesArray = categories ? categories.split(".") : [];
    const allProducts = await this.getAll({
      categories: categoriesArray,
      search,
    });
    const totalProducts = allProducts.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: "Sample data for testing and learning purposes",
      total_products: totalProducts,
      offset,
      limit,
      products: paginatedProducts,
    };
  },

  // Get a specific product by its ID
  async getProductById(id: number) {
    await delay(1000); // Simulate a delay

    // Find the product by its ID
    const product = this.records.find((product) => product.id === id);

    if (!product) {
      return {
        success: false,
        message: `Product with ID ${id} not found`,
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Product with ID ${id} found`,
      product,
    };
  },
};

// Initialize sample products
fakeProducts.initialize();

//define the shape of Gallery data
export type Gallery = {
  id: number;
  photo_url: string;
  description: string;
  created_at: string;
};

//mock gallery data store

export const fakeGallery = {
  records: [] as Gallery[],

  //initialize with sample data
  initialize() {
    const sampleGallery: Gallery[] = [];
    function generateRandomGalleryData(id: number): Gallery {
      return {
        id,
        photo_url: `https://api.slingacademy.com/public/sample-gallery/${id}.jpg`,
        description: faker.lorem.sentence(),
        created_at: faker.date.recent().toISOString(),
      };
    }

    //generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleGallery.push(generateRandomGalleryData(i));
    }

    this.records = sampleGallery;
  },

  //get all gallery items with optional search
  async getAll({ search }: { search?: string }) {
    let gallery = [...this.records];

    //search functionality across description
    if (search) {
      gallery = matchSorter(gallery, search, {
        keys: ["description"],
      });
    }

    return gallery;
  },

  //get paginated results with optional search
  async getGallery({
    page = 1,
    limit = 10,
    search,
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    await delay(1000);
    const allGallery = await this.getAll({ search });
    const totalGallery = allGallery.length;

    //pagination logic
    const offset = (page - 1) * limit;
    const paginatedGallery = allGallery.slice(offset, offset + limit);

    //mock current time
    const currentTime = new Date().toISOString();

    //return paginated response
    return {
      success: true,
      time: currentTime,
      message: "Sample data for testing and learning purposes",
      total_gallery: totalGallery,
      offset,
      limit,
      gallery: paginatedGallery,
    };
  },

  //get a specific gallery item by its ID
  async getGalleryById(id: number) {
    await delay(1000); //simulate a delay

    //find the gallery item by its ID
    const galleryItem = this.records.find(
      (galleryItem) => galleryItem.id === id,
    );

    if (!galleryItem) {
      return {
        success: false,
        message: `Gallery item with ID ${id} not found`,
      };
    }

    //mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Gallery item with ID ${id} found`,
      data: galleryItem,
    };
  },
};

//initialize sample gallery items
fakeGallery.initialize();

// Define the shape of Member data
export type Member = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  student_id: string;
  department: string;
  level: string;
  status: string;
  profile_picture?: string | null;
};

// ======== TRASH =========== //

// Define the shape of TrashItem data
export type TrashItem = {
  id: number;
  name: string;
  type: "member" | "message" | "product";
  deletedAt: string;
};

// Mock trash data store
export const fakeTrash = {
  records: [] as TrashItem[],

  initialize() {
    const sampleTrash: TrashItem[] = [];
    const types: ("member" | "message" | "product")[] = [
      "member",
      "message",
      "product",
    ];

    for (let i = 1; i <= 20; i++) {
      sampleTrash.push({
        id: i,
        name: faker.lorem.words(3),
        type: faker.helpers.arrayElement(types),
        deletedAt: faker.date.recent().toISOString(),
      });
    }

    this.records = sampleTrash;
  },

  async getTrashItems({
    page = 1,
    limit = 10,
    search,
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay

    let items = [...this.records];

    if (search) {
      items = matchSorter(items, search, { keys: ["name", "type"] });
    }

    const totalItems = items.length;
    const offset = (page - 1) * limit;
    const paginatedItems = items.slice(offset, offset + limit);

    return {
      success: true,
      time: new Date().toISOString(),
      message: "Trash items retrieved successfully",
      total_items: totalItems,
      offset,
      limit,
      items: paginatedItems,
    };
  },

  async restoreItem(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
    this.records = this.records.filter((item) => item.id !== id);
    return { success: true, message: "Item restored successfully" };
  },

  async deleteItemPermanently(id: number) {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API delay
    this.records = this.records.filter((item) => item.id !== id);
    return { success: true, message: "Item deleted permanently" };
  },
};

// Initialize sample trash items
fakeTrash.initialize();
