// Environment variables with fallback defaults for development
// In production, set these in your hosting platform (Vercel, etc.)

export const env = {
  // Database
  DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:postgres@127.0.0.1:5432/app_db",
  
  // Authentication
  JWT_SECRET: process.env.JWT_SECRET || "tire-store-jwt-secret-change-in-production-abc123",
  
  // App settings
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "TireRack Pro",
  
  // Stripe (demo values - replace with real keys in production)
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || "sk_test_demo_key_replace_in_production",
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_demo_key_replace_in_production",
  
  // PayPal (demo values - replace with real keys in production)
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID || "demo_paypal_client_id",
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET || "demo_paypal_client_secret",
  
  // Email (demo values - replace with real SMTP settings in production)
  SMTP_HOST: process.env.SMTP_HOST || "smtp.example.com",
  SMTP_PORT: process.env.SMTP_PORT || "587",
  SMTP_USER: process.env.SMTP_USER || "noreply@tirerakpro.com",
  SMTP_PASSWORD: process.env.SMTP_PASSWORD || "demo_smtp_password",
  EMAIL_FROM: process.env.EMAIL_FROM || "TireRack Pro <noreply@tirerakpro.com>",
  
  // Tax API (demo - replace with real tax service in production)
  TAX_API_KEY: process.env.TAX_API_KEY || "demo_tax_api_key",
  TAX_API_URL: process.env.TAX_API_URL || "https://api.taxservice.com/v1",
  
  // Shipping API (demo - replace with real shipping service in production)
  SHIPPING_API_KEY: process.env.SHIPPING_API_KEY || "demo_shipping_api_key",
  SHIPPING_API_URL: process.env.SHIPPING_API_URL || "https://api.shippingservice.com/v1",
  
  // Analytics
  GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID || "G-DEMO123456",
  
  // Feature flags
  ENABLE_REVIEWS: process.env.ENABLE_REVIEWS !== "false",
  ENABLE_WISHLIST: process.env.ENABLE_WISHLIST !== "false",
  
  // Rate limiting
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || "100"),
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000"),
};

// Validate required environment variables in production
export function validateEnv() {
  const isProduction = process.env.NODE_ENV === "production";
  
  if (isProduction) {
    const required = [
      "DATABASE_URL",
      "JWT_SECRET",
    ];
    
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
      console.warn(`Warning: Missing environment variables: ${missing.join(", ")}`);
    }
  }
  
  return true;
}
